import mainController from '../controllers/mainController.mjs'
import { Router } from 'express'

const router = Router()
router.get('/', (req, res) => {
res.render('index', { title: 'Express' })
})
export default router