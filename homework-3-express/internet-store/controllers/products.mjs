import Product from "../models/Product.mjs";
class ProductController {
	static allProducts(req, res) {
		const productList = Product.loadProductList()
		res.render('products' , {
			products: productList
		})
	}
}
export default ProductController