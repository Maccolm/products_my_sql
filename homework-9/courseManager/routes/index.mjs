import { Router } from 'express'
const router = Router()
router.get('/', async (req, res) => {
	try {
		res.render('index', {
			title: 'Welcome to Course Manager',
			addNewRoute: 'courses/register',
			addNewStudent: 'students/register',
			courseRoute: '/courses',
		})
		} catch (error) {
			res.status(500).send({ error: error.message })
		}
})
export default router