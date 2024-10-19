import ProductController from '../controllers/products.mjs'
import { Router } from 'express'

const router = Router()
router.get('/', ProductController.allProducts)
router.get('/create', ProductController.createForm)
router.get('/:id', ProductController.productDetails)
router.post('/', ProductController.createProduct)
export default router