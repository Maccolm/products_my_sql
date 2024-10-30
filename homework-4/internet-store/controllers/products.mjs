import ProductsDBService from '../models/products/productsDBService.mjs'
import { validationResult } from 'express-validator'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

class ProductController {
	static async allProducts(req, res) {
		try{
			const productList = await ProductsDBService.getList()
			res.render('products/productsList' , {
				products: productList
			})
		} catch (err) { 
			res.status(500).json({ error: err.message }) 
		} 
	}
	static async productDetails(req, res){
		try {
			const id = req.params.id
			const product = await ProductsDBService.getById(id)
			res.render('products/productDetails', {
				product
			})
		} catch (err) { 
			res.status(500).json({ error: err.message }) 
		} 
	}
	static createForm(req, res) {
		res.render('products/productForm', { errors: [], product: null })
	}
	static async editProductForm(req, res) {
		try {
			const product = await ProductsDBService.getById(req.params.id)
			res.render('products/productForm', { errors: [], product })
		} catch (err) { 
			res.status(500).json({ error: err.message }) 
		} 
	}
	static async createProduct(req, res){
		const errors = validationResult(req)
		console.log('========errors');
		console.log(errors);
		
		if(!errors.isEmpty()) {
			const data = req.body
			if(req.params.id) data.id = req.params.id
			return res.status(400).render('products/productForm', { 
				errors: errors.array(),
				product: data
			})
		}

		const productData = { imgSrc: req.file.filename, ...req.body }
		console.log(productData);
		try {
			await ProductsDBService.create(productData)
			res.redirect('/products')
		} catch (err) { 
			res.status(500).json({ error: err.message }) 
		} 
	}
	static async updateProduct(req, res) {
		console.log('------updateProduct')

		const errors = validationResult(req)
		console.log('========errors');
		console.log(errors);
		
		if(!errors.isEmpty()) {
			const data = req.body
			if(req.params.id) data.id = req.params.id
			return res.status(400).render('products/productForm', { 
				errors: errors.array(),
				product: data
			})
		}
		console.log(req.body);
		const updatedProductData = req.file ? { imgSrc: req.file.filename, ...req.body} : req.body
		try {
			await ProductsDBService.update(req.params.id, updatedProductData)
			res.redirect('/products')
		} catch (err) { 
			res.status(500).json({ error: err.message }) 
		} 
	}
	static async deleteProduct(req, res) {
		console.log(req.body.id)
		try {
			const product = await ProductsDBService.getById(req.body.id)
			if(!product) 
				return res.status(404).json({ success: false, message: 'Product not found' })

			const imgPath = path.join(__dirname, '../uploads', product.imgSrc) 

			await ProductsDBService.deleteById(req.body.id)
			await ProductController.deleteImg(imgPath)
			res.json({ success: true })
		} catch (err) { 
			res.status(500).json({ error: err.message }) 
		} 
	}
	static async deleteImg(imgPath) {
		try {
			if(fs.existsSync(imgPath)){
				fs.unlink(imgPath, (err) => {
					if(err)
						console.error('Error deleting image', err);
					else 
						console.log('Image deleted successful')
				})
			}
		} catch (err) { 
			res.status(500).json({ error: err.message }) 
		} 
	}
}
export default ProductController