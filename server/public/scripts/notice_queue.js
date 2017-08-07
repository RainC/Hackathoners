var notices = [
    { content: 'A', type: 'commit', time: '5' },
    { content: 'B', type: 'pullrequest', time: '5' },
    { content: 'C', type: 'broadcast', time: '5' }
];

function enqueue(content, type, time) {
    var obj = {cotent: content, type: type, time: time};
    if (type === 'broadcast') notices.unshift(obj);
    else notices.push(obj)
}

