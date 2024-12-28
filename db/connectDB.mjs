import config from '../config/default.mjs' 
// Імпортуємо необхідний модуль 
import mysql from 'mysql2/promise'
 
// Встановлюємо глобальні проміси 
// Функція для підключення до MongoDB 

   const pool = mysql.createPool({
		host: config.host,
		user: config.user,
		password: config.password,
		database: config.database,
	})
	console.log('Connected to MySQL')

export default pool