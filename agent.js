// JavaScript source code
/**
 * Agent is an entity
 * Always resides at x, y
 * @param {any} game
 * @param {any} x
 * @param {any} y
 * @param {any} world
 */
function Agent(game, x, y, world) {
	this.ctx = world.ctx;
	this.color = AGENT_COLOR;
	this.width = AGENT_DIMENSION;
	this.height = AGENT_DIMENSION;
	this.world = world;
	this.label = 2;
	this.game = game;
	this.x = x;
	this.y = y;
	this.cell = this.world.cells[x][y];
	this.age = 0;
	this.generation = 0;
	this.energy = 0;
	this.alive = true;
	this.genome = new Genome(GENE_COUNT);
	this.reproduce = false;

	//Entity.call(this.game, this.x, this.y, this.world);
}

//Agent.prototype = new Entity();
//Agent.prototype.constructor = Agent;

Agent.prototype.clone = function () {
	var cell = this.relocationCell(this.cell);
	var a = new Agent(this.game, cell.x, cell.y, this.world);
	a.cell = cell;
	a.age = 0;
	a.energy = 0;
	a.genome = this.genome.clone();
	a.generation = this.generation + 1;
	a.reproduce = false;
	return a;
};

Agent.prototype.update = function () {
	this.age++;
	this.attemptTasks();
	this.reproduction();
	if (Math.random() < DEATH_CHANCE) {
		this.removeFromWorld = true;
		this.alive = false;
	}
};

Agent.prototype.mutate = function () {
	this.genome.mutate();
};

Agent.prototype.attemptTasks = function () {
	for (var i = 0; i < params.gene_count; i++) {
		if (this.genome.genotype[i].value + this.cell.bonuses[i] > WORLD_DIFFICULTY) {
			this.energy++;
		}
	}
	this.energy -= Math.floor(this.cell.agents.length / 10);
};

Agent.prototype.reproduction = function () {
	if (this.energy > this.genome.cost) {
		this.energy -= this.genome.cost;
		this.reproduce = true;
	}
};

Agent.prototype.draw = function (ctx) {
	ctx.fillStyle = this.color;
	ctx.fillRect(this.x * AGENT_DIMENSION, this.y * AGENT_DIMENSION, this.width, this.height);
	ctx.fill();
};

Agent.prototype.relocationCell = function (cell) {
	rrx = cell.x;
	rry = cell.y;
	var rand = [-2,-1, 0, 1,2];
	var px = rand.pop(randomInt(5));
	var py = rand.pop(randomInt(5));
	var rx = rrx - px;
	var ry = rry - py;
	if (rx > this.dimension) {
		rx = this.dimension - 1;
	} else if (rx < 0) {
		rx = 0;
	}
	if (ry > this.dimension) {
		ry = this.dimension - 1;
	} else if (ry < 0) {
		ry = 0;
	}
	return this.world.cells[rx][ry];
};