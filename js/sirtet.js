
var NEWSHAPE_INTERVAL = 10;
var GAMELOOP_TIMER = 100;


var Sirtet = {

	gameBoard: null,
	firstRun: 1,
	dropped: 0,
	dropping: 0,
	gameloop: 0,
	
	line_count: 0,
	score: 0,

	currentShape: null,
	nextShape: null,
	currPos: null,
	previewBox: null,

	Shapes: [
			{b1:{x:0,y:0,key:1}, b2:{x:-1,y:0,key:0}, b3:{x:-1,y:1,key:0}, b4:{x:0,y:1,key:0}}, // square
			{b1:{x:-1,y:0,key:0}, b2:{x:0,y:0,key:1}, b3:{x:1,y:0,key:0}, b4:{x:2,y:0,key:0}},  // I shape
			{b1:{x:0,y:0,key:1}, b2:{x:-1,y:0,key:0}, b3:{x:0,y:-1,key:0}, b4:{x:0,y:1,key:0}},  // T shape
			{b1:{x:0,y:0,key:1}, b2:{x:0,y:-1,key:0}, b3:{x:-1,y:0,key:0}, b4:{x:-2,y:0,key:0}},  // J shape
			{b1:{x:0,y:1,key:0}, b2:{x:0,y:0,key:1}, b3:{x:-1,y:0,key:0}, b4:{x:-2,y:0,key:0}},  // L shape
			{b1:{x:0,y:1,key:0}, b2:{x:0,y:0,key:1}, b3:{x:-1,y:0,key:0}, b4:{x:1,y:0,key:0}},   // N shape
			{b1:{x:0,y:0,key:1}, b2:{x:0,y:-1,key:0}, b3:{x:-1,y:-1,key:0}, b4:{x:1,y:0,key:0}}   // Z shape
	],



	init: function() {

		var that = this;

		currPos = new Block(3, 2, 0);

		previewBox = document.getElementById('nextshape-panel').getContext('2d');
		previewBox.width = BLOCK_SIZE*4;
		previewBox.height = BLOCK_SIZE*4;

		var gamearea = document.getElementById('gamearea');
		gamearea.addEventListener('keydown', function(e) {that.keyPressed(e); });

		this.nextShape = this.getNewShape().moveRight().moveRight().moveDown();
		this.nextShape.draw(previewBox, 0);

		this.gameBoard = new Board().init();

		this.gameBoard.debugBoard();
		this.gameBoard.drawLayout();

		var self = this;
		setInterval(function() {self.onTimer() }, GAMELOOP_TIMER);
	},


	getNewShape: function() {
		// get random number between 0 and 7 to use as index to the Shapes array
		var shapetype = Math.floor(Math.random()*7);
		return new Shape(this.Shapes[shapetype], shapetype, Math.floor(Math.random()*5)+1);
	},


	onTimer: function() {

		var gb = this.gameBoard;

		if ((this.gameloop % NEWSHAPE_INTERVAL) == 0) {

			if (this.firstRun || this.dropped) {
				this.line_count += gb.countCompleteLines();
				document.getElementById("lines-completed").innerHTML = this.line_count;

				this.currentShape = this.nextShape;
				this.nextShape.draw(previewBox, 1);

				this.nextShape = this.getNewShape().moveRight().moveRight().moveDown();
				gb.addShape(this.currentShape);
				this.firstRun = 0;
				this.dropped = 0;
				
				this.nextShape.draw(previewBox, 0);
			}
			else {
				this.moveShape(DOWN);
				//drawShape(currentShape);
			}
		}


		if (this.dropping) {
			this.moveShape(DOWN);
		}


		this.gameloop++;

		gb.debugBoard();
	},


	keyPressed: function(event) {

		event.preventDefault();

		if (event.target == document.getElementById('gamearea')) {
			switch (event.keyCode) {
				case 79 : this.moveShape(ROTATE_LEFT);   // 'o'
				break;

				case 80 : this.moveShape(ROTATE_RIGHT);   // 'p'
				break;

				case 40 : this.dropping = 1;
				break;

				case 37 : this.moveShape(LEFT);
				break;

				case 39 : this.moveShape(RIGHT);
				break;

				case 32 : this.dropping = 1; //dropShape(currentShape);
				break;

				default: break;
			}
		}
	},


    moveShape: function(dir) {

		var shp = this.currentShape;
		var gb = this.gameBoard;

        // remove current shape from board
        gb.removeShape(shp);

        // move points of current shape
        if (dir == ROTATE_LEFT) {
            if (gb.canRotate(shp)) {
                if (shp.rotation == ROTATE_0) shp.rotation = ROTATE_270;
                else shp.rotation--;

                this.rotateShape(shp, dir);
            }
        }
        else if (dir == ROTATE_RIGHT) {

            if (gb.canRotate(shp)) {
                if (shp.rotation == ROTATE_270) shp.rotation = ROTATE_0;
                else shp.rotation++;

                this.rotateShape(shp, dir);
            }
        }
        else {
            if (shp.getMaxY().y >= MAXROWS-1 && dir == DOWN) {
                this.dropped = 1; this.dropping = 0;
            }
            //else if (lineBlocked(shp.getMaxY()) && dir == DOWN) {
            else if (gb.lineBlocked(shp) && dir == DOWN) {
                this.dropped = 1; this.dropping = 0;
            }
            else if (dir == LEFT && !gb.onLeftBorder(shp)) {
                shp.moveLeft();
            }
            else if (dir == RIGHT && !gb.onRightBorder(shp)) {
                shp.moveRight();
            }
            else if (dir == DOWN && !gb.onBottom(shp)) {
                shp.moveDown();
            }
        }

        gb.drawShape(shp);
    },


	dropShape: function() {

		var shp = this.currentShape;
		var keyblock = shp.getOrigin();

		while (keyblock.y < MAXROWS-1) {
			//console.log(keyblock.x);
			moveShape(shp, DOWN);
			keyblock = shp.getOrigin();
		}

		dropped = 1;
	},


	rotateShape: function(dir) {

		var shp = this.currentShape;

		var keyBlock = shp.getOrigin();
		var tempShape = this.Shapes[shp.shapetype];

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

};



window.addEventListener('load', function(e) { onready() });

function onready() {

	var game = Object.create(Sirtet);
	game.init();
}



