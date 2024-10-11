// server.mjs
// Задача 3. Через параметри запиту передають операцію (add, subtract, mult) і числа (розділені дефісами), які треба опрацювати. Знайти результат і повернути користувачу. Наприклад при запиті:
// http://localhost:3000/add/12-4-23-45   - треба знайти суму чисел 12,4,23,45

import { createServer } from 'node:http';

const getNumbersArray = (numString) => {
	const numbers = numString.split('-')
	return numbers.map(num => parseInt(num))
}
const server = createServer((req, res) => {
	if(req.url.startsWith('/add/')) {
		const numString = req.url.split('/')[2]
		const numbers = getNumbersArray(numString)
		const sum = numbers.reduce((prev, num) => prev + num, 0)
		if(numbers.some(isNaN)){
			res.writeHead(400, { 'Content-Type': 'text/plain' });
			res.end('Please type correct value\n');
			return
		}
		res.writeHead(200, { 'Content-Type': 'text/plain' });
		res.end(`Sum of "${numbers}" are "${sum}"\n`);
	} else if (req.url.startsWith('/subtract/')) {
		const numString = req.url.split('/')[2]
		const numbers = getNumbersArray(numString)
		const subtract = numbers.reduce((prev, num) => prev - num)
		if(numbers.some(isNaN)){
			res.writeHead(400, { 'Content-Type': 'text/plain' });
			res.end('Please type correct value\n');
			return
		}
		res.writeHead(200, { 'Content-Type': 'text/plain' });
		res.end(`Subtract of "${numbers}" are: "${subtract}"\n`);
	} else if(req.url.startsWith('/multi/')) {
		const numString = req.url.split('/')[2]
		const numbers = getNumbersArray(numString)
		const multi = numbers.reduce((prev, num) => prev * num, 1)
		if(numbers.some(isNaN)){
			res.writeHead(400, { 'Content-Type': 'text/plain' });
			res.end('Please type correct value\n');
			return
		}
		res.writeHead(200, { 'Content-Type': 'text/plain' });
		res.end(`Multi of "${numbers}" are: "${multi}"\n`);
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