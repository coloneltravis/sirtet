var board = [];


function Block(x, y, clr) {
	this.x = x;
	this.y = y;
	this.clr = y;
}


function Shape(shp, clr) {
	console.log('Shape: ' + shp.b1.y);
	this.b1 = new Block(shp.b1.x, shp.b1.y, clr);
	this.b2 = new Block(shp.b2.x, shp.b2.y, clr);
	this.b3 = new Block(shp.b3.x, shp.b3.y, clr);
	this.b4 = new Block(shp.b4.x, shp.b4.y, clr);
	//this.colour = clr;
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



var newshape_interval = 5;

var gameloop = 0;

//var shapes = [shape1, shape2, shape3, shape4, shape5, shape6, shape7];
var currentShape;

var currPos = new Block(2, 3, '#000');

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
	//currShape = shapes[shapetype];
	
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
		shp[blk].x += currPos.x;
		shp[blk].y += currPos.y;
	}
	
	drawShape(shp);
}



function drawShape(shp) {

	for (var blk in shp) {
		console.log(blk + ':' + shp[blk].x + ',' + shp[blk].y);
		board[shp[blk].x][shp[blk].y] = 1;
	}
}


function moveShape(shp, dir) {

	// remove current shape from board
	for (var blk in shp) {
		board[shp[blk].x][shp[blk].y] = 0;
	}

	// move points of current shape
	for (var blk in shp) {
		if (dir == 1) shp[blk].x += 1;
	}
}



function onTimer() {

	if ((gameloop % newshape_interval) == 0) {
		
		if (firstRun || dropped) {
			currPos.x = 2;
			currentShape = getNewShape();
			console.log(currentShape);
			addShape(currentShape);
			firstRun = 0;
		}
		else {
			moveShape(currentShape, 1);
			drawShape(currentShape);
		}
	}
	
	
	gameloop++;

	debug();

	updatePanel1();

}


function keyPressed(key) {
	switch (key) {
		//case 38 : rotateLeft();
		//break;
	
		//case 38 : rotateRight();
		// break;

		case 40 : dropShape();
		break;

		case 37 : moveLeft();
		break;
		
		case 39 : moveRight();
		break;

		case 32 : dropShape();
		break;								
	}
	
}


function moveRight() {
	currPos.y++;
}


function moveLeft() {
	currPos.y--;
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
	