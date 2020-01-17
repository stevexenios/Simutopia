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
	this.cellPopPenalty = 0;
}

Cell.prototype.update = function () {
	this.deleteDeadAgents();
	this.updateColor();
	this.updatePopulationPenalty();
};

/**
 * Function that increases penalty for overpopulation in cells.
 * Acts as a Soft Cap on population. 
 * Called during Agent attempt task.
 */
Cell.prototype.updatePopulationPenalty = function (){
	// [ 0, 50, 100, 150, 200, 250...] equiv to [0, -1, -2, -3, -4, -5...]
	this.cellPopPenalty = 1 * Math.floor(this.agents.length / CELLPOP_PENALTY_FACTOR);
	//console.log(this.cellPopPenalty);
};

Cell.prototype.draw = function (ctx) {
	ctx.fillStyle = this.color;
	ctx.fillRect(this.x * CELL_DIMENSION, this.y * CELL_DIMENSION, this.width, this.height);
	ctx.fill();
};

Cell.prototype.deleteDeadAgents = function () {
	for (var i = 0; i < this.agents.length; i++) {
		if (!this.agents[i].alive) {
			this.agents.splice(i, 1);
			console.log("cell agent deleted");
		}
	}
	
};

Cell.prototype.updateColor = function () {
	var c = this.agents.length + this.colorParameter > 255 ? 255 : this.agents.length + this.colorParameter;
	this.color = rgb(c, this.colorParameter, this.colorParameter);
	this.worldPopulation = this.game.world.worldPopulation;
};
