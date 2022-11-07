// moves velocity
var velocity = 5;
// main bones
var content = document.getElementById('content'),
    head = document.getElementById('head'),

    lh_top = document.getElementById('left-top-hand'), // left hand
    lf_top = document.getElementById('left-top-foot'), // left foot
    lh_bottom = document.getElementById('left-bottom-hand'),
    lf_bottom = document.getElementById('left-bottom-foot'),

    rh_top = document.getElementById('right-top-hand'),
    rf_top = document.getElementById('right-top-foot'),
    rh_bottom = document.getElementById('right-bottom-hand'),
    rf_bottom = document.getElementById('right-bottom-foot');

// calculate the percentage of given value
function percentage_y(y){
    content_height = content.offsetHeight;
    return ((y * 100) / content_height);
}
function percentage_x(x){
    content_width = content.offsetWidth;
    return ((x * 100) / content_width);
}


// getting position of top bones
var lh_y_top = lh_top.offsetTop, // coord top
    lh_x_top = lh_top.offsetLeft,
    rh_y_top = rh_top.offsetTop,
    rh_x_top = rh_top.offsetLeft,

    lh_y_bottom = lh_y_top + lh_top.offsetHeight, // coord bottom
    lh_x_bottom = lh_x_top + lh_top.offsetWidth,
    rh_y_bottom = rh_y_top + rh_top.offsetHeight,
    rh_x_bottom = rh_x_top + rh_top.offsetWidth;

// adjusting bottom bones
lh_bottom.style.marginTop = lh_top.offsetHeight + '%';
lf_bottom.style.marginTop = lf_top.offsetHeight - 5 + '%'; // -5%
rh_bottom.style.marginTop = rh_top.offsetHeight + '%';
rf_bottom.style.marginTop = rf_top.offsetHeight  - 5 + '%'; // -5%



content.onclick = function(){
    var angle = 45;

    var ml = Math.cos(90 - angle) * (lh_top.offsetHeight / 2);
    lh_top.style.transitionDuration = velocity +'s';
    lh_top.style.marginLeft = Math.abs(ml) + '%';
    lh_top.style.transform = 'rotate('+angle+'deg)';

    lh_bottom.style.marginLeft = Math.abs(ml) - 15 + '%';
    alert(lh_top.style.marginLeft);

}

