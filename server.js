#!/usr/bin/env node

// create our app express
var express  = require('express');
var app      = express();          
var mongoose = require('mongoose'); 
const Nightmare = require('nightmare');
const cheerio = require('cheerio');

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
var mongoDB = 'mongodb://localhost:27017/test';
mongoose.connect(mongoDB, { useNewUrlParser: true });
// Получение Mongoose для использования глобаного промиса
mongoose.Promise = global.Promise;
// Получение по умолчанию подключения
var db = mongoose.connection;

// Привязать подключение к ошибке события ( получение уведомления ошибок подключение )
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const nightmare = Nightmare({ show : true });
const url = 'https://bankrot.fedresurs.ru/DebtorsSearch.aspx';

nightmare
    .goto(url)
    .wait('body')
    .click('input#ctl00_cphBody_rblDebtorType_1')
    .wait(5000)
    .type('input#ctl00_cphBody_tbPrsLastName', 'Иванов')
    .type('input#ctl00_cphBody_tbPrsFirstName', 'Иван')
    .type('input#ctl00_cphBody_tbPrsMiddleName', 'Иванович')
    .click('input#ctl00_cphBody_btnSearch')
    .wait('table#ctl00_cphBody_gvDebtors')
    .evaluate(() => document.querySelector('#ctl00_cphBody_gvDebtors').innerHTML)
    //.end()
.then(response => {
    console.log(response);
    console.log(getData(response));
})
.catch(err => {
    console.log(err);
})

let getData = (html) => {
    data = [];
    const $ = cheerio.load(html);
    console.log($);
    $('table.itemlist tr td:nth-child(3)').each((i, elem) => {
      data.push({
        title : $(elem).text(),
        link : $(elem).find('a.storylink').attr('href')
      });
    });
    return data;
  }