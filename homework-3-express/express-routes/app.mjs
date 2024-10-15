// Задача 1. Розробити додаток з такими маршрутами:
// Маршрут
// Що повертає
// season
// повертає пору року
// day
// повертає поточний день
// time
// повертає час дня (ранок, обід, вечеря)



import express from 'express'
const app = express()
const port = 3000
const getPartOfTheDay = () => {
	const time = new Date().getHours()
	if(time < 5) 
		return 'Night'
	else if (time > 5 && time < 11)
		return 'Morning'
	else if(time > 11 && time < 16)
		return 'Day'
	else 
	return 'Evening'
}

// Маршрут для GET запиту до кореневого шляху
app.get('/', (req, res) => {
res.send('Let\'s write "season", "day", "time"')
})
app.get('/season', (req, res) => {
res.send('autumn')
})
app.get('/day', (req, res) => {
res.send(new Date().getDay().toString())
})
app.get('/time', (req, res) => {
res.send(getPartOfTheDay())
})
// Запуск сервера
app.listen(port, () => {
console.log(`Сервер запущено на http://localhost:${port}`)
})