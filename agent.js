// JavaScript source code
/**
 * Agent is an entity
 * Always resides at x, y
 * @param {any} game
 * @param {any} x
 * @param {any} y
 * @param {any} world
 */
function Agent(game, cell, world) {
	this.game = game;
	this.ctx = world.ctx;
	this.cell = cell;
	this.world = world;
	this.x = this.cell.x;
	this.y = this.cell.y;
	this.color = AGENT_COLOR;
	this.width = AGENT_DIMENSION;
	this.height = AGENT_DIMENSION;
	this.label = 2;
	this.age = 0;
	this.generation = 0;
	this.energy = 0;
	this.alive = true;
	this.genome = new Genome(GENE_COUNT);
	this.reproduce = false;
	this.addAgentToCell();
}

Agent.prototype.addAgentToCell = function () {
	this.cell.agents.push(this);
};

Agent.prototype.clone = function () {
	var a = new Agent(this.game, this.relocationCell(), this.world);
	a.genome = this.genome.clone(); // Cloned and Mutated
	a.generation = this.generation + 1;
	return a;
};

Agent.prototype.update = function () {
	this.age++;
	this.attemptTasks();
	this.reproduction();
	this.checkDeathChance();
};

Agent.prototype.checkDeathChance = function () {
	this.energy -= 1;
	if (Math.random() < DEATH_CHANCE) {
		this.removeFromWorld = true;
		this.alive = false;
	}
};

Agent.prototype.mutate = function () {
	this.genome.mutate();
};

Agent.prototype.attemptTasks = function () {
	this.energy -= 1;
	for (var i = 0; i < GENE_COUNT; i++) {
		if (this.genome.genotype[i].value + this.cell.bonuses[i] > WORLD_DIFFICULTY) {
			this.energy++;
		}
	}

	if (this.cell.agents.length / 100 > 1) {
		this.energy -= Math.floor(this.energy * this.cell.agents.length / this.world.worldPopulation);
	}
};

Agent.prototype.reproduction = function () {
	this.energy -= 1;
	if (this.energy > this.genome.cost) {
		this.energy -= this.genome.cost;
		this.reproduce = true;
	}
};

Agent.prototype.draw = function (ctx) {
	var center = CELL_DIMENSION / 2 - AGENT_DIMENSION/2;
	ctx.fillStyle = this.color;
	ctx.fillRect(CELL_DIMENSION * this.x + center, CELL_DIMENSION * this.y + center, this.width, this.height);
	ctx.fill();
};

Agent.prototype.relocationCell = function () {
	fromX = this.cell.x;
	fromY = this.cell.y;
	var pX = fromX + [-1, 0, 1][randomInt(3)] - 1;
	var pY = fromY + [-1, 0, 1][randomInt(3)] - 1;
	var returnX;
	var returnY;
	if (pX > NUMBER_OF_CELLS) {
		returnX = pX - NUMBER_OF_CELLS;
	} else if (pX < 0) {
		returnX = NUMBER_OF_CELLS + pX;
	} else {
		returnX = pX;
	}

	if (pY > NUMBER_OF_CELLS) {
		returnY = pY - NUMBER_OF_CELLS;
	} else if (pY < 0) {
		returnY = NUMBER_OF_CELLS + pY;
	} else {
		returnY = pY;
	}
	return this.world.cells[returnX][returnY];
};