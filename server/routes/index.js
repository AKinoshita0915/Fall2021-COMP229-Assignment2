let express = require('express');
let router = express.Router();

let indexController = require("../controllers/index");

/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/home', indexController.displayHomePage);

/* GET about page. */
router.get('/about', indexController.displayAboutPage);

/* GET products page. */
router.get('/products', indexController.displayProductsPage);

/* GET service page. */
router.get('/services', indexController.displayServicesPage);

/* GET contact page. */
router.get('/contact', indexController.displayContactPage);


/* GET Route for display Login page */
router.get('/login', indexController.displayLoginPage);

/* POST Route for proceed Login page */
router.post('/login', indexController.processLoginPage);

/* GET Route for display Login page */
router.get('/register', indexController.displayRegisterPage);

/* POST Route for proceed Login page */
router.post('/register', indexController.processRegisterPage);

/* GET to Logout */
router.get('/logout', indexController.performLogout);

module.exports = router;
