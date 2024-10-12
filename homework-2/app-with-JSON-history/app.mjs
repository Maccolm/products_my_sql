// Задача 5. Створити додаток з історією. У файлі json зберігаємо усі роути та кількість відвідувань. У налаштуваннях settings.json зберігати який роут треба використати для перегляду історії та назву файлу де зберігається історія
// server.mjs
import { createServer } from 'node:http';
import settings from './settings.json' assert { type: 'json' }
import history from './history.json' assert { type: 'json' }
import fs from 'fs'

const server = createServer((req, res) => {
	const historyRoute = settings.historyRoute

	res.writeHead(200, { 'Content-Type': 'text/plain' })
	if(req.url === historyRoute) {
		const historyFilePath = settings.historyFilePath
		if(fs.existsSync(historyFilePath)){
			fs.createReadStream(historyFilePath).pipe(res)
		} else {
			res.end('File didn\'t found')
		}
	} else {
		res.end('Let\'s navigate!')
	}
	if(!history[req.url])
		history[req.url] = 1
	else
		history[req.url] += 1
	
	const historyFilePath = settings.historyFilePath
	fs.writeFileSync(historyFilePath, JSON.stringify(history, null, 2), 'utf8')

});

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});

// run with `node server.mjs`
