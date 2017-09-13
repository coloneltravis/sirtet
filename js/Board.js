var MAXROWS = 20;
var MAXCOLS = 10;
var BLOCK_SIZE = 20;

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


function Board() {

    this.board = [],
    this.currPos = new Block(3, 2, 0),
    this.ctx = new Array(), 
    this.backpanel,
    this.gamepanel,


    this.init = function() {

        this.initBoard();

		this.backpanel = document.getElementById('backpanel');
		this.gamepanel = document.getElementById('gamepanel');

		this.ctx[0] = backpanel.getContext('2d');
		this.ctx[1] = gamepanel.getContext('2d');

		var layoutWidth = BLOCK_SIZE*MAXCOLS;
		var layoutHeight = BLOCK_SIZE*MAXROWS;

		this.backpanel.width = layoutWidth;
		this.backpanel.height = layoutHeight;
		this.gamepanel.width = layoutWidth;
        this.gamepanel.height = layoutHeight;
        
        return this;
    },


    this.initBoard = function() {
        for (var  y=0; y<MAXROWS; y++) {
            this.board[y] = [];
            for (var x=0; x<MAXCOLS; x++)
                this.board[y][x] = 0;
        }
    }


    this.drawLayout = function() {
        this.initBoard();
        this.drawBoard(this.ctx[0]);
        this.refreshBoard(this.ctx[1]);
    },


    this.drawBoard = function(ctx) {
        ctx.strokeStyle = '#000';
        ctx.beginPath();
        ctx.rect(0, 0, BLOCK_SIZE*MAXCOLS, BLOCK_SIZE*MAXROWS);
        ctx.stroke();
    },



    this.addShape = function(shp) {

        for (var blk in shp) {
            if (shp[blk] instanceof Block) {
            shp[blk].x += this.currPos.x;
            shp[blk].y += this.currPos.y;
            }
        }

        return this.drawShape(shp);
    },


    this.drawShape = function(shp) {

        var boardFull = 0;

        for (var blk in shp) {
            if (shp[blk] instanceof Block) {
            //console.log(blk + ':' + shp[blk].x + ',' + shp[blk].y);
            //console.log('colour: ' + shp.colour);

                if (this.board[shp[blk].y][shp[blk].x] != 0)
                    boardFull = 1;
                
                this.board[shp[blk].y][shp[blk].x] = shp.colour;

            }
    	}

        shp.draw(this.ctx[1], 0);
            
        return boardFull;
    },


    this.removeShape = function(shp) {

        // remove current shape from board
        for (var blk in shp) {
            if (shp[blk] instanceof Block) {
                this.board[shp[blk].y][shp[blk].x] = 0;
            }
        }
        shp.draw(this.ctx[1], 1);
    },


    this.onLeftBorder = function(shp) {

        if (shp.getMinX().x <= 0)
            return true;

        return false;
    },


    this.onRightBorder = function(shp) {

        if (shp.getMaxX().x >= MAXCOLS-1)
            return true;

        return false;
    },


    this.onBottom = function(shp) {

        if (shp.getMaxY().y >= MAXROWS-1)
            return true;

        return false;
    },


    this.canRotate = function(shp) {

        if (shp.getMaxX().x < MAXCOLS-1 && shp.getMinX().x > 0)
            return true;

        return false;
    },


    this.moveShape = function(shp, dir) {

        // remove current shape from board
        for (var blk in shp) {
            if (shp[blk] instanceof Block) {
                this.board[shp[blk].y][shp[blk].x] = 0;
            }
        }
        shp.draw(ctx[1], 1);

        // move points of current shape
        if (dir == ROTATE_LEFT) {
            if (this.canRotate(shp)) {
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
    },


    this.dropShape = function(shp) {
        var keyblock = shp.getOrigin();

        while (keyblock.y < MAXROWS-1) {
            //console.log(keyblock.x);
            moveShape(shp, DOWN);
            keyblock = shp.getOrigin();
        }

        dropped = 1;
    },


    this.rotateShape = function(shp, dir) {

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
    },


    this.lineBlocked = function(shp) {
        for (i=1; i<=4; i++) {
            if (shp['b'+i].y < MAXROWS-1) {
                if (this.board[shp['b'+i].y+1][shp['b'+i].x] != 0) return 1;
            }
        }

        return 0;
    },


    this.countCompleteLines = function() {

        var rows = [];

        for (var y=MAXROWS-1; y>0; y--) {

            var completed = 1;

            for (var x=0; x<MAXCOLS; x++) {
                if (this.board[y][x] == 0)
                    completed = 0;
            }

            if (completed) {
                rows.push(y);
            }
        }

        if (rows.length > 0)
            this.removeCompletedRows(rows);

        return rows.length;
    },


    this.removeCompletedRows = function(rows) {

        //console.log(rows);

        rows.sort(function(a, b){return a - b});

        for (var r=0; r<rows.length; r++) {

            var rownum = rows[r];

            for (var y=rownum; y>0; y--) {
                for (var x=0; x<MAXCOLS-1; x++) {
                    this.board[y][x] = this.board[y-1][x];
                }
            }
        }

        this.refreshBoard(this.ctx[1]);
    },


    this.refreshBoard = function(ctx) {

        for (var y=0; y<MAXROWS; y++) {
            for (var x=0; x<MAXCOLS; x++) {

                if (this.board[y][x] != 0) {
                    ctx.fillStyle = Shape.getColour(this.board[y][x]);
                    ctx.strokeStyle = '#fff';
                    ctx.fillRect(x*BLOCK_SIZE, y*BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                }
                else ctx.clearRect(x*BLOCK_SIZE, y*BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
            }
        }
    },


    this.displayGameOver = function() {
        this.ctx[1].font = "30px Comic Sans MS";
        this.ctx[1].fillStyle = "#00f";
        this.ctx[1].textAlign = "center";
        this.ctx[1].fillText("Game Over", this.gamepanel.width/2, this.gamepanel.height/2); 
    },


    this.debugBoard = function() {
        var debug = document.getElementById('debug');
        debug.innerHTML = '';

        var str = 'board:<br/>';
        for (var y=0; y<this.board.length; y++) {
            var line = '';
            for (var x=0; x<this.board[y].length; x++)
                line += parseInt(this.board[y][x]) + ',';

            str += line + '<br/>';
        }

        debug.innerHTML = str + '<br/>';
    }

    return this;
};

