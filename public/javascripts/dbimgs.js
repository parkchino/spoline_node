var mysql = require('../../db');


mysql.connect();



mysql.query(`INSERT INTO team_imgs VALUES (1,'https://placeimg.com/64/64/1', '홍길동'); `,function (err,rows,fields) {
    
}
mysql.query(`select * from match_lists where event_day = '03/11'`,function (err,rows,fields) {
if(!err){
    console.log(rows);

}

    
})