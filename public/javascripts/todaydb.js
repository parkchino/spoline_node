function getTimeDB(){
    const date = new Date();
    var month = new String(date.getMonth()+1);
    month = month >= 10 ? month : '0'+month; // month 2자리 저장
    var day = new String(date.getDate());
    day = day >= 10 ? day : '0'+day;
    var todays = `${month}/${day}`;
    return (todays);
}

module.exports = {getTimeDB};