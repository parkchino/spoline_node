const mysql = require('mysql');

const conn = mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'root',
    password:'lfochino',
    database:'scrapingdata'
  });

module.exports = conn;
