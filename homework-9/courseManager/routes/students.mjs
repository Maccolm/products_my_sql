import express from 'express'
import StudentController from '../controllers/StudentController.mjs'

const router = express.Router()

router.get('/', StudentController.getList)
router.get('/register/:id?', StudentController.registerForm)
router.post('/register/:id?', StudentController.register)
router.delete('/:id', StudentController.delete)

export default router