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
var backpanel, gamepanel;

var line_count = 0;
var score = 0;


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

	this.draw = function(ctx, clear) {

		if (clear) {
			ctx.clearRect(this.b1.x*BLOCK_SIZE, this.b1.y*BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
			ctx.clearRect(this.b2.x*BLOCK_SIZE, this.b2.y*BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
			ctx.clearRect(this.b3.x*BLOCK_SIZE, this.b3.y*BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
			ctx.clearRect(this.b4.x*BLOCK_SIZE, this.b4.y*BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
		}
		else {
			ctx.fillStyle = getColour(this.colour);
			ctx.strokeStyle = '#fff';
			ctx.fillRect(this.b1.x*BLOCK_SIZE, this.b1.y*BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
			ctx.fillRect(this.b2.x*BLOCK_SIZE, this.b2.y*BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
			ctx.fillRect(this.b3.x*BLOCK_SIZE, this.b3.y*BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
			ctx.fillRect(this.b4.x*BLOCK_SIZE, this.b4.y*BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
		}
	}

	this.getOrigin = function() {
		if (this.b1.key) return this.b1;
		if (this.b2.key) return this.b2;
		if (this.b3.key) return this.b3;
		if (this.b4.key) return this.b4;
	}

	this.getMaxX = function() {
		var blk = null;
		var max = 0;
		for (i=1; i<=4; i++) {
			if (this['b'+i].x > max) {
				max = this['b'+i].x;
				blk = this['b'+i];
			}
		}

		return blk;
	}

	this.getMaxY = function() {
		var blk = null;
		var max = 0;
		for (i=1; i<=4; i++) {
			if (this['b'+i].y > max) {
				max = this['b'+i].y;
				blk = this['b'+i];
			}
		}

		return blk;
	}

	this.getMinX = function() {
		var blk = null;
		var min = 99;
		for (i=1; i<=4; i++) {
			if (this['b'+i].x < min) {
				min = this['b'+i].x;
				blk = this['b'+i];
			}
		}

		return blk;
	}

	this.getMinY = function() {
		var blk = this.b1;
		if (this.b2.y < blk.y) blk = this.b2;
		if (this.b3.y < blk.y) blk = this.b3;
		if (this.b4.y < blk.y) blk = this.b4;
		return blk;
	}

	this.moveLeft = function() {
		this.b1.x--;
		this.b2.x--;
		this.b3.x--;
		this.b4.x--;

		return this;
	}

	this.moveRight = function() {
		this.b1.x++;
		this.b2.x++;
		this.b3.x++;
		this.b4.x++;

		return this;
	}

	this.moveDown = function() {
		this.b1.y++;
		this.b2.y++;
		this.b3.y++;
		this.b4.y++;

		return this;
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



window.addEventListener('load', function(e) { onready() });


var backpanel, gamepanel;
var previewBox;


function onready() {

	backpanel = document.getElementById('backpanel');
	gamepanel = document.getElementById('gamepanel');

	ctx[0] = backpanel.getContext('2d');
	ctx[1] = gamepanel.getContext('2d');

	previewBox = document.getElementById('nextshape-panel').getContext('2d');
	previewBox.width = BLOCK_SIZE*4;
	previewBox.height = BLOCK_SIZE*4;

	var gamearea = document.getElementById('gamearea');
	gamearea.addEventListener('keydown', function(e) {keyPressed(e); });

	var layoutWidth = BLOCK_SIZE*MAXCOLS;
	var layoutHeight = BLOCK_SIZE*MAXROWS;

	backpanel.width = layoutWidth;
	backpanel.height = layoutHeight;
	gamepanel.width = layoutWidth;
	gamepanel.height = layoutHeight;

	//console.log('width: ' + gamepanel.width);
	//console.log('height: ' + gamepanel.height);

	nextShape = getNewShape().moveRight().moveRight().moveDown();
	nextShape.draw(previewBox, 0);

	initBoard();
	debug();

	gameloop = 0;

	drawBoard(ctx[0]);

	gamepanel.focus();

	line_count = 0;
	score = 0;

	setInterval(onTimer, 100);
}


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
	ctx.strokeStyle = '#000';
	ctx.beginPath();
	ctx.rect(0, 0, BLOCK_SIZE*MAXCOLS, BLOCK_SIZE*MAXROWS);
	ctx.stroke();
}


function drawShape(shp) {

	for (var blk in shp) {
		if (shp[blk] instanceof Block) {
  		  //console.log(blk + ':' + shp[blk].x + ',' + shp[blk].y);
  		  //console.log('colour: ' + shp.colour);
		  board[shp[blk].y][shp[blk].x] = shp.colour;
		}
	}

	shp.draw(ctx[1], 0);
}


function onLeftBorder(shp) {

	if (shp.getMinX().x <= 0)
		return true;

	return false;
}


function onRightBorder(shp) {

	if (shp.getMaxX().x >= MAXCOLS-1)
		return true;

	return false;
}


function onBottom(shp) {

	if (shp.getMaxY().y >= MAXROWS-1)
		return true;

	return false;
}


function canRotate(shp) {

	if (shp.getMaxX().x < MAXCOLS-1 && shp.getMinX().x > 0)
		return true;

	return false;
}


function moveShape(shp, dir) {

	// remove current shape from board
	for (var blk in shp) {
		if (shp[blk] instanceof Block) {
			board[shp[blk].y][shp[blk].x] = 0;
		}
	}
	shp.draw(ctx[1], 1);

	// move points of current shape
	if (dir == ROTATE_LEFT) {
		if (canRotate(shp)) {
			if (shp.rotation == ROTATE_0) shp.rotation = ROTATE_270;
			else shp.rotation--;

			rotateShape(shp, dir);
		}
	}
	else if (dir == ROTATE_RIGHT) {

		if (canRotate(shp)) {
			if (shp.rotation == ROTATE_270) shp.rotation = ROTATE_0;
			else shp.rotation++;

			rotateShape(shp, dir);
		}
	}
	else {
		if (shp.getMaxY().y >= MAXROWS-1 && dir == DOWN) {
			dropped = 1; dropping = 0;
		}
		//else if (lineBlocked(shp.getMaxY()) && dir == DOWN) {
		else if (lineBlocked(shp) && dir == DOWN) {
			dropped = 1; dropping = 0;
		}
		else if (dir == LEFT && !onLeftBorder(shp)) {
			shp.moveLeft();
		}
		else if (dir == RIGHT && !onRightBorder(shp)) {
			shp.moveRight();
		}
		else if (dir == DOWN && !onBottom(shp)) {
			shp.moveDown();
		}
	}

	drawShape(shp);
}


function lineBlocked(shp) {
	for (i=1; i<=4; i++)
		if (board[shp['b'+i].y+1][shp['b'+i].x] != 0) return 1;
	return 0;
}


function countCompleteLines() {

	var rows = [];

	for (var y=MAXROWS-1; y>0; y--) {

		var completed = 1;

		for (var x=0; x<MAXCOLS; x++) {
			if (board[y][x] == 0)
				completed = 0;
		}

		if (completed) {
			line_count++;
			rows.push(y);
		}
	}

	if (rows.length > 0)
		removeCompletedRows(rows);

	return line_count;
}


function removeCompletedRows(rows) {

	//console.log(rows);

	rows.sort(function(a, b){return a - b});

	for (var r=0; r<rows.length; r++) {

		var rownum = rows[r];

		for (var y=rownum; y>0; y--) {
			for (var x=0; x<MAXCOLS-1; x++) {
				board[y][x] = board[y-1][x];
			}
		}
	}

	refreshBoard(ctx[1]);
}


function refreshBoard(ctx) {

	for (var y=0; y<MAXROWS; y++) {
		for (var x=0; x<MAXCOLS; x++) {

			if (board[y][x] != 0) {
				ctx.fillStyle = this.getColour(board[y][x]);
				ctx.strokeStyle = '#fff';
				ctx.fillRect(x*BLOCK_SIZE, y*BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
			}
			else ctx.clearRect(x*BLOCK_SIZE, y*BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
		}
	}
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
			countCompleteLines();
			document.getElementById("lines-completed").innerHTML = line_count;

			currentShape = nextShape;
			nextShape.draw(previewBox, 1);

			nextShape = getNewShape().moveRight().moveRight().moveDown();
			addShape(currentShape);
			firstRun = 0;
			dropped = 0;

			nextShape.draw(previewBox, 0);
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


function keyPressed(event) {

	event.preventDefault();

	if (event.target == document.getElementById('gamearea')) {
		switch (event.keyCode) {
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

			default: break;
		}
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

	var keyBlock = shp.getOrigin();
	var tempShape = Shapes[shp.shapetype];

	// move points of current shape
	for (var blk in shp) {
		if (shp[blk] instanceof Block) {
			if (shp[blk].key == 0) {
				switch (shp.rotation) {
					case ROTATE_0 :
						shp[blk].x  = keyBlock.x + tempShape[blk].x;
						shp[blk].y = keyBlock.y + tempShape[blk].y;
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
						shp[blk].x  = keyBlock.x - tempShape[blk].x;
						shp[blk].y = keyBlock.y - tempShape[blk].y;
					break;
				}
			}
		}
	}
}


function debug() {
	var debug = document.getElementById('debug');
	debug.innerHTML = '';

	var str = 'board:<br/>';
	for (var y=0; y<board.length; y++) {
		var line = '';
		for (var x=0; x<board[y].length; x++)
			line += parseInt(board[y][x]) + ',';

		str += line + '<br/>';
	}

	debug.innerHTML = str + '<br/>';
}
