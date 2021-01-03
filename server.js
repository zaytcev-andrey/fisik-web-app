#!/usr/bin/env node

// create our app express
var express  = require('express');
var app      = express();          
const bodyParser = require('body-parser');
var mongoose = require('mongoose'); 
const Nightmare = require('nightmare');
const cheerio = require('cheerio');
const { SelectMultipleControlValueAccessor } = require('@angular/forms');

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));
app.use(bodyParser.json());

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

/*nightmare
    .goto(url)
    .wait('body')
    .click('input#ctl00_cphBody_rblDebtorType_1')
    .wait(5000)
    .type('input#ctl00_cphBody_tbPrsLastName', 'Иванов')
    .type('input#ctl00_cphBody_tbPrsFirstName', 'Иван')
    .type('input#ctl00_cphBody_tbPrsMiddleName', 'Иванович')
    .click('input#ctl00_cphBody_btnSearch')
    // .wait('table#ctl00_cphBody_gvDebtors') always exist
    .wait(5000)
    .evaluate(() => document.querySelector('body').innerHTML)
    //.evaluate(() => document.querySelector('#ctl00_cphBody_gvDebtors').innerHTML)
    //.end()
.then(response => {
    console.log('getting data from table');
    console.log(getData(response));
})
.catch(err => {
    console.log(err);
})*/

function getData(html){
  data = [];
  const $ = cheerio.load(html);
  $('table#ctl00_cphBody_gvDebtors > tbody > tr').each((i, elem) => {
    if (i)
    {
      var name = '';
      var taxpayerNumber = 0;
      var region = '';
      var address = '';
      $('td', elem).each((j, cell) => {
        if (j === 1) {
          name = $(cell).text().trim();
        }
        else if (j === 2) {
          taxpayerNumber = Number($(cell).text().trim());
        }
        else if (j === 5) {
          region = $(cell).text().trim();
        }
        else if (j === 6) {
          address = $(cell).text().trim();
        }
      });
      debtor = {
        'name' : name,
        'taxpayerNumber' : taxpayerNumber,
        'region' : region,
        'address' : address
      };
      data.push(debtor);
    }
  });
  return data;
}

async function getDebtors(surname, name, middleName, debtors) {
  const nightmare = Nightmare({ show : true });
  const url = 'https://bankrot.fedresurs.ru/DebtorsSearch.aspx';

  let response = await
  nightmare
    .goto(url)
    .wait('body')
    .click('input#ctl00_cphBody_rblDebtorType_1')
    .wait(5000)
    .type('input#ctl00_cphBody_tbPrsLastName', surname ? surname : '')
    .type('input#ctl00_cphBody_tbPrsFirstName', name ? name : '')
    .type('input#ctl00_cphBody_tbPrsMiddleName', middleName ? middleName : '')
    .click('input#ctl00_cphBody_btnSearch')
    // .wait('table#ctl00_cphBody_gvDebtors') always exist
    .wait(5000)
    .evaluate(() => document.querySelector('body').innerHTML)
    //.evaluate(() => document.querySelector('#ctl00_cphBody_gvDebtors').innerHTML)
    .end()
  .then(response => {
      console.log('getting data from table');      
      debtors = getData(response);
      console.log(debtors);
  })
  .catch(err => {
      console.log(err);
  });

  await response;

  constole.log(debtors);
}

// routes
app.get('/api/debtors', async function(req, res) 
{
  const { surname, name, middleName } = req.query;

  const nightmare = Nightmare({ show : true });
  const url = 'https://bankrot.fedresurs.ru/DebtorsSearch.aspx';

  let debtors = [];

  let response = 
  nightmare
    .goto(url)
    .wait('body')
    .click('input#ctl00_cphBody_rblDebtorType_1')
    .wait(5000)
    .type('input#ctl00_cphBody_tbPrsLastName', surname ? surname : '')
    .type('input#ctl00_cphBody_tbPrsFirstName', name ? name : '')
    .type('input#ctl00_cphBody_tbPrsMiddleName', middleName ? middleName : '')
    .click('input#ctl00_cphBody_btnSearch')
    // .wait('table#ctl00_cphBody_gvDebtors') always exist
    .wait(5000)
    .evaluate(() => document.querySelector('body').innerHTML)
    //.evaluate(() => document.querySelector('#ctl00_cphBody_gvDebtors').innerHTML)
    .end()
  .then(response => {
      console.log('getting data from table');      
      debtors = getData(response);
      console.log(debtors);
  })
  .catch(err => {
      console.log(err);
  });

  await response;

  for (let debt of debtors) {
    let [surname, name, middleName] = debt.name.split(' ');
    debt.surname = surname;
    debt.name = name;
    debt.middleName = middleName;
  }

  res.json( debtors );

});