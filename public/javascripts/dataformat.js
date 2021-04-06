var dateFormat = require("dateformat");
var now = new Date();


// Basic usage

var moment = require('moment');
moment().format(); //2018-11-18T22:19:20+09:00
moment().format("MM-DD-YYYY"); //11-18-2018
moment().format("YYYY"); //2018
var tomorrow = moment().add(1, 'd');



function today() {
    const event_day = dateFormat(now, "mm/dd");
    return event_day;
// Saturday, June 9th, 2007, 5:46:21 PM
}

module.exports = today;