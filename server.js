const express = require('express');
const app = express();
const path = require('path')
var bodyParser = require('body-parser');
var request = require('request')
var request = request.defaults({jar: true})
var host = "https://shopping-cart-api-mcf.herokuapp.com";
//var host = "http://localhost:8081";
const PORT = process.env.PORT || 8080

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(bodyParser.json());  
app.use(express.static(__dirname));

app.get('/', function(req, res) {
    res.render('pages/products/index');
})

app.get('/shoppingCart', function(req, res) {
    res.render('pages/shoppingCart/index');
})


app.get('/shoppingcartItens', function(req, res) {
    var EventEmitter = require("events").EventEmitter;
    var body = new EventEmitter();

    var cartUrl = host + "/shoppingcart";

    request({
        url: cartUrl,
        json: true
    }, function (error, response, data) {
        if (!error && response.statusCode === 200)
            body.data = data;
        else
            body.data = error;

        body.emit('update');
    });

    body.on('update', function () {
        if(body.data != null)
            res.status(200).send(body.data)
        else//TODO handle exception
            res.status(200).send([])
    });
})
  
app.get('/products', (req, res) =>{     
    var EventEmitter = require("events").EventEmitter;
    var body = new EventEmitter();

    var productsUrl = host + "/products";

    request({
        url: productsUrl,
        json: true
    }, function (error, response, data) {
        if (!error && response.statusCode === 200)
            body.data = data;
        else
            body.data = error;

        body.emit('update');
    });

    body.on('update', function () {
        if(body.data != null)
            res.status(200).send(body.data)
        else//TODO handle exception
            res.status(200).send([])
    });
})

app.post("/addItem", (req, res) =>{
    var prodId = req.body.id =! null ? req.body.id : "";
    var addItemURL = host + "/shoppingcart/items?product_id="+prodId+"&quantity=1";
    var EventEmitter = require("events").EventEmitter;
    var body = new EventEmitter();

    request({
        url: addItemURL,
        method: "POST",
        json: true
    }, function (error, response, data){
        if (!error && response.statusCode === 200)
            body.data = data;
        else
            body.data = error;

        body.emit('update');
    });

    body.on('update', function () {
        if(body.data != null)
            res.status(200).send(body.data)
        else//TODO handle exception
            res.status(200).send({error: true})
    });
})


app.post("/removeItem", (req, res) =>{
    var prodId = req.body.id =! null ? req.body.id : "";
    var removeItemURL = host + "/shoppingcart/items/" + prodId;
    var EventEmitter = require("events").EventEmitter;
    var body = new EventEmitter();

    request({
        url: removeItemURL,
        method: "POST",
        json: true
    }, function (error, response, data){
        if (!error && response.statusCode === 200)
            body.data = data;
        else
            body.data = error;

        body.emit('update');
    });

    body.on('update', function () {
        if(body.data != null)
            res.status(200).send(body.data)
        else//TODO handle exception
            res.status(200).send({error: true})
    });
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))