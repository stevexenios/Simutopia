function BubbleChart(game, x, y, world) {
    this.label = "Bubble Chart";
    this.game = game;
    this.world = world;
    this.x = x;
    this.y = y;
    this.ctx = game.ctx;
    this.xSize = BUBBLE_CHART_WIDTH; // 400
	this.ySize = BUBBLE_CHART_WIDTH;
    this.cells = null; // Cells in population
};

BubbleChart.prototype.draw = function (ctx) {
    var center = BUBBLE_CHART_WIDTH/(NUMBER_OF_CELLS*2);
    this.drawGrid();
	
    this.ctx.fillStyle = "#000000";
	this.ctx.textAlign = "center";
	this.ctx.fillText(this.label, this.x + this.xSize / 2, this.y + this.ySize + 10);

	this.ctx.strokeStyle = "#000000";
	this.ctx.lineWidth = 1;
	this.ctx.strokeRect(this.x, this.y, this.xSize, this.ySize);
};

BubbleChart.prototype.drawBubbles = function (cellPopulation, sumBonuses, x, y) {
    var scaleR = cellPopulation / (this.world.worldPopulation / (NUMBER_OF_CELLS^2));
    var scaleColor = Math.floor(255 * sumBonuses / MAX_BONUS) > 255 ? 255: Math.floor(255 * sumBonuses / MAX_BONUS); 
    this.ctx.fillStyle = rgb(0, scaleColor, 0);
    this.ctx.fill();
}

BubbleChart.prototype.drawGrid = function (){
    var padding = BUBBLE_CHART_WIDTH / NUMBER_OF_CELLS;
    // Drawing the Y
    for(var x = 0; x <= this.xSize; x += padding){
        this.ctx.moveTo(this.x + x, padding + 150);
        this.ctx.lineTo(this.x + x, this.xSize + padding + 150);
    }
    // Drawing the X
    // for(var y = 0; y <= this.ySize; y += padding){
    //     this.ctx.moveTo(padding, this.y + 0.5 + y + padding);
    //     this.ctx.lineTo(this.y + padding, this.ySize + 0.5 + x + padding);
    // }
    this.ctx.strokeStyle = "black";
    this.ctx.stroke();
}
