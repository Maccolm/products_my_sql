import express from 'express'
import CourseController from '../controllers/CourseController.mjs'

const router = express.Router()

router.get('/', CourseController.getList)
router.get('/register/:id?', CourseController.registerForm)
router.post('/register/:id?', CourseController.register)
router.delete('/:id', CourseController.delete)

export default router