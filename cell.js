// JavaScript source code
function Cell(game, x, y) {
	this.ID = null;
	this.ctx = game.ctx;
	this.label = 1;
	this.x = x;
	this.y = y;
	this.game = game;
	this.width = CELL_DIMENSION;
	this.height = CELL_DIMENSION;
	this.agents = [];
	this.bonuses = [];

	for (var b = 0; b < GENE_COUNT; b++) {
		this.bonuses.push(randomInt(MAX_BONUS));
	}

	this.tasks = [];
	this.sumbonuses = this.bonuses.reduce(function (acc, x) { return acc + x; });
	this.worldPopulation = INITIAL_POPULATION;
	this.colorParameter = Math.floor(((this.sumbonuses / GENE_COUNT) / MAX_BONUS) * 256);
	this.color = rgb(this.colorParameter, this.colorParameter, this.colorParameter);
}

Cell.prototype.update = function () {
	var c = this.agents.length + this.colorParameter > 255 ? 255 : this.agents.length + this.colorParameter;
	this.color = rgb(c, this.colorParameter, this.colorParameter);
	this.worldPopulation = this.game.world.worldPopulation;
};

Cell.prototype.draw = function (ctx) {
	ctx.fillStyle = this.color;
	ctx.fillRect(this.x * CELL_DIMENSION, this.y * CELL_DIMENSION, this.width, this.height);
	ctx.fill();
};

Cell.prototype.determineAgentCount = function (){

};

