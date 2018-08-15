const express = require('express');
const app = express();
const path = require('path')
const PORT = process.env.PORT || 8080

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static(__dirname));

app.get('/', function(req, res) {
    res.render('pages/products/index');
})
  
app.get('/products', function(req, res) { 
    var request = require('request')
    var EventEmitter = require("events").EventEmitter;
    var body = new EventEmitter();

    var productsUrl = "https://shopping-cart-api-mcf.herokuapp.com/products";

    request({
        url: productsUrl,
        json: true
    }, function (error, response, data) {
        if (!error && response.statusCode === 200)
            body.data = data;
        else
            body.data = null;

        body.emit('update');
    });

    body.on('update', function () {
        if(body.data != null)
            res.status(200).send(body.data)
        else//TODO
        res.status(500).send({})
    });
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))