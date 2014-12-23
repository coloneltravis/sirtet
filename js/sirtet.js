var board = [];

var MAXROWS = 20;
var MAXCOLS = 10;
var BLOCK_SIZE = 20;
var NEWSHAPE_INTERVAL = 10;

var currentShape, nextShape;
var currPos = new Block(3, 2, 0);
var firstRun = 1, dropped = 0, dropping = 0, gameloop = 0;

var DOWN = 1;
var LEFT = 2;
var RIGHT = 3;
var DROP = 4;
var ROTATE_LEFT = 5;
var ROTATE_RIGHT = 6;

var ROTATE_0 = 1;
var ROTATE_90 = 2;
var ROTATE_180 = 3;
var ROTATE_270 = 4;

var ctx = new Array();



function Block(x, y, key) {
	this.x = x;
	this.y = y;
	this.key = key;
}


function Shape(shp, type, clr) {
	this.b1 = new Block(shp.b1.x, shp.b1.y, shp.b1.key);
	this.b2 = new Block(shp.b2.x, shp.b2.y, shp.b2.key);
	this.b3 = new Block(shp.b3.x, shp.b3.y, shp.b3.key);
	this.b4 = new Block(shp.b4.x, shp.b4.y, shp.b4.key);
	this.colour = clr;
	this.shapetype = type;
	this.rotation = ROTATE_0;

	this.draw = function(ctx, origin, clear) {
		if (clear) {
			ctx.clearRect(origin.x+this.b1.x*BLOCK_SIZE, origin.y+this.b1.y*BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
			ctx.clearRect(origin.x+this.b2.x*BLOCK_SIZE, origin.y+this.b2.y*BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
			ctx.clearRect(origin.x+this.b3.x*BLOCK_SIZE, origin.y+this.b3.y*BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
			ctx.clearRect(origin.x+this.b4.x*BLOCK_SIZE, origin.y+this.b4.y*BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);			
		}
		else {
			ctx.fillStyle = getColour(this.colour);
			ctx.strokeStyle = '#fff';
			ctx.fillRect(origin.x+this.b1.x*BLOCK_SIZE, origin.y+this.b1.y*BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
			ctx.fillRect(origin.x+this.b2.x*BLOCK_SIZE, origin.y+this.b2.y*BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
			ctx.fillRect(origin.x+this.b3.x*BLOCK_SIZE, origin.y+this.b3.y*BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
			ctx.fillRect(origin.x+this.b4.x*BLOCK_SIZE, origin.y+this.b4.y*BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);			
		}
	}

	
	this.getOrigin = function() {
		if (this.b1.key) return this.b1;
		if (this.b2.key) return this.b2;
		if (this.b3.key) return this.b3;
		if (this.b4.key) return this.b4;
	}
}




var Shapes = [
    {b1:{x:0,y:0,key:1}, b2:{x:-1,y:0,key:0}, b3:{x:-1,y:1,key:0}, b4:{x:0,y:1,key:0}}, // square
    {b1:{x:-1,y:0,key:0}, b2:{x:0,y:0,key:1}, b3:{x:1,y:0,key:0}, b4:{x:2,y:0,key:0}},  // I shape
    {b1:{x:0,y:0,key:1}, b2:{x:-1,y:0,key:0}, b3:{x:0,y:-1,key:0}, b4:{x:0,y:1,key:0}},  // T shape
	{b1:{x:0,y:0,key:1}, b2:{x:0,y:-1,key:0}, b3:{x:-1,y:0,key:0}, b4:{x:-2,y:0,key:0}},  // J shape
	{b1:{x:0,y:1,key:0}, b2:{x:0,y:0,key:1}, b3:{x:-1,y:0,key:0}, b4:{x:-2,y:0,key:0}},  // L shape
	{b1:{x:0,y:1,key:0}, b2:{x:0,y:0,key:1}, b3:{x:-1,y:0,key:0}, b4:{x:1,y:0,key:0}},   // N shape
	{b1:{x:0,y:0,key:1}, b2:{x:0,y:-1,key:0}, b3:{x:-1,y:-1,key:0}, b4:{x:1,y:0,key:0}}   // Z shape
];




$(document).ready(function(e) {
	$(document).keydown(function(e) {keyPressed(e.keyCode); });

	ctx[0] = $('#backpanel')[0].getContext('2d');
	ctx[1] = $('#gamepanel')[0].getContext('2d');

	var layoutWidth = BLOCK_SIZE*50;
	var layoutHeight = BLOCK_SIZE*40;

	$('#backpanel')[0].width = layoutWidth;
	$('#backpanel')[0].height = layoutHeight;
	$('#gamepanel')[0].width = layoutWidth;
	$('#gamepanel')[0].height = layoutHeight;


	console.log('width: ' + $('#gamepanel')[0].width);
	console.log('height: ' + $('#gamepanel')[0].height);

	initBoard();
	debug();

	gameloop = 0;

	drawBoard(ctx[0]);

	setInterval(onTimer, 100);
});


function initBoard() {
	
	for (var  y=0; y<MAXROWS; y++) {
		board[y] = [];
		for (var x=0; x<MAXCOLS; x++)
			board[y][x] = 0;
	}
}


function getNewShape(){
	// get random number between 0 and 6 to use as index to leaks array		
	var shapetype = Math.floor(Math.random()*7);
	return new Shape(Shapes[shapetype], shapetype, Math.floor(Math.random()*5)+1);
}


function addShape(shp) {

	for (var blk in shp) {
		if (shp[blk] instanceof Block) {
  		  shp[blk].x += currPos.x;
		  shp[blk].y += currPos.y;
		}
	}
	
	drawShape(shp);
}



function drawBoard(ctx) {
	var origin = {x:BLOCK_SIZE*4, y:BLOCK_SIZE*2};

	ctx.strokeStyle = '#000';
	ctx.beginPath();
	ctx.rect(origin.x, origin.y, BLOCK_SIZE*10, BLOCK_SIZE*20);
	ctx.stroke();
}


function drawShape(shp) {
	var origin = {x:BLOCK_SIZE*4, y:BLOCK_SIZE*2};

	for (var blk in shp) {
		if (shp[blk] instanceof Block) {
  		  //console.log(blk + ':' + shp[blk].x + ',' + shp[blk].y);
  		  //console.log('colour: ' + shp.colour);
		  board[shp[blk].y][shp[blk].x] = shp.colour;
		}
	}

	shp.draw(ctx[1], origin, 0);
}


function moveShape(shp, dir) {
	var origin = {x:BLOCK_SIZE*4, y:BLOCK_SIZE*2};

	// remove current shape from board
	for (var blk in shp) {
		if (shp[blk] instanceof Block) {
			board[shp[blk].y][shp[blk].x] = 0;
		}
	}
	shp.draw(ctx[1], origin, 1);

	// move points of current shape
	if (dir == ROTATE_LEFT) {
		if (shp.rotation == ROTATE_0) shp.rotation = ROTATE_270;
		else shp.rotation--;

		rotateShape(shp, dir);
	}
	else if (dir == ROTATE_RIGHT) {
		if (shp.rotation == ROTATE_270) shp.rotation = ROTATE_0;
		else shp.rotation++;

		rotateShape(shp, dir);
	}
	else {
		for (var blk in shp) {
			if (shp[blk] instanceof Block) {
				if (dir == DOWN)
					if (shp[blk].y < MAXROWS-1) shp[blk].y += 1;
					else { dropping = 0; dropped = 1; }

				if (dir == LEFT) if (shp[blk].x > 0) shp[blk].x -= 1;
				if (dir == RIGHT) if (shp[blk].x < MAXCOLS-1) shp[blk].x += 1;
			}
		}
	}

	drawShape(shp);
}


function getColour(clr) {
	
	switch (clr) {
		case 0 : return '#000';
		case 1 : return '#f00';
		case 2 : return '#0f0';
		case 3 : return '#00f';
		case 4 : return '#f0f';
		case 5 : return '#ff0';
		case 6 : return '#f00';
		case 7 : return '#fff';
	}

	return '#fff';
}


function onTimer() {

	if ((gameloop % NEWSHAPE_INTERVAL) == 0) {
		
		if (firstRun || dropped) {
			currentShape = getNewShape();
			addShape(currentShape);
			firstRun = 0;
			dropped = 0;
		}
		else {
			moveShape(currentShape, DOWN);
			//drawShape(currentShape);
		}
	}


	if (dropping) {
		moveShape(currentShape, DOWN);
	}

	
	gameloop++;

	debug();
}


function keyPressed(key) {
	
	switch (key) {
		case 79 : moveShape(currentShape, ROTATE_LEFT);   // 'o'
		break;

		case 80 : moveShape(currentShape, ROTATE_RIGHT);   // 'p'
		break;

		case 40 : dropping = 1;
		break;

		case 37 : moveShape(currentShape, LEFT);
		break;
		
		case 39 : moveShape(currentShape, RIGHT);
		break;

		case 32 : dropping = 1; //dropShape(currentShape);
		break;								
	}
}


function dropShape(shp) {
	var keyblock = shp.getOrigin();
	
	while (keyblock.y < MAXROWS-1) {
		//console.log(keyblock.x);
		moveShape(shp, DOWN);
		keyblock = shp.getOrigin();
	}

	dropped = 1;
}


function rotateShape(shp, dir) {

	console.log('Rotating shape: ', dir);

	var keyBlock = shp.getOrigin();
	var tempShape = Shapes[shp.shapetype];

	// move points of current shape
	for (var blk in shp) {
		if (shp[blk] instanceof Block) {
			if (shp[blk].key == 0) {
				switch (shp.rotation) {
					case ROTATE_0 :
						console.log('Before rotate: ' + shp[blk]);
						shp[blk].x  = keyBlock.x + tempShape[blk].x;
						shp[blk].y = keyBlock.y + tempShape[blk].y;
						console.log('After rotate: ' + shp[blk]);
					break;

					case ROTATE_90 :
						shp[blk].x  = keyBlock.x - tempShape[blk].y;
						shp[blk].y = keyBlock.y + tempShape[blk].x;
					break;
				
					case ROTATE_270 :
						shp[blk].x  = keyBlock.x + tempShape[blk].y;
						shp[blk].y = keyBlock.y - tempShape[blk].x;
					break;

					case ROTATE_180 :
						console.log('Before rotate: ' + shp[blk]);
						shp[blk].x  = keyBlock.x - tempShape[blk].x;
						shp[blk].y = keyBlock.y - tempShape[blk].y;
						console.log('After rotate: ' + shp[blk]);
					break;
				}	
			}
		}
	}
}


function debug() {
	$('#debug').empty();

	var str = 'board:<br/>';
	for (var y=0; y<board.length; y++) {
		var line = '';
		for (var x=0; x<board[y].length; x++) 
			line += parseInt(board[y][x]) + ',';

		str += line + '<br/>';
	}

	$('#debug').append(str + '<br/>');
}
