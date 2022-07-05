const express = require('express');
const session = require('express-session');
const mysql = require('mysql');
const app = express();
//compulsory to read
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));

/**
 * Sessions
 */
 const {
    PORT = 3000,
    SESS_SECRET = '!iamCAT',
    SESS_NAME = 'sid', 
    SESS_LIFETIME = 2 * 1000 * 60 * 60,
    NODE_ENV = 'development'
} = process.env;

const IN_PROD = NODE_ENV === 'production';
app.use(session({
    name : SESS_NAME,
    resave : true,
    saveUninitialized : true,
    secret : SESS_SECRET,
    cookie : {
        maxAge : SESS_LIFETIME,
        sameSite : true,
        secure : IN_PROD
    }
}));


//created connection with database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'lab_project'
});
connection.connect();


/**
 * Secure Redirects
 */
 const redirectLogin = (req, res, next) => {
    if (!req.session.userIdInSession) {
        res.redirect('/login');
    } else {
        next();
    }
};

const redirectHome = (req, res, next) => {
    if (req.session.userIdInSession) {
        res.redirect('/home');
    } else {
        next();
    }
};

/**
 * Routes
 */
//main routes
app.use('/login', require('./routes/login')(connection,redirectHome));
app.use('/register', require('./routes/register')(connection));
app.use('/logout', require('./routes/logout')(redirectLogin, SESS_NAME));
app.use('/home',require('./routes/home')(connection,redirectLogin));
app.use('/product',require('./routes/productdetails')(connection,redirectLogin));

//profile Routes
app.use('/profile', require('./routes/profile/profile')(connection,redirectLogin));
app.use('/updateprofile',require('./routes/profile/updateprofile')(connection,redirectLogin));
app.use('/deleteprofile', require('./routes/profile/deleteprofile')(connection,redirectLogin,SESS_NAME));

//buyer Routes
app.use('/history',require('./routes/buyer/history')(connection,redirectLogin));
app.use('/whishlist', require('./routes/buyer/whishlist')(connection,redirectLogin));
app.use('/remove-from-whishlist',require('./routes/buyer/removefromwhishlist')(connection,redirectLogin));
app.use('/orders', require('./routes/buyer/orders')(connection,redirectLogin));//written triggers after insert😁😁😁
app.use('/cancelorder', require('./routes/buyer/cancelorder')(connection,redirectLogin));//written trigger after update 👍👍👍

//cart Routes once again see this
app.use('/cart', require('./routes/buyer/cart/cart')(connection,redirectLogin));
app.use('/add-to-cart', require('./routes/buyer/cart/addcart')(connection,redirectLogin));
app.use('/remove-cart',require('./routes/buyer/cart/deletecart')(connection,redirectLogin));
app.use('/checkout',require('./routes/buyer/cart/checkout')(connection,redirectLogin));//written stored procedure😊😊😊

//seller routes
app.use('/seller-home-page', require('./routes/seller/sell')(connection,redirectLogin));
app.use('/sell/orders', require('./routes/seller/orders')(connection,redirectLogin));
app.use('/sell/deliver_order',require('./routes/seller/deliverorder')(connection,redirectLogin));
app.use('/sell/history',require('./routes/seller/history')(connection,redirectLogin));
//product routes
app.use('/sell/postproduct',require('./routes/seller/product/postproduct')(connection,redirectLogin));
app.use('/sell/updateproduct',require('./routes/seller/product/updateproduct')(connection,redirectLogin));
app.use('/sell/deleteproduct',require('./routes/seller/product/deleteproduct')(connection,redirectLogin));//make status unavailable faster


//home route
app.use('/',require('./routes/main')());

app.listen(PORT,()=>console.log(`app listening on port ${PORT}`));



