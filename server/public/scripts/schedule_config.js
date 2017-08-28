// 대회 일정 에 공통적으로 사용할 변수들을 정의합니다

var STARTYEAR = 2017;
var STARTMONTH = 8;
var STARTDAY = 26;
var STARTDATE = new Date(STARTYEAR, STARTMONTH - 1,STARTDAY, 0);

var schedule = [

    // Day -1 
    {start: 0, end: 10, content: '캠프 입소 및 등록'},
    {start: 10, end: 12, content: 'Git, Github,Travis 등 오픈소스 프랙티스 특강'},
    {start: 12, end: 14, content: '점심 식사 및 ICE Breaking'},
    {start: 14, end: 17, content: '오픈소스 기술 교육'},
    {start: 17, end: 18, content: 'lightning talk (후원사session-1)'},
    {start: 18, end: 19, content: '저녁 식사 및 Networking'},
    {start: 19, end: 21, content: '기획 아이디어발표 (100초) 및 팀 빌딩'},
    {start: 21, end: 24, content: '팀 Report후, 개발시작'},
    
    // Day - 2
    {start: 24, end: 38, content: '팀별 개발'},
    {start: 38, end: 39, content: '1차 중간 진행상황 발표(팀별120초)'},
    {start: 39, end: 39.5, content: 'lightning talk (후원사session-2)'},
    {start: 39.5, end: 45, content: '팀별개발'},
    {start: 45, end: 46, content: '2차 중간 진행상황 발표(팀별120초)'},
    {start: 46, end: 47, content: 'FUN 이벤트 실시'},
    {start: 47, end: 48, content: '팀별 개발'},
    
    // Day - 3
    {start: 48, end: 60, content: '팀별 개발 및 결과 발표자료 제출'},
    {start: 60, end: 61.5, content: '점심 식사(?) 및 휴식'},
    {start: 61.5, end: 63.5, content: '팀별최종발표평가'},
    {start: 63.5, end: 64, content: '우수작시상,사진촬영,폐회'},
    {start: 64, end: 72, content: '집가라'}

];

var currentScheduleIndex = 0;

function checkNextSchedule() {
    var now = new Date();
    var nextTime = schedule[currentScheduleIndex].end;
    if (now - STARTDATE > nextTime * 60 * 60 * 1000) {
        currentScheduleIndex++;
        return {result: true,
             listSchedule: schedule.slice(currentScheduleIndex - 1, currentScheduleIndex + 2)};
    }
    return {result: false};
}


function printScheduleTime(now) {
    var clock;
    var nowTime;

    // <div class="box" id="Date-timer"><a>2017년 03월 19일_일요일</a></div>
    clock = document.getElementById("Date-timer");
    nowTime = now.getFullYear() + "년 " 
            + (now.getMonth()+1) + "월 "
            + now.getDate() + "일_"
            + weekDay[now.getDay()] + "요일"

    clock.innerHTML = nowTime;

    // <div class="box" id="AMPM-timer"><a>PM</a></div>
    clock = document.getElementById("AMPM-timer");
    nowTime = AMPM(now.getHours());
    clock.innerHTML = nowTime;
                
    // <div class="box" id="HourMinute-timer"><a>04시 11분</a></div>
    clock = document.getElementById("HourMinute-timer");
    nowTime = hourToString(now.getHours()) + "시 "
            + timeToString(now.getMinutes()) + "분"
    clock.innerHTML = nowTime;

    // <div class="box" id="Day-timer" ><a>day 1</a></div>
    clock = document.getElementById("Day-timer");
    var betweenDay = (now.getTime() - STARTDATE.getTime())/1000/60/60/24;  
    nowTime = "Day " + Math.ceil(betweenDay);
    clock.innerHTML = nowTime;
}

function printScheduleSequence() {
    if (checkNextSchedule().result == true) {
        var arraySchedule = checkNextSchedule().listSchedule;

        var tmpTimeStart;
        var tmpTimeEnd;
        var tmpContent;
        var maxLengthContent = 12;

        for (var i = 0; i < arraySchedule.length; i++) {
            tmpTimeStart = new Date(addHours(STARTDATE, arraySchedule[i].start));
            tmpTimeEnd = new Date(addHours(STARTDATE, arraySchedule[i].end));
            tmpContent = arraySchedule[i].content;
            if (tmpContent.length > maxLengthContent) tmpContent = tmpContent.substr(0, maxLengthContent) + "...";
            document.getElementById("ScheduleTitle-order" + i).innerHTML = '<a>' + tmpContent + '</a>';
            document.getElementById("ScheduleTime-order" + i).innerHTML = 
                '<a>'
                + dayAndNight(tmpTimeStart.getHours()) + "시 "
                + timeToString(tmpTimeStart.getMinutes()) + "분"
                + ' ~ '
                + dayAndNight(tmpTimeEnd.getHours()) + "시 "
                + timeToString(tmpTimeEnd.getMinutes()) + "분"
                + '</a>';
        }
    }
}