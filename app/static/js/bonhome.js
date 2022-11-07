var canvas = document.createElement('canvas');
    canvas.id = 'bonhomme';

// modeling the canvas element
function bonhomeManager(size, weight, velocity, color) {
    width = size * 10;
    height = size * 10;
    canvas.style.width = width + "px";
    canvas.style.height = height +"px";
    canvas.style.transitionProperty = 'margin, bottom';
    canvas.style.transitionDuration = velocity + 's';
    canvas.style.transitionTimingFunction = 'ease-out';
    canvas.style.position = 'absolute';
    canvas.style.zIndex = '1000';
    // adjusting canvas
    screen_width = screen.width;
    screen_height = screen.height;
    canvas_offset_width = (width * 100) / screen_width;
    var margeLeft = Math.ceil(100 - canvas_offset_width);

    // handling context
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 20 * weight;


    // drawing him
    ctx.beginPath();
    // head
    var head = {
            'x' : canvas.width / 2,
             'y' :  canvas.height * 0.15,
             'radius' : canvas.height * 0.1 // 80526 2657342 15000
           };
    ctx.arc(head['x'], head['y'], head['radius'], 0, Math.PI * 2);
    ctx.fill();
    // body
    var neck = {
            'x' : head['x'],
             'y' :  head['y'] + head['radius']
           },
        bottom = {
            'x' : neck['x'],
            'y' : 2 * neck['y'] * ( 1 + 0.2 )
        }

    ctx.moveTo(neck['x'], neck['y']);// starting cords of the neck : from the center of the head plus its radius
    ctx.lineTo(bottom['x'], bottom['y'] );


    // left leg
    var ll = {
        'x_top' : bottom['x'],
        'y_top' : bottom['y'] - 1,
        'x_knees' : bottom['x'] - bottom['x'] * 0.2,
        'y_knees' : bottom['y'] + bottom['y'] * 0.2,
        'x_bottom' : bottom['x'] - bottom['x'] * 0.1,
        'y_bottom' : bottom['y'] + bottom['y'] * 0.6
    }
    ctx.moveTo(ll['x_top'], ll['y_top']);
    ctx.quadraticCurveTo(ll['x_knees'], ll['y_knees'], ll['x_bottom'], ll['y_bottom']);

    // right leg
    var rl = {
        'x_top' : bottom['x'],
        'y_top' : bottom['y'] - 1,
        'x_knees' : bottom['x'] + bottom['x'] * 0.2,
        'y_knees' : bottom['y'] + bottom['y'] * 0.2,
        'x_bottom' : bottom['x'] + bottom['x'] * 0.1,
        'y_bottom' : bottom['y'] + bottom['y'] * 0.6
    }
    ctx.moveTo(rl['x_top'], rl['y_top']);
    ctx.quadraticCurveTo(rl['x_knees'], rl['y_knees'], rl['x_bottom'], rl['y_bottom']);

    // left arm
    var la = {
        'x_top': neck['x'],
        'y_top': neck['y'],
        'x_cou': neck['x'] - neck['x'] * 0.2,
        'y_cou': neck['y'] + neck['y'] * 0.5,
        'x_bottom' : neck['x']- neck['x'] * 0.1,
        'y_bottom' : neck['y'] * 2 ,
    }
    ctx.moveTo(la['x_top'], la['y_top']);
    ctx.quadraticCurveTo(la['x_cou'], la['y_cou'], la['x_bottom'], la['y_bottom']);

    // right arm
    var ra = {
        'x_top': neck['x'],
        'y_top': neck['y'],
        'x_cou': neck['x'] + neck['x'] * 0.2,
        'y_cou': neck['y'] + neck['y'] * 0.5,
        'x_bottom' : neck['x'] + neck['x'] * 0.1,
        'y_bottom' : neck['y'] * 2 ,
    }
    ctx.moveTo(ra['x_top'], ra['y_top']);
    ctx.quadraticCurveTo(ra['x_cou'], ra['y_cou'], ra['x_bottom'], ra['y_bottom']);


    // displaying
    ctx.strokeStyle = color;
    ctx.lineCap = 'round'
    ctx.fill();
    ctx.stroke()  // displaying stroke

    // movements
    //  * canvas

    var canvas_direction = 'to_right', // default position
        canvas_last_direction = '';
    function canvas_move(direction, parametres){ // main function to move
        if(direction == 'to_right'){
            canvas.style.marginLeft = margeLeft + '%';
        }
        if(direction == 'to_left'){
            canvas.style.marginLeft = '0%';
        }
        if(direction == 'to_bottom'){
            canvas.style.bottom = - parametres + 'px';
        }
        if(direction == 'to_up'){
            canvas.style.bottom = - parametres + '%';
        }

        canvas_last_direction = direction;
    };

    // * bonhome

    // horizontal movement by mouseover
    var p = document.createElement('p');
        p.id = "p";
    canvas.onmouseover = function(event){
        var mouse_x = event.clientX,
            mouse_y = event.clientY;
        // handling the canvas direction
        if(canvas_direction == canvas_last_direction){
            if(canvas_last_direction != 'to_right' && canvas.style.marginLeft == '0%'){
                canvas_direction = 'to_right';

            }
            else if(canvas_last_direction != 'to_left' && canvas.style.marginLeft == margeLeft +'%'){
                canvas_direction = 'to_left';
            }
            canvas_move(canvas_direction, null);
        }
        else{
            canvas_move(canvas_direction, null);
        }


    }

    // vertical movement by scrolling page
    document.onscroll = function(){
        var total_height = document.body.offsetHeight;
        var current_top = (window.scrollY * 100) / total_height;
        var current_bottom = ((window.scrollY + window.innerHeight)* 100) / total_height;

        var screen_offset_top = window.scrollY,
            screen_offset_bottom = screen_offset_top + window.innerHeight;
        var canvas_offset_top = canvas.offsetTop,
            canvas_offset_bottom = canvas_offset_top + canvas.offsetHeight;
        var canvas_offset_height = (canvas_offset_bottom * 100) / screen_offset_bottom;
        var margeTop = Math.ceil(100 - canvas_offset_height * 0.3); // go to bottom of 20 % of this height


        if(screen_offset_top > canvas_offset_bottom) {
            canvas_move('to_bottom', screen_offset_top);

        }else if(canvas_offset_top > screen_offset_bottom) {
            canvas_move('to_up', current_bottom - margeTop);
        }
            p.innerHTML = 'screen: '+ screen_offset_top + ' '+ screen_offset_bottom;
            p.innerHTML += '<br>canvas: '+ canvas.offsetTop+ ' '+ canvas_offset_bottom;
    }


    // appending canvas, paragraph
    document.body.appendChild(canvas);
    document.body.appendChild(p);
}

bonhomeManager(20, 0.3, 1, 'green');
// bonhomeManager(size, weight, velocity, color)
