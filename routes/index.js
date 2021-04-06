var express = require('express');
var router = express.Router();
var fs = require('fs')
const mysql = require('./../db'); // 작성한 db.js를 불러온다.
const dbdata = require('./../DBdata') // connection 은 서버가 켜질 때 app.js 에서 수행되었다.
var dateFormat = require("dateformat"); // 오늘 날짜 조회를 위한 모듈
var getAlle = dbdata.getAlle;


var today = require('./../public/javascripts/dataformat'); // 오늘날짜 mm/dd 형식의 모듈
const { fetchSync } = require('cheerio-httpcli');
const { error } = require('console');
var getToday = today();


// 유저에게 날짜를 입력받아 db날짜형식으로 치환, 변수에 담기

/* GET home page. */
router.get('/', function (req, res, next) {

  // res.render('index', { title: 'SPO LINE' });
  // db.getAlle((rows) =>{
  // res.render('index', {rows : rows});
  mysql.query(`select * from match_lists where event_day = '${getToday}'`, function (err, rows, fields) { // 쿼리문을 이용해 데이터를 가져온다.
    if (!err) { // 에러가 없다면
      // for (let index = 0; index < rows.length; index++) {
      //   const element = rows[index];
      //   console.log(element.league_name);
      //   var leaguename = element.league_name;
        
      // }
      var matchList = [];
      for (var i = 0; i < rows.length; i++) {

        // match 객체를 생성한후 현재 rows의 데이터를 저장한다 Create an object to save current row's data
        var match = {
          'event_day':rows[i].event_day,
          'league_name':rows[i].league_name,
          'event_time':rows[i].event_time,
          'hometeam':rows[i].hometeam,
          'hometeam_score':rows[i].hometeam_score,
          'match_result':rows[i].match_result,
          'awayteam_score':rows[i].awayteam_score,
          'awayteam':rows[i].awayteam
        }
        // 객체를 배열에 추가한다.
        matchList.push(match);
    }
    // console.log(rows);
    // for (var i =0; i < rows.length; i++) {
    //     console.log(rows[i].league_name);
    //     console.log(matchList[i].league_name);
        
    //   }
  
      
      var leagueList = {};
      for (const key in rows) {
        const element = rows[key];
        var leagueName = element.league_name;
        if (leagueName === '프리미어리그') {
          var lpl = [];
          lpl.push(element);
          leagueList.lpl = lpl;
          
        } else if (leagueName === '라리가') {
          var laliga = [];
          laliga.push(element);
          leagueList.laliga = laliga;
          
        } else if (leagueName === '분데스리가') {
          var bundesliga = [];
          bundesliga.push(element);
          leagueList.bundesliga = bundesliga;
          

        } else if (leagueName === '세리에A') {
          var seriaA = [];
          seriaA.push(element);
          leagueList.seriaA = seriaA;

        } else if (leagueName === '리그1') {
          var league1 = [];
          league1.push(element);
          leagueList.league1 = league1;

        } else if (leagueName === '에레디비시') {
          var eredevici = [];
          eredevici.push(element);
          leagueList.eredevici = eredevici;

        } else if (leagueName === 'UEFA 챔피언스리그') {
          var champions = [];
          champions.push(element);
          leagueList.champions = champions;


        } else if (leagueName === 'UEFA 유로파리그') {
          var europa = [];
          europa.push(element);
          leagueList.europa = europa;

        } else if (leagueName === 'EFL컵') {
          var efl = [];
          efl.push(element);
          leagueList.efl = efl;

        } else if (leagueName === 'The FA컵') {
          var theFA = [];
          theFA.push(element);
          leagueList.theFA = theFA;

        } else if (leagueName === '코파 델 레이') {
          var copadelea = [];
          copadelea.push(element);
          leagueList.copadelea = copadelea;
        }
      }
      
      //rows 와 matchList 는 둘다 배열
      
      var leagueNum = Object.keys(leagueList).length; // 리그 종류 갯수

      // 리그 종류의 중복을 제거 한 데이터 추출
      mysql.query(`select distinct league_name from match_lists where event_day = '${getToday}'`, function (err, rowsnum, fields) { // 쿼리문을 이용해 데이터를 가져온다.
        if (!err) {
          var leagueName=[];
          for (var i = 0; i < rowsnum.length; i++) {
            leagueName.push(rowsnum[i].league_name);
          }
          // for (let i = 0; i < rowsnum.length; i++) {
            //   console.log(leagueName[i]);
            // }
          }
          else { // 에러가 있다면?
            console.log("err : " + err);
            res.send(err); // console 창에 에러를 띄워주고, 에러를 보내준다.
          }
          res.render('index', {
            title: "SPO LINE",
            adv:  "광 고",
            tit_league: "leagueName",
            "matchList":matchList,
            matches:rows, 
            leagueNum:leagueNum, // 리그 갯수 중복 제거
            "leagueName":leagueName,
            event_day:getToday
          }); // rows 를 보내주자
        });
        
      // var value = leagueList[Object.keys(leagueList)[0]];
      // var value4 = leagueList[Object.keys(leagueList)[4]];
      // console.log(Object.keys(leagueList));
      
      // var valueLeague = value
      // console.log(matchList);
      // console.log(rows);
      // console.log(leagueNum);
      // console.log(value);
  
      // console.log(value[0].league_name); // 리그 종류 갯수
      // console.log(leagueNum);
      // console.log(value[0]);
      // for (var i = 0; i < leagueNum.length; i++) {
        
      // }
      
      // console.log(leagueList);

      // var leagueList = {};
      // leagueList.lpl = lpl;
      // leagueList.laliga = laliga;
      // leagueList.bundesliga = bundesliga;
      // leagueList.seriaA = seriaA;
      // leagueList.league1 = league1;
      // leagueList.eredevici = eredevici;
      // leagueList.champions = champions;
      // leagueList.europa = europa;
      // leagueList.efl = efl;
      // leagueList.theFA = theFA;
      // // leagueList.copadelea = copadelea;
      // for (var key in Object.keys(leagueList)) {
      //   console.log(key);
      //   console.log(leagueList[key]);
      // }

      // function isEmpty(params) {
      //   for (const key in params) {
      //     console.log(Object.keys(key).length);



      //   }



      // }
      // isEmpty(leagueList);

      // console.log((leagueList));

      // for (let i = 0; i < leagueList.length; i++) {
      //   const element = leagueList[i];
      //   console.log(leagueList);
      //}

      // console.log('lpl : ',lpl);
      // console.log('laliga :', laliga);
      // console.log('seriaA :',seriaA);
    } else { // 에러가 있다면?
      console.log("err : " + err);
      res.send(err); // console 창에 에러를 띄워주고, 에러를 보내준다.
    }
  });  
});

