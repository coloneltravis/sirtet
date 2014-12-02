var board = [];


function Block(x, y, clr) {
	this.x = x;
	this.y = y;
	this.clr = clr;
}


function Shape(shp, clr) {
	this.b1 = new Block(shp.b1.x, shp.b1.y, clr);
	this.b2 = new Block(shp.b2.x, shp.b2.y, clr);
	this.b3 = new Block(shp.b3.x, shp.b3.y, clr);
	this.b4 = new Block(shp.b4.x, shp.b4.y, clr);
	this.colour = clr;

	draw = function () {
	}
}




var Shapes = [
    {b1:{x:0,y:0}, b2:{x:-1,y:0}, b3:{x:-1,y:1}, b4:{x:0,y:1}}, // square
    {b1:{x:-1,y:0}, b2:{x:0,y:0}, b3:{x:1,y:0}, b4:{x:2,y:0}},  // I shape
    {b1:{x:0,y:0}, b2:{x:-1,y:0}, b3:{x:0,y:-1}, b4:{x:0,y:1}},  // T shape
	{b1:{x:0,y:0}, b2:{x:0,y:-1}, b3:{x:-1,y:0}, b4:{x:-2,y:0}},  // J shape
	{b1:{x:0,y:1}, b2:{x:0,y:0}, b3:{x:-1,y:0}, b4:{x:-2,y:0}},  // L shape
	{b1:{x:0,y:1}, b2:{x:0,y:0}, b3:{x:-1,y:0}, b4:{x:1,y:0}},   // N shape
	{b1:{x:0,y:0}, b2:{x:0,y:-1}, b3:{x:-1,y:-1}, b4:{x:1,y:0}}   // Z shape
];



var NEWSHAPE_INTERVAL = 5;

var gameloop = 0;

var currentShape, nextShape;

var currPos = new Block(2, 3, 0);

var firstRun = 1, dropped = 0;

var DOWN = 1;
var LEFT = 2;
var RIGHT = 3;
var DROP = 4;

$(document).ready(function(e) {
	$(document).keydown(function(e) {keyPressed(e.keyCode); });

	var ctx = $('#maincanvas')[0].getContext('2d');

	initBoard();
	debug();

	gameloop = 0;

	setInterval(onTimer, 500);
});


function initBoard() {
	
	for (var i=0; i<20; i++) {
		board[i] = [];
		for (var j=0; j<10; j++)
			board[i][j] = 0;
	}

	//var shapetype = Math.floor((Math.random()*7) + 1);
	//currentShape = new Shape(Shapes[shapetype-1], 3);
}


function getNewShape(){
	// get random number between 1 and 5 to use as index to leaks array		
	var shapetype = Math.floor((Math.random()*7) + 1);
	return new Shape(Shapes[shapetype-1], 3);
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



function drawShape(shp) {

	for (var blk in shp) {
		if (shp[blk] instanceof Block) {
  		  console.log(blk + ':' + shp[blk].x + ',' + shp[blk].y);
		  board[shp[blk].x][shp[blk].y] = shp.colour;
		}
	}
}


function moveShape(shp, dir) {

	// remove current shape from board
	for (var blk in shp) {
		if (shp[blk] instanceof Block) {
			board[shp[blk].x][shp[blk].y] = 0;
		}
	}

	// move points of current shape
	for (var blk in shp) {
		if (shp[blk] instanceof Block) {
			if (dir == DOWN) shp[blk].x += 1;
			if (dir == LEFT) shp[blk].y -= 1;
			if (dir == RIGHT) shp[blk].y += 1;
		}
	}

	drawShape(shp);
}



function onTimer() {

	if ((gameloop % NEWSHAPE_INTERVAL) == 0) {
		
		if (firstRun || dropped) {
			currPos.x = 2;
			currentShape = getNewShape();
			addShape(currentShape);
			firstRun = 0;
		}
		else {
			moveShape(currentShape, DOWN);
			drawShape(currentShape);
		}
	}
	
	
	gameloop++;

	debug();

	updatePanel1();

}


function keyPressed(key) {
	
	switch (key) {
		//case 38 : moveShape(currentShape, ROTATE_LEFT);
		//break;
	
		//case 38 : moveShape(currentShape, ROTATE_RIGHT);
		// break;

		case 40 : dropShape(currentShape);
		break;

		case 37 : moveShape(currentShape, LEFT);
		break;
		
		case 39 : moveShape(currentShape, RIGHT);
		break;

		case 32 : dropShape(currentShape);
		break;								
	}
}


function dropShape() {
	dropped = 1;
}


function rotateLeft() {
	
}


function rotateRight() {
	
}


function updatePanel1() {

}


function updatePanel2() {

}


function debug() {
	$('#debug').empty();

	var str = 'board:<br/>';
	for (var i = 0; i < board.length; i++) {

		var line = '';
		for (var j = 0; j < board[i].length; j++) 
			line += parseInt(board[i][j]) + ',';

		str += line + '<br/>';
	}

	$('#debug').append(str + '<br/>');
}
