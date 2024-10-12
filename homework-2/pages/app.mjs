// Задача 4. Розробити серверну частину додатку, який за відповідними маршрутами (“/”, “/coffee”, “/music”) повертає створені HTML документи (розмістіть їх там же, де і додаток), що описують: інформацію про себе, інфорімацію про улюблену кав’ярню,  інформацію про улюблений музичний гурт.

// server.mjs
import { createServer } from 'node:http'
import fs from 'fs'

const server = createServer((req, res) => {
	let filePath = ''

	if (req.url === '/') {
		filePath = 'about.html'
	} else {
		filePath = req.url.slice(1) + '.html'
	}
	console.log(filePath);
	if (fs.existsSync(filePath)) {
		res.writeHead(200, { 'Content-Type': 'text/html' })
		fs.createReadStream(filePath).pipe(res)
	} else {
		res.end('File didn\'t found\n')
	}
});

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
	console.log('Listening on 127.0.0.1:3000')
});

// run with `node server.mjs`
