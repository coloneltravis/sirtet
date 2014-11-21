var board = [];


function Block(x, y, clr) {
	this.x = x;
	this.y = y;
	this.clr = y;
}


function Shape(shp, clr) {
	this.b1 = new Block(shp.b1.x, shp.b1.y, clr);
	this.b2 = new Block(shp.b2.x, shp.b2.y, clr);
	this.b3 = new Block(shp.b3.x, shp.b3.y, clr);
	this.b4 = new Block(shp.b4.x, shp.b4.y, clr);
	//this.colour = clr;
}


/*var Shapes = [
              new Shape(Shapes[0]),
              new Shape(Shapes[1]),
              new Shape(Shapes[2]),
              new Shape(Shapes[3]),
              new Shape(Shapes[4]),
              new Shape(Shapes[5]),
              new Shape(Shapes[6])
];*/



var Shapes = [
    {b1:{x:1,y:0}, b2:{x:1,y:0}, b3:{x:2,y:1}, b4:{x:0,y:0}},
    {b1:{x:0,y:1}, b2:{x:0,y:1}, b3:{x:1,y:2}, b4:{x:0,y:0}},
    {b1:{x:1,y:1}, b2:{x:1,y:2}, b3:{x:0,y:0}, b4:{x:0,y:0}},
	{b1:{x:0,y:1}, b2:{x:1,y:2}, b3:{x:0,y:1}, b4:{x:0,y:0}},
	{b1:{x:0,y:1}, b2:{x:0,y:1}, b3:{x:0,y:2}, b4:{x:0,y:1}},
	{b1:{x:0,y:1}, b2:{x:1,y:1}, b3:{x:1,y:0}, b4:{x:0,y:0}},
	{b1:{x:1,y:0}, b2:{x:1,y:1}, b3:{x:0,y:1}, b4:{x:0,y:0}}
];

/*var Shapes = [
	{ {x:1,y:0}, {x:1,y:0}, {x:2,y:1}, {x:0,y:0} },
	{ {x:0,y:1}, {x:0,y:1}, {x:1,y:2}, {x:0,y:0} },
	{ {x:1,y:1}, {x:1,y:2}, {x:0,y:0}, {x:0,y:0} },
	{ {x:0,y:1}, {x:1,y:2}, {x:0,y:2}, {x:0,y:1} },
	{ {x:0,y:1}, {x:1,y:1}, {x:1,y:0}, {x:0,y:0} },
	{ {x:1,y:0}, {x:1,y:1}, {x:0,y:1}, {x:0,y:0} }
];*/




var newshape_interval = 5;

var gameloop = 0;

//var shapes = [shape1, shape2, shape3, shape4, shape5, shape6, shape7];
var currentShape;

var currPos = {};
currPos.x = 0;
currPos.y = 4;

var firstRun = 1, dropped = 0;

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

	var shapetype = Math.floor((Math.random()*7) + 1);
	currentShape = new Shape(Shapes[shapetype-1], 3);
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
		drawShape(shp);
	}
	
	return shp;
}



function drawShape(shp) {

	for (var blk in shp) {
		//console.log(blk + ':' + shp[blk].x);
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
	drawShape(shp);

	return shp;
}



function onTimer() {

	if ((gameloop % newshape_interval) == 0) {
		
		if (firstRun || dropped) {
			currPos.x = 1;
			currentShape = getNewShape();
			currentShape = addShape(currentShape);
			firstRun = 0;
		}
		else {
			currentShape = moveShape(currentShape, 1);
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
	