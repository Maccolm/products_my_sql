import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { fileURLToPath } from "url";
import session from 'express-session'
import { title } from "process";

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

// -------login---------------
app.post('/login', function (req, res) {
	console.log(req.body)

	res.cookie('userName', req.body.username, { maxAge: 600000 })
	res.redirect('/')
	
})
//--------read--------
app.get('/', function (req, res) {
	console.log('Cookies ', req.cookies)

	if(req.session.isNew || !req.session.products) {
		req.session.products = []
		res.render('products', {title: 'shop card is empty', products: [] })		
	} else {
		res.render('products', { title: 'shop card', products: req.session.products })
	}
})
//-------logout------------
app.get('/logout', function (req, res) {
	if(req.cookies.userName)
		res.clearCookie('userName')
	res.redirect('/')
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