router.post('/', function (req, res) {
  const event_day = dateFormat(req.body.selectedDate, "mm/dd");
  mysql.query(`select * from match_lists where event_day='${event_day}'`, function (err, rows, fields) {
    if (!err) { // 에러가 없다면
      // for (let index = 0; index < rows.length; index++) {
      //   const element = rows[index];
      //   console.log(element.league_name);
      //   var leaguename = element.league_name;
        
      // }
      var matchList = [];
      for (var i = 0; i < rows.length; i++) {

        // match 객체를 생성한후 현재 rows의 데이터를 저장한다 Create an object to save current row's data
        var match = {
          'event_day':rows[i].event_day,
          'league_name':rows[i].league_name,
          'event_time':rows[i].event_time,
          'hometeam':rows[i].hometeam,
          'hometeam_score':rows[i].hometeam_score,
          'match_result':rows[i].match_result,
          'awayteam_score':rows[i].awayteam_score,
          'awayteam':rows[i].awayteam
        }
        // 객체를 배열에 추가한다.
        matchList.push(match);
    }
    // console.log(rows);
    // for (var i =0; i < rows.length; i++) {
    //     console.log(rows[i].league_name);
    //     console.log(matchList[i].league_name);
        
    //   }
    var matchLength = matchList.length;
    console.log(matchLength);
    
      
      var leagueList = {};
      for (const key in rows) {
        const element = rows[key];
        var leagueName = element.league_name;
        if (leagueName === '프리미어리그') {
          var lpl = [];
          lpl.push(element);
          leagueList.lpl = lpl;
          
        } else if (leagueName === '라리가') {
          var laliga = [];
          laliga.push(element);
          leagueList.laliga = laliga;
          
        } else if (leagueName === '분데스리가') {
          var bundesliga = [];
          bundesliga.push(element);
          leagueList.bundesliga = bundesliga;
          

        } else if (leagueName === '세리에A') {
          var seriaA = [];
          seriaA.push(element);
          leagueList.seriaA = seriaA;

        } else if (leagueName === '리그1') {
          var league1 = [];
          league1.push(element);
          leagueList.league1 = league1;

        } else if (leagueName === '에레디비시') {
          var eredevici = [];
          eredevici.push(element);
          leagueList.eredevici = eredevici;

        } else if (leagueName === 'UEFA 챔피언스리그') {
          var champions = [];
          champions.push(element);
          leagueList.champions = champions;


        } else if (leagueName === 'UEFA 유로파리그') {
          var europa = [];
          europa.push(element);
          leagueList.europa = europa;

        } else if (leagueName === 'EFL컵') {
          var efl = [];
          efl.push(element);
          leagueList.efl = efl;

        } else if (leagueName === 'The FA컵') {
          var theFA = [];
          theFA.push(element);
          leagueList.theFA = theFA;

        } else if (leagueName === '코파 델 레이') {
          var copadelea = [];
          copadelea.push(element);
          leagueList.copadelea = copadelea;
        }
      }
      
      //rows 와 matchList 는 둘다 배열
      
      var leagueNum = Object.keys(leagueList).length; // 리그 종류 갯수

      // 리그 종류의 중복을 제거 한 데이터 추출
      mysql.query(`select distinct league_name from match_lists where event_day = '${event_day}'`, function (err, rowsnum, fields) { // 쿼리문을 이용해 데이터를 가져온다.
        if (!err) {
          var leagueName=[];
          for (var i = 0; i < rowsnum.length; i++) {
            leagueName.push(rowsnum[i].league_name);
          }
          // for (let i = 0; i < rowsnum.length; i++) {
            //   console.log(leagueName[i]);
            // }
          }
          else { // 에러가 있다면?
            console.log("err : " + err);
            res.send(err); // console 창에 에러를 띄워주고, 에러를 보내준다.
          }
          res.render('index', {
            title: "SPO LINE",
            adv:  "광 고",
            tit_league: "leagueName",
            "matchList":matchList,
            matches:rows, 
            leagueNum:leagueNum, // 리그 갯수 중복 제거
            "leagueName":leagueName,
            event_day:event_day,
            matchLength:matchLength
          }); // rows 를 보내주자
        });
        
      // var value = leagueList[Object.keys(leagueList)[0]];
      // var value4 = leagueList[Object.keys(leagueList)[4]];
      // console.log(Object.keys(leagueList));
      
      // var valueLeague = value
      // console.log(matchList);
      // console.log(rows);
      // console.log(leagueNum);
      // console.log(value);
  
      // console.log(value[0].league_name); // 리그 종류 갯수
      // console.log(leagueNum);
      // console.log(value[0]);
      // for (var i = 0; i < leagueNum.length; i++) {
        
      // }
      
      // console.log(leagueList);

      // var leagueList = {};
      // leagueList.lpl = lpl;
      // leagueList.laliga = laliga;
      // leagueList.bundesliga = bundesliga;
      // leagueList.seriaA = seriaA;
      // leagueList.league1 = league1;
      // leagueList.eredevici = eredevici;
      // leagueList.champions = champions;
      // leagueList.europa = europa;
      // leagueList.efl = efl;
      // leagueList.theFA = theFA;
      // // leagueList.copadelea = copadelea;
      // for (var key in Object.keys(leagueList)) {
      //   console.log(key);
      //   console.log(leagueList[key]);
      // }

      // function isEmpty(params) {
      //   for (const key in params) {
      //     console.log(Object.keys(key).length);



      //   }



      // }
      // isEmpty(leagueList);

      // console.log((leagueList));

      // for (let i = 0; i < leagueList.length; i++) {
      //   const element = leagueList[i];
      //   console.log(leagueList);
      //}

      // console.log('lpl : ',lpl);
      // console.log('laliga :', laliga);
      // console.log('seriaA :',seriaA);
    } else { // 에러가 있다면?
      console.log("err : " + err);
      res.send(err); // console 창에 에러를 띄워주고, 에러를 보내준다.
    }
  });
  });

  router.get('/dividendFlow', function(request, response) { 
    fs.readFile(`DividendFlow.html`, 'utf8', function(err, description){
      
      var html = description;
      response.send(html);
    });
  });

  router.get('/proto', function(request, response) { 
    fs.readFile(`Proto.html`, 'utf8', function(err, description){
      
      var html = description;
      response.send(html);
    });
  });

  router.get('/ElectiveGame', function(request, response) { 
    fs.readFile(`ElectiveGame.html`, 'utf8', function(err, description){
      
      var html = description;
      response.send(html);
    });
  });
  router.get('/CmparativeAnalysis', function(request, response) { 
    fs.readFile(`CmparativeAnalysis.html`, 'utf8', function(err, description){
      
      var html = description;
      response.send(html);
    });
  });
  router.get('/LineUp', function(request, response) { 
    fs.readFile(`LineUp.html`, 'utf8', function(err, description){
      
      var html = description;
      response.send(html);
    });
  });
  router.get('/RankingTable', function(request, response) { 
    fs.readFile(`RankingTable.html`, 'utf8', function(err, description){
      
      var html = description;
      response.send(html);
    });
  });
  router.get('/:leagueID', function(request, response) { 
    var leagueID = request.params.leagueID;
    console.log(leagueID);
    response.render('index',{
      title:'hello'
    })

    })
   



    // fs.readFile(`RankingTable.html`, 'utf8', function(err, description){
      
    //   var html = description;
    //   response.send(html);
    // });

module.exports = router;