#!/usr/bin/env node

// create our app express
var express  = require('express');
var app      = express();          
var mongoose = require('mongoose'); 

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

var port = 12345;
app.listen(port, function () 
{
    console.log('app started at port ' + port);
});

// db connection
// mogoose connection url
var mongoDB = 'mongodb://localhost/test';
mongoose.connect(mongoDB, { useNewUrlParser: true });
// Получение Mongoose для использования глобаного промиса
mongoose.Promise = global.Promise;
// Получение по умолчанию подключения
var db = mongoose.connection;

// Привязать подключение к ошибке события ( получение уведомления ошибок подключение )
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
