
var canvas;
var context;

$(function() {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    window.addEventListener('resize', resizeCanvas, false);
    resizeCanvas();
    doTask();
});

var fires = [];

function initFire() {
    var w = canvas.width;
    var h = canvas.height;

    fires = [];
    for (var i = 0; i < 100; i++) {
        fires.push({
            x: w * 7 / 12 - (w / 6) * Math.random(),
            y: h / 2,
            r: 20 * Math.random() + 10,
            vy: 4 * Math.random(),
            life: 100 * Math.random()
        });
    }
    fires_state = 0;
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function drawStuff() {
    
    var w = canvas.width;
    var h = canvas.height;

    
    context.clearRect(0, 0, w, h);
    //context.fillStyle = "black";
    //context.fillRect(0, 0, canvas.width, canvas.height);
    context.globalCompositeOperation="lighter";
    for (var i = 0; i < 100; i++) {
        if (fires[i].r < 0) continue ;
        var renk = context.createRadialGradient(fires[i].x, fires[i].y, 2, fires[i].x, fires[i].y, fires[i].r);
        renk.addColorStop(0, "white");
        renk.addColorStop(0.4, "yellow");
        renk.addColorStop(0.6, "orange");
        renk.addColorStop(1, "red");
        context.fillStyle = renk;
        
        context.beginPath();
        context.arc(fires[i].x, fires[i].y, fires[i].r, 0 * Math.PI, 2 * Math.PI);
        context.fill();
        fires[i].y -= fires[i].vy;
        fires[i].r -= 0.3;
        fires[i].life -= 1;
        /*
        if (fires[i].life < 0 || fires[i].r < 0 || fires[i].y < 10) {
            fires[i].x = w * 7 / 12 - (w / 6) * Math.random(),
            fires[i].y = h / 2,
            fires[i].r = 20 * Math.random() + 10,
            fires[i].vy = 4 * Math.random(),
            fires[i].life = 100 * Math.random()
        }*/
    }
}

var timerFire; 
function drawFire() {
    clearInterval(timerFire);
    initFire();
    timerFire = setInterval("drawStuff()", 15);
}

