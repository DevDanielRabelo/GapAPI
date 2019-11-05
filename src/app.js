'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();

//Conect ao banco
mongoose.connect('mongodb://gap-bd:tV95FEuTXywlezOrQbpR02KcS9AgVdCJaZHVzh8X3NYvUU3Hyl47xZWaI5snFnK5G7kd7mKPyeW0v8lqCxaKeg%3D%3D@gap-bd.documents.azure.com:10255/?ssl=true');
// var mongoClient = require("mongodb").MongoClient;
// mongoClient.connect("mongodb://gap-bd:tV95FEuTXywlezOrQbpR02KcS9AgVdCJaZHVzh8X3NYvUU3Hyl47xZWaI5snFnK5G7kd7mKPyeW0v8lqCxaKeg==@gap-bd.documents.azure.com:10255/?ssl=true", function (err, db) {
//   db.close();
// });

//Carregar os Models
const Product = require('./models/produto');

//Carregar as Rotas
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');

app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(bodyParser.urlencoded({ extended: false }));

// Habilita o CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', indexRoute);
app.use('/produtos', productRoute);

module.exports = app;