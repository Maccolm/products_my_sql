import Product from "../models/Product.mjs";

class ProductController {
	static allProducts(req, res) {
		const productList = Product.loadProductList()
		res.render('products/productsList' , {
			products: productList
		})
	}
	static productDetails(req, res){
		const id = req.params.id
		const product = Product.getProductById(id)
		res.render('products/productDetails', {
			product
		})
	}
	static createForm(req, res) {
		res.render('products/productForm', {})
	}
	static createProduct(req, res){
		const productData = req.body
		console.log(productData);
		
		Product.addNewProduct(productData)
		res.redirect('/products')
	}
}
export default ProductController