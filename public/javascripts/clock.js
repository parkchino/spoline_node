const clockContainer = document.querySelector(".date-today");
const clockTitle = clockContainer.querySelector("h3");

function getTime(){
    const week = new Array('일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일');
    const date = new Date();
    const months = date.getMonth() +1;
    const days = date.getDate();
    //const minutes = date.getMinutes();
    //const hours = date.getHours();
    //const pmHours = date.getHours()-12;
    //const seconds = date.getSeconds();
    const today = date.getDay();
    const todayLabel = week[today];
    // const amPm = ["오전","오후"];
    clockTitle.innerText = `${months}월 ${days}일
    ${todayLabel}`;
    
}

//${hours < 12 ? `${amPm[0]}` : amPm[1]} ${hours > 12 ? `${pmHours}` : hours}시 ${minutes < 10 ?`0${minutes}` : minutes}분
function init (){
    getTime();
    setInterval(getTime , 1000);
    }
init();

