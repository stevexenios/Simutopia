// JavaScript source code
function Graph(game, x, y, world, label) {
	this.game = game;
	this.x = x;
	this.y = y;
	this.world = world;
	this.label = label;

	this.xSize = 360;
	this.ySize = 175;
	this.ctx = game.ctx;
	this.agentData = [];
	this.maxVal = this.agentData;
}

Graph.prototype = new Entity();
Graph.prototype.constructor = Graph;

Graph.prototype.update = function () {
	this.agentData = this.world.agentsNumber;
	this.updateMax();
}

Graph.prototype.draw = function (ctx) {
		// humans
		this.ctx.strokeStyle = "#CCCCCC";
		this.ctx.beginPath();
		var xPos = this.x;
		var yPos = this.agentData.length > this.xSize ? this.y + this.ySize - Math.floor(this.agentData[this.agentData.length - this.xSize] / this.maxVal * this.ySize)
			: this.y + this.ySize - Math.floor(this.agentData[0] / this.maxVal * this.ySize);
		this.ctx.moveTo(xPos, yPos);
		var length = this.agentData.length > this.xSize ?
			this.xSize : this.agentData.length;
		for (var i = 1; i < length; i++) {
			var index = this.agentData.length > this.xSize ?
				this.agentData.length - this.xSize - 1 + i : i;
			xPos++;
			yPos = this.y + this.ySize - Math.floor(this.agentData[index] / this.maxVal * this.ySize);
			if (yPos <= 0) {
				yPos = 0;
			}
			this.ctx.lineTo(xPos, yPos);
		}
		this.ctx.stroke();
		this.ctx.closePath();

		this.ctx.strokeStyle = "#000000";
		this.ctx.fillSytle = "#000000";
		this.ctx.fillText(this.agentData[this.agentData.length - 1], this.x + this.xSize + 5, yPos + 10);

		var firstTick = 0;
		firstTick = this.agentData.length > this.xSize ? this.agentData.length - this.xSize : 0;
		this.ctx.fillText(firstTick * params.world_second_update, this.x, this.y + this.ySize + 10);
		this.ctx.textAlign = "right";

	this.ctx.strokeStyle = "#000000";
	this.ctx.lineWidth = 1;
	this.ctx.strokeRect(this.x, this.y, this.xSize, this.ySize);
}

Graph.prototype.updateMax = function () {
	var tick = this.agentData;
	if (tick > this.xSize) {
		var agentData = this.agentData.slice(tick - this.xSize);
	} else {
		this.maxVal = this.agentData;
	}
}