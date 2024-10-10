import readline from 'readline'

const args = process.argv.slice(2)
let pensionAge = 65

args.forEach(arg => {
	if(arg.startsWith('--pension=')) 
		pensionAge = parseInt(arg.split('=')[1], 10)
})

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
})

rl.question('How old are you? ', (answer) => {
	answer = parseInt(answer, 10)

	if(answer >= pensionAge)
		console.log(`You are ${answer} - pensioner. Retirement age is ${pensionAge}`)
	else 
		console.log(`You are ${answer} - not pensioner. Retirement age is ${pensionAge}`)
})