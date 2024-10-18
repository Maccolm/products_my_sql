import ProductController from '../controllers/products.mjs'
import mainController from '../controllers/mainController.mjs'
import { Router } from 'express'

const router = Router()
router.get('/', ProductController.allProducts())
export default router