function Histogram(game, x, y, label) {
	this.xSize = 240;
	this.ySize = 120;
	this.x = x;
	this.y = y;
	this.label = label;
	this.data = [];
	this.ctx = game.ctx;
	this.maxVal = 0;
};

Histogram.prototype.update = function (){}

Histogram.prototype.draw = function (ctx) {
	var length = this.data.length > (this.xSize / 3) ?
		Math.floor(this.xSize / 3) : this.data.length;
	var start = this.data.length > (this.xSize / 3) ?
		this.data.length - (this.xSize / 3) : 0;
	for (var i = 0; i < length; i++) {
		var maxVal = this.data[i + start].reduce(function (acc, x) {
			return acc + x;
		}, 0);
		for (var j = 0; j < this.data[i + start].length; j++) {
			var val = Math.ceil(this.data[i + start][j] / maxVal);
			this.fill(val, i, 19 - j);
		}
	}
	
	this.ctx.fillStyle = "#000000";
	this.ctx.textAlign = "center";
	this.ctx.fillText(this.label, this.x + this.xSize / 2, this.y + this.ySize + 10);

	this.ctx.strokeStyle = "#000000";
	this.ctx.lineWidth = 1;
	this.ctx.strokeRect(this.x, this.y, this.xSize, this.ySize);
};

Histogram.prototype.fill = function (color, x, y) {
	color /=20;
	//var c = 255 - Math.floor(color * 256);
    //this.ctx.fillStyle = rgb(c, c, c);

    var c = color * 99 + 1;
    c = 511 - Math.floor(Math.log(c) / Math.log(100) * 512);
    if (c > 255) {
        c = c - 256;
        this.ctx.fillStyle = rgb(c, c, 255);
    }
    else {
        //c = 255 - c;
        this.ctx.fillStyle = rgb(0, 0, c);
    }
	var width = Math.floor(this.xSize / 80);
	var height = Math.floor(this.ySize / 20);
	this.ctx.fillRect(this.x + (x * width),
		this.y + (y * height),
		width,
		height);
}