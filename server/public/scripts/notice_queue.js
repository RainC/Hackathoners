var notices = [
    { content: 'A', type: 'commit', time: '5' },
    { content: 'B', type: 'pullrequest', time: '5' },
    { content: 'C', type: 'broadcast', time: '5' }
];

var state = 0; // 0 none // 1 progress

function enqueue(content, type, time) {
    var obj = {content: content, type: type, time: time};
    
    if (type === 'broadcast') notices.unshift(obj);
    else notices.push(obj)

    if (notices.length === 1 && state === 0) doTask();
}

function dequeue() {
    var obj = {content: notices[0].content, type: notices[0].type, time: notices[0].time}
    notices.shift();
    return obj;
}

function doTask() {
    state = 0;
    if (notices.length == 0) return ;

    setTimeout("doTask()", 5000);
    var obj = dequeue();
    state = 1;
    drawFire();
}

doTask();