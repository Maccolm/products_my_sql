class ProductController {
	static allProducts(req, res) {
		
		res.render('/' , {
			products: productList
		})
	}
}