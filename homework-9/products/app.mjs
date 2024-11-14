import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { fileURLToPath } from "url";
import session from 'express-session'
import FormValidator from './validators/formValidator.mjs'
import { checkSchema, validationResult } from 'express-validator'


const app = express();
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the
const __dirname = path.dirname(__filename); // get the name of the directory
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(
	session({
		secret:'it\'s a secret',
		cookie: { maxAge: 60000 },
		resave: false,
		saveUninitialized: false
	})
)

app.use(express.static(path.join(__dirname, "public")));

const initialProducts = [
	{ pr_type: 'Name', title: "Apple", price: 10, quantity: 50 },
	{ pr_type: 'Name', title: "Banana", price: 5, quantity: 30 },
	{ pr_type: 'Name', title: "Orange", price: 8, quantity: 20 },
	{ pr_type: 'Name', title: "Protein", price: 670, quantity: 5 },
	{ pr_type: 'Name', title: "Gainer", price: 470, quantity: 4 },
];

// -------login---------------
app.post('/login', checkSchema(FormValidator.formSchema), function (req, res) {
	console.log(req.body)

	const error = validationResult(req)
	if(!error.isEmpty()) {
		return res.status(400).json({ errors: error.array() })
	}
	res.cookie('userName', req.body.username, { maxAge: 600000 })
	res.redirect('/products?sort=price_low')
	
})
//--------read--------
app.get('/products', function (req, res) {
	console.log('Cookies ', req.cookies)

	if(req.session.isNew || !req.session.products) {
		req.session.products = [...initialProducts]
	}
	const { sort } = req.query
	let products = [...req.session.products]
	if(sort === 'price_low'){
		products.sort((a, b) => a.price - b.price)
	} else if(sort === 'price_high') {
		products.sort((a, b) => b.price - a.price)
	}

	res.render('products', {title: 'Products', products })		
	})
//-----------middleware-----------
app.post('/addProduct', (req, res) => {
	req.session.products.push({ pr_type: 'Name', title: req.body.product, price: req.body.price, quantity: req.body.quantity })
	res.redirect('/products?sort=price_high')
})
//-------logout------------
app.post('/logout', function (req, res) {
	if(req.cookies.userName)
		res.clearCookie('userName')
	res.redirect('loginForm.html')
})
// catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new Error("Not Found");
	err.status = 404;
	next(err);
});
// error handler
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};
	// render the error page
	res.status(err.status || 500);
	res.render("error");
});
export default app;
