var weekDay = ['월', '화', '수', '목', '금', '토', '일'];

function timeToString(time) {
    return time < 10? "0" + time.toString() : time.toString();
}

function addHours(date, h) {
    var tmpDate = new Date(date);
    return tmpDate.setHours(tmpDate.getHours() + h);
}

function AMPM(hour) {
    return hour <= 12 ? "AM" : "PM ";
}

function dayAndNight(hour) {
    return hour <= 12 ? "오전 " + timeToString(hour) : "오후 " + timeToString(hour - 12);
}

function hourToString(hour) {
    return hour <= 12 ? timeToString(hour) : timeToString(hour - 12);
}

function printMiniTime() {
    var clock = document.getElementById("mini-timer");
    var now = new Date();

    //2017년 3월 19일 일요일_오후 04시 37분
    var nowTime = now.getFullYear() + "년 " 
                + timeToString(now.getMonth()+1) + "월 "
                + timeToString(now.getDate()) + "일 "
                + weekDay[now.getDay()] + "요일_"
                + dayAndNight(now.getHours()) + "시 "
                + timeToString(now.getMinutes()) + "분"
    
    clock.innerHTML = nowTime;
    
    // print custom Time
    printCustomTime(now);

    setTimeout("printMiniTime()",1000);
}