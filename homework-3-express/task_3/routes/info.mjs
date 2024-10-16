import { Router } from 'express'

const router = Router()
router.get('/:myLinks', (req, res) => {
	const { myLinks } = req.params
	if(myLinks === 'me') {
		res.render('info', { 
			title: 'Hello',
			greeting: 'My name is Vitalii and I am front end developer',
			message: 'Eager to gain new experiences, acquire new knowledge, and grow towards becoming a mid-level and senior developer. Skilled in JavaScript and React, currently expanding expertise in Angular.'  
		})
	} else if( myLinks === 'films') {
		res.render('info', { 
			title: 'My favorite cinema',
			message: 'Here will be list of my favorite cinema and movies',
			cinema: {
				1: {
					name:	'IMAX',
					link: 'https://www.imax.com/en/se'
					},  
				2: {
					name:	'Futuroscope',
					link: 'https://www.futuroscope.com/fr'
					},  
				3: {
					name:	'Golden Village',
					link: 'https://www.bing.com/search?q=Golden+Village&qs=n&form=QBRE&sp=-1&lq=0&pq=golden+village&sc=10-14&sk=&cvid=61F392BB1E814A5F99FAF0DB551B5DFE&ghsh=0&ghacc=0&ghpl='
					},  
				4: {
					name:	'Busan Cinema Centre',
					link: 'https://www.archdaily.com/347512/busan-cinema-center-coop-himmelblau'
					},  
			} 
		})
	} else if (myLinks === 'sites') {
		res.render('info', { 
			title: 'Hello',
			message: 'Here is my favorite websites',
			sites: {
				1: 'https://www.youtube.com/',
				2: 'https://www.imdb.com/',
				3: 'https://open.spotify.com/'
			}  
		})
	} else {
		res.status(404).render('error', { message: 'Page Not Found' })
	}
})
export default router