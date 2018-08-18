const express = require('express');
const app = express();
const path = require('path')
var bodyParser = require('body-parser');
var request = require('request')
var request = request.defaults({jar: true})
var session = require("express-session");
var cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 8080

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(__dirname));

app.get('/', function(req, res) {
    res.render('pages/products/index');
})

app.get('/shoppingCart', function(req, res) {
    res.render('pages/shoppingcart/index');
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))