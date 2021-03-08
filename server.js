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
      // pager should be skipped
      if (elem.attribs["class"] == "pager") {
        console.log("Pager found");
        return;
      }

      var name = '';
      var taxpayerNumber = 0;
      var region = '';
      var address = '';
      $('td', elem).each((j, cell) => {
        if (j === 1) {
          const link = $(cell).children('a');
          if (link) {
            console.log($(link).attr('href'));
          }
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

function getDebtorInfoFromText(textArray) {
  let debtor = { id: -1 };
  for (let text of textArray) {
    const surnameFound = text.match(/Фамилия\s*([А-Яа-я0-9_]*)/);
    if (surnameFound && surnameFound.length > 0) {
      debtor.surname = surnameFound[1];
    }
    const nameFound = text.match(/Имя\s*([А-Яа-я0-9_]*)/);
    if (nameFound && nameFound.length > 0) {
      debtor.name = nameFound[1];
    }
    const middleNameFound = text.match(/Отчество\s*([А-Яа-я0-9_]*)/);
    if (middleNameFound && middleNameFound.length > 0) {
      debtor.middleName = middleNameFound[1];
    }
    const taxpayerNumberFound = text.match(/ИНН\s*(\d*)/);
    if (taxpayerNumberFound && taxpayerNumberFound.length > 0) {
      debtor.taxpayerNumber = taxpayerNumberFound[1];
    }
    const regionFound = text.match(/Регион ведения дела о банкротстве\s*([\sА-Яа-я0-9]*)/);
    if (regionFound && regionFound.length > 0) {
      debtor.region = regionFound[1];
    }
    const addressFound = text.match(/Место жительства\s*(.*)/);
    if (addressFound && addressFound.length > 0) {
      debtor.address = addressFound[1];
    }
  }
  return debtor;
}

async function getDebtorsFullInfoFromLinks(debtorsHref, nightmare) {
  try {
    // get info for each debtors resf
    let debtorsInfoArray = [];
    let idx = 0;
    for (let debtorHref of debtorsHref) {
      try {
        const debtorInfoTable = await nightmare
          .goto(debtorHref)
          .wait(1000)
          .title()
          .evaluate(() => {
            let debtorInfoTable = [];
            document.querySelectorAll('#right > table.au > tbody > tr').forEach(e => {
              console.log(e.innerText);
              debtorInfoTable.push(e.innerText);
            });
            console.log(debtorInfoTable);
            return debtorInfoTable;
          });
        await debtorInfoTable;
        let debtor = getDebtorInfoFromText(debtorInfoTable);
        debtor.id = idx++;

        debtorsInfoArray.push(debtor);
      } catch(err) {
          console.log(err);
      }
    }
    return debtorsInfoArray;
  } catch (error) {
      console.error(error);
      throw error;
  }
}

async function getDebtorsFullInfo(surname, name, middleName, pageNumber) {
  const nightmare = Nightmare({ show : true });
  const url = 'https://bankrot.fedresurs.ru/DebtorsSearch.aspx';

  try {
    let selfPage = 1;

    // get ref for each debtor from search sesult table
    const debtorsHref = await nightmare
      .goto(url)
      .wait('body')
      .click('input#ctl00_cphBody_rblDebtorType_1')
      .wait(5000)
      .insert('input#ctl00_cphBody_tbPrsLastName', surname ? surname : '')
      .insert('input#ctl00_cphBody_tbPrsFirstName', name ? name : '')
      .insert('input#ctl00_cphBody_tbPrsMiddleName', middleName ? middleName : '')
      .click('input#ctl00_cphBody_btnSearch')
      // .wait('table#ctl00_cphBody_gvDebtors') always exist
      .wait(5000)
      .evaluate(() => {
        let debtorsHrefArray = [];
        // Find all the URLs on the page you want to scrape and store them in an array
        document.querySelectorAll('table#ctl00_cphBody_gvDebtors > tbody > tr > td:nth-child(2) > a').forEach(e => {
          debtorsHrefArray.push(e.href);
        });
        return debtorsHrefArray; // array of urls
      });

    await debtorsHref;
    console.log('debtorsHref:');
    console.log(debtorsHref);

    let hrefs = await nightmare
    .evaluate(() => {
      let hrefsTmp = [];
      // Find all the URLs on the page you want to scrape and store them in an array
      document.querySelectorAll('#ctl00_cphBody_gvDebtors > tbody > tr.pager > td > table > tbody > tr a').forEach(e => {
        const hrefObj = {
          href : e.href,
          text: e.text };
        hrefsTmp.push(hrefObj);
      })
      return hrefsTmp; // array of urls
    });
    console.log(hrefs);
    
    // get info for each debtors resf
    let debtorsInfoArray = [];

    if (pageNumber === selfPage)
    {
        debtorsInfoArray = await getDebtorsFullInfoFromLinks(debtorsHref, nightmare);
    }
    else
    {
        // go to certain page and process data

        // should use recursion instead of this!
        let debtorsHref = [];
        for (let hrefPage of hrefs) 
        {
            if (Number(hrefPage.text) === pageNumber) 
            {
                // again: get reference for each debtor from search sesult table
                debtorsHref = await nightmare
                    .goto(hrefPage.href)
                    .wait(1000)
                    .evaluate(() => 
                    {
                        let debtorsHrefArray = [];
                        // Find all the URLs on the page you want to scrape and store them in an array
                        document.querySelectorAll('table#ctl00_cphBody_gvDebtors > tbody > tr > td:nth-child(2) > a').forEach(e => 
                        {
                            debtorsHrefArray.push(e.href);
                        });
                        return debtorsHrefArray; // array of urls
                    });
            }
        }

        // get pages reference once again
        hrefs = await nightmare
            .evaluate(() => 
            {
                let hrefsTmp = [];
                // again: Find all the URLs on the page you want to scrape and store them in an array
                document.querySelectorAll('#ctl00_cphBody_gvDebtors > tbody > tr.pager > td > table > tbody > tr a').forEach(e => 
                {
                    const hrefObj = {
                    href : e.href,
                    text: e.text };
                    hrefsTmp.push(hrefObj);
                })
                return hrefsTmp; // array of urls
            });
            console.log(hrefs);
    
        // again: get info for each debtors resf
        debtorsInfoArray = await getDebtorsFullInfoFromLinks(debtorsHref, nightmare);
        selfPage = pageNumber;
    }

    pagesInfo = { self: selfPage, pages: [selfPage]};
    if (hrefs) 
    {
        pages = [selfPage];
        for (let hrefPage of hrefs) 
        {
            pages.push(Number(hrefPage.text));
        }
        pages.sort();
        pagesInfo.pages = pages;
    }

    result = { pagesInfo, debtorsInfoArray };
    console.log(result);

    return result;
  }
  catch (error)
  {
      console.error(error);
      throw error;
  } 
  finally 
  {
    await nightmare.end();
  }
}

/*(async () => {
  const debtorsInfoArray = await getDebtorsFullInfo("Иванов", "Алексей", "", 1);
  console.log(debtorsInfoArray);
})();*/

// routes
app.get('/api/debtors', async function(req, res) 
{
  const { surname, name, middleName, page } = req.query;
  const pageNumber = page ? Number(page) : 1;

  const nightmare = Nightmare({ show : true });
  const url = 'https://bankrot.fedresurs.ru/DebtorsSearch.aspx';

  let debtors = [];
  const getDebtorFromAllPage = false;

  /*let response = 
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
    .then(response => {
        console.log('getting data from table');      
        debtors = getData(response);
        console.log(debtors);
    })
    .catch(err => {
        console.log(err);
    });

  await response;*/

  const debtorsFullInfoResult = await getDebtorsFullInfo(surname ? surname : '', name ? name : '', middleName ? middleName : '', pageNumber);
  res.json( debtorsFullInfoResult );
  console.log('/api/debtors result:');
  console.log(res);
  return;


  let selfPage = 1;

  let requestPromise = 
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
    .then(response => {
        console.log('getting data from table');      
        debtors = debtors.concat(getData(response));
        console.log(debtors);
    })
    .catch(err => {
        console.log(err);
    });

  await requestPromise;

  const debtorsHref = await nightmare
  .evaluate(() => {
    const debtorsHref = [];
    // Find all the URLs on the page you want to scrape and store them in an array
    document.querySelectorAll('table#ctl00_cphBody_gvDebtors > tbody > tr > td:nth-child(2) > a').forEach(e => {
      const hrefObj = {
        href : e.href,
        text: e.text };
        debtorsHref.push(hrefObj);
    });
    console.log('debtorsHref:');
    console.log(debtorsHref);
    return debtorsHref; // array of urls
  });
  console.log('debtorsHref:');
  console.log(debtorsHref);

  let hrefs = await nightmare
  .evaluate(() => {
    let hrefs = [];
    // Find all the URLs on the page you want to scrape and store them in an array
    document.querySelectorAll('#ctl00_cphBody_gvDebtors > tbody > tr.pager > td > table > tbody > tr a').forEach(e => {
      const hrefObj = {
        href : e.href,
        text: e.text };
      hrefs.push(hrefObj);
    })
    return hrefs; // array of urls
  });
  console.log(hrefs);

  let debtorsLink = [];

  // get data from all page
  if (getDebtorFromAllPage) {
    for (let hrefPage of hrefs) {
      await nightmare
        .goto(hrefPage.href)
        .wait(1000)
        .evaluate(() => document.querySelector('body').innerHTML)
        .then(response => {
            console.log('getting data from table');      
            debtors = debtors.concat(getData(response));
        })
        .catch(err => {
            console.log(err);
        });
    }
  }
  else if (pageNumber != selfPage) {
    // should use recursion instead of this!
    for (let hrefPage of hrefs) {
      if (Number(hrefPage.text) === pageNumber) {
        await nightmare
        .goto(hrefPage.href)
        .wait(1000)
        .evaluate(() => document.querySelector('body').innerHTML)
        .then(response => {
            console.log('getting data from table');      
            debtors = getData(response);
        })
        .catch(err => {
            console.log(err);
        });
      }
    }

    // get pages once again
    hrefs = await nightmare
      .evaluate(() => {
        let hrefs = [];
        // Find all the URLs on the page you want to scrape and store them in an array
        document.querySelectorAll('#ctl00_cphBody_gvDebtors > tbody > tr.pager > td > table > tbody > tr a').forEach(e => {
          const hrefObj = {
            href : e.href,
            text: e.text };
          hrefs.push(hrefObj);
        })
        return hrefs; // array of urls
      });
      console.log(hrefs);

      selfPage = pageNumber;
  }

  await nightmare
  .end()
  .then(()=>{});
  console.log(debtors);

  for (let debt of debtors) {
    let [surname, name, middleName] = debt.name.split(' ');
    debt.surname = surname;
    debt.name = name;
    debt.middleName = middleName;
  }

  pagesInfo = { self: selfPage, pages: [selfPage]};
  if (hrefs) {
    pages = [selfPage];
    for (let hrefPage of hrefs) {
      pages.push(Number(hrefPage.text));
    }
    pages.sort();
    pagesInfo.pages = pages;
  }

  result = { pagesInfo, debtors };

  res.json( result );

});