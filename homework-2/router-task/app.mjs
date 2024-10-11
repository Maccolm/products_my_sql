// server.mjs
// Задача 2. Користувач через роут ‘/save_num/число’ може передати на сервер якесь число. Ці числа поступово треба зберігати у текстовому файлі numbers.txt. Наприклад, використовуючи такий роут:
// http://localhost:3000/save_num/78  -  у файл треба додати число 78.
// А використовуючи роути  ‘/sum’ – знайти суму, ‘mult’ –знайти добуток. За роутом «/remove» файл треба видалити.

import { createServer } from 'node:http';
import fs from 'fs'

const numbersFilePath = 'numbers.txt'
const readNumbersFromFile = () => {
	if (!fs.existsSync(numbersFilePath)) return []

	const numbers = fs.readFileSync(numbersFilePath, 'utf8')
	return numbers.split('\n').filter(num => num).map(Number)
}

const removeFile = () => {
	if (fs.existsSync(numbersFilePath))
		fs.unlinkSync(numbersFilePath)
}
const server = createServer((req, res) => {
	if (req.url.startsWith('/save_number/')) {
		const numForSave = req.url.split('/')[2]

		if (isNaN(numForSave)) {
			res.writeHead(400, { 'Content-Type': 'text/plain' })
			res.end('it\'s not a number')
			return
		}

		if (fs.existsSync(numbersFilePath)) {
			fs.appendFile(numbersFilePath, `${numForSave}\n`, (err) => {
				if (err) {
					res.writeHead(500, { 'Content-Type': 'text/plain' });
					res.end(`Couldn\'t save the number\n`)
					return
				}
			})
			res.writeHead(200, { 'Content-Type': 'text/plain' });
			res.end(`Number ${numForSave} saved\n`);
		} else {
			fs.writeFile(numbersFilePath, `${numForSave}\n`, (err) => {
				if (err) {
					res.writeHead(500, { 'Content-Type': 'text/plain' });
					res.end(`Couldn\'t save the number\n`)
					return
				}
				res.writeHead(200, { 'Content-Type': 'text/plain' });
				res.end(`Number ${numForSave} saved and file created\n`);
			})
		}
	} else if (req.url === '/remove') {
		removeFile()
		res.writeHead(200, { 'Content-Type': 'text/plain' });
		res.end(`file successfully deleted\n`);
	} else if (req.url === '/sum') {
		const numbers = readNumbersFromFile()
		const sum = numbers.reduce((prev, num) => prev + num, 0)
		console.log(numbers);

		res.writeHead(200, { 'Content-Type': 'text/plain' });
		res.end(`Sum of ${numbers} is ${sum}\n`);
	} else if (req.url === '/multi') {
		const numbers = readNumbersFromFile()
		const multi = numbers.reduce((prev, num) => prev * num, 1)

		res.writeHead(200, { 'Content-Type': 'text/plain' });
		res.end(`Multi of numbers ${numbers} are ${multi}\n`);
	} else {
		res.writeHead(404, { 'Content-Type': 'text/plain' });
		res.end(`Path not found\n`);
	}
});

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
	console.log('Listening on 127.0.0.1:3000');
});

// run with `node server.mjs`
