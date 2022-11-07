var canvas = document.createElement('canvas');
    canvas.id = 'content-bonhome';

// context
var ctx = canvas.getContext('2d');
    ctx.fillStyle = "blue";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.font = "16px Arial";

// getting position of mouse on canvas
canvas.onmousemove = function(e){
    var cRect = canvas.getBoundingClientRect();     // Gets CSS pos, and width/height
    var canvasX = Math.round(e.clientX - cRect.left);   // Subtract the 'left' of the canvas
    var canvasY = Math.round(e.clientY - cRect.top);    // from the X/Y positions to make
    ctx.clearRect(0, 0, 150, 25); // (0,0) the top left of the canvas
    ctx.fillText("X: "+canvasX+", Y: "+canvasY, 70, 20);
}

// text
ctx.font = "12px serif";
ctx.textAlign = "center";
ctx.textBaseline="middle";
ctx.fillStyle = "#FFF";
ctx.fillText("Hello World",150,50);

// rotation
rotate_ctx = function() {
    ctx.translate(1, 0); // translate so that the origin is now (ox, oy) the center of the canvas
    ctx.rotate((Math.PI / 180) * 15); // convert degrees to radians with radians = (Math.PI/180)*degrees.
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillText("Hello World", 150, 150);
};

// exporting canvas to image
export_img = function(el) {
    var imageURI = canvas.toDataURL("image/jpg"); // get image URI from canvas object
    el.href = imageURI;
};

// animation
const textToDisplay = "This is an example that uses the canvas to animate some text.";
const textStyle = "white";
const BGStyle = "black"; // background style
const textSpeed = 0.2;  // in pixels per millisecond
const textHorMargin = 8;    // have the text a little outside the canvas

ctx.font = Math.floor(canvas.height * 0.8) + "px arial"; // size the font to 80% of canvas height
var textWidth = ctx.measureText(textToDisplay).width; // get the text width
var totalTextSize = (canvas.width + textHorMargin * 2 + textWidth);
ctx.textBaseline = "middle"; // not put the text in the vertical center
ctx.textAlign = "left"; // align to the left
var textX = canvas.width + 8; // start with the text off screen to the right
var textOffset = 0; // how far the text has moved

var startTime;
// this function is call once a frame which is approx 16.66 ms (60fps)
function update(time){  // time is passed by requestAnimationFrame
    if(startTime === undefined){    // get a reference for the start time if this is the first  frame
        startTime = time;
    }
    ctx.fillStyle = BGStyle;
    ctx.fillRect(0, 0, canvas.width, canvas.height);    // clear the canvas by drawing over it
    textOffset = ((time - startTime) * textSpeed) % (totalTextSize); // move the text left
    ctx.fillStyle = textStyle;  // set the text style
    ctx.fillText(textToDisplay, textX - textOffset, canvas.height / 2); // render the text
    requestAnimationFrame(update);// all done request the next frame
}
    requestAnimationFrame(update);// to start request the first frame

// appending canvas
document.body.appendChild(canvas);
