const mysql = require('mysql');
const today = require('./public/javascripts/todaydb');
const todayDate = today.getTimeDB()
const conn = require("./db");

// Javascript 로 오늘 날짜 받아온 후에 밑에 where 절에 대입
function getAllMatchs(callback){
    connection.query(`SELECT * FROM match_lists where event_day = '${todayDate}' ORDER BY ID ASC`, (err, rows, fields) => { 
        if(err) throw err; 
        callback(rows); 
    }); 
} 

module.exports = {getAllMatchs};