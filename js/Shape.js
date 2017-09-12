

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
			ctx.fillStyle = Shape.getColour(this.colour);
			ctx.strokeStyle = '#fff';
			ctx.fillRect(this.b1.x*BLOCK_SIZE, this.b1.y*BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
			ctx.fillRect(this.b2.x*BLOCK_SIZE, this.b2.y*BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
			ctx.fillRect(this.b3.x*BLOCK_SIZE, this.b3.y*BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
			ctx.fillRect(this.b4.x*BLOCK_SIZE, this.b4.y*BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
		}
	},


	this.getOrigin = function() {
		if (this.b1.key) return this.b1;
		if (this.b2.key) return this.b2;
		if (this.b3.key) return this.b3;
		if (this.b4.key) return this.b4;
	},


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
	},

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
	},

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
	},

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
	},

	this.moveRight = function() {
		this.b1.x++;
		this.b2.x++;
		this.b3.x++;
		this.b4.x++;

		return this;
	},

	this.moveDown = function() {
		this.b1.y++;
		this.b2.y++;
		this.b3.y++;
		this.b4.y++;

		return this;
	},

	Shape.getColour = function (clr) {

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
}

