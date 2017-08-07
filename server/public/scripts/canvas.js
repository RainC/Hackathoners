
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        drawStuff(); 
}
resizeCanvas();

function drawStuff() {
    var w = canvas.width;
    var h = canvas.height;
    context.fillRect(0, 0, w, h);
}
