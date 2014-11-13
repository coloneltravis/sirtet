var board = [];


var Shapes = [
    {[1,0],[1,0], [2,1], [0,0]},
    {[0,1],  [0,1],	  [1,2],  [0,0]},
    {[1,1], [1,2], [0,0],  [0,0]},
	{[0,1],  [1,2],	  [0,1],  [0,0]},
	{[0,1],  [0,1],  [0,2],  [0,1]},
	{[0,1],  [1,1],	  [1,0],  [0,0]},
	{[1,0],  [1,1],  [0,1],  [0,0]}
];


var newshape_interval = 5;

var gameloop = 0;

var shapes = [shape1, shape2, shape3, shape4, shape5, shape6, shape7];
var currShape;

var currPos = {};
currPos.x = 0;
currPos.y = 4;

var firstRun = 1, completed = 0;

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
}


function getNewShape(){
	// get random number between 1 and 5 to use as index to leaks array		
	var shapetype = Math.floor(Math.random() * 7);
	return shapes[shapetype];
}


function addShape(shp) {
	for (var i = 0; i < shp.length; i++) { 
		for (var j = 0; j < shp[i].length; j++) {
			if (shp[i][j] != 0) {
				board[currPos.x + i][currPos.y + j] = shp[i][j];
			}
		}
	}
}


function onTimer() {

	if ((gameloop % newshape_interval) == 0) {
		
		
		// move current shape down 1 row
		currPos.x++;

		if (firstRun || completed) {
			addShape(getNewShape());
			firstRun = 0;
			completed = 1;
		}
	}
	
	
	gameloop++;

	debug();

	updatePanel1();

}


function keyPressed(key) {
	switch (key) {
		//case 38 : alert('up');
		//break;

		case 40 : alert('down');
		break;

		case 37 : alert('move left');
		break;
		
		case 39 : alert('move right');
		break;

		//case 32 : alert('drop shape');
		//break;								
	}
	
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
	