// JavaScript source code
function World(game, ctx) {
	this.label = 0;
	this.ctx = ctx;
	this.game = game;
	this.x = 0;
	this.y = 0;
	this.cells = [];
	this.agents = [];
	this.worldPopulation = INITIAL_POPULATION;
	this.dimension = WORLD_DIMENSION;
	this.minGen = 0;
	this.maxGen = 0;
	this.averageGen = 0;
	this.minAge = 0;
	this.maxAge = 0;
	this.averageAge = 0;
	this.tick = 0;
	this.day = 0;

	this.initiate();

	// Histogram
	this.gene_0_data = [];
	this.gene_0_Histogram = new Histogram(game, 780, 0, "Gene_0_Histogram");
	this.game.addEntity(this.gene_0_Histogram);

	// Graph
	this.agentsNumber = [];
	//this.agentsEnergies = [];
	this.agentsGraph = new Graph(this.game, 780, 200, this, "Population");
	//this.game.addEntity(this.agentsGraph);
	Entity.call(this, game, 0, 0);
}

World.prototype = new Entity();
World.prototype.constructor = World;

World.prototype.initiate = function () {
	this.day++;
	for (var i = 0; i < this.dimension; i++) {
		this.cells.push([]);
		for (var j = 0; j < this.dimension; j++) {
			this.cells[i].push(new Cell(this.game, i, j));
		}
	}
	for (var z = 0; z < this.worldPopulation; z++) {
		var x = randomInt(this.dimension);
		var y = randomInt(this.dimension);
		var agent = new Agent(this.game, x, y, this);
		this.cells[x][y].agents.push(agent);
		this.agents.push(agent);
	}
}

World.prototype.update = function () {
	this.day++;
	for (var k = 0; k < this.agents.length; k++) {
		this.agents[k].update();
		if (this.agents[k].reproduce) {
			var clone = this.agents[k].clone();
			this.addAgent(clone);
			this.agents[k].reproduce = false;
		}
		if (!this.agents[k].alive) {
			this.agents.splice(k, 1);
		}
	}
	this.worldPopulation = this.agents.length;

	for (var g = 0; g < this.cells.length; g++) {
		for (var h = 0; h < this.cells[g].length; h++) {
			this.cells[g][h].update();
		}
	}

	if (this.day % UPDATE_PERIOD === 0) {
		this.updateData();
		this.updateGeneration();
	}
};

World.prototype.updateData = function () {
	var gene_0_data = [];
	for (var i = 0; i < 4; i++) {
		gene_0_data.push(0);
	}
	for (var k = 0; k < this.agents.length; k++) {
		var g0 = this.agents[k].genome.genotype[0].value < 20 ? this.agents[k].genome.genotype[0].value : 19;
		gene_0_data[g0] ++;
	}
	this.gene_0_data.push(gene_0_data);
	this.gene_0_Histogram.data = this.gene_0_data;

	this.agentsNumber.push(this.worldPopulation);
};

World.prototype.draw = function (ctx) {
	for (var g = 0; g < this.cells.length; g++){
		for (var h = 0; h < this.cells[g].length; h++) {
			this.cells[g][h].draw(ctx);
		}
	}
	for (var k = 0; k < this.agents.length; k++) {
		this.agents[k].draw(ctx);
	}

	this.displayData();
};

World.prototype.secondUpdate = function () {
	this.tick++;
};

World.prototype.displayData = function () {
	this.ctx = this.game.ctx;
	//this.ctx.strokeStyle = "#000000";
	//this.ctx.fillSytle = "#000000";
	this.ctx.font = "15px sans-serif";
	this.ctx.fillText("Day: " + this.day, 1280, 20);
	this.ctx.fillText("Population: " + this.worldPopulation, 1280, 40);
	this.ctx.fillText("Min Gen: " + this.minGen, 1280, 60);
	this.ctx.fillText("Average Gen: " + this.averageGen, 1280, 80);
	this.ctx.fillText("Max Gen: " + this.maxGen, 1280, 100);
	this.ctx.fillText("Min Age: " + this.minAge, 1280, 120);
	this.ctx.fillText("Average Age: " + this.averageAge, 1280, 140);
	this.ctx.fillText("Max Age: " + this.maxAge, 1280, 160);
};

World.prototype.updateGeneration = function () {
	var totalGen = 0;
	var totalAges = 0;
	for (var i = 0; i < this.agents.length; i++) {
		if (this.agents[i] !== undefined) {
			totalGen += this.agents[i].generation;
			totalAges += this.agents[i].age;
		}
	}

	if (this.agents.length > 0) {
		var average = totalGen / this.agents.length;
		var averageAge = totalAges / this.agents.length;

		this.averageGen = Math.round(average);
		this.averageAge = Math.round(averageAge);

		this.minGen = this.agents.reduce(function (min, cur) {
			return cur.generation < min.generation ? cur : min;
		}).generation;
		this.maxGen = this.agents.reduce(function (max, cur) {
			return cur.generation > max.generation ? cur : max;
		}).generation;
		this.minAge = this.agents.reduce(function (min, cur) {
			return cur.age < min.age ? cur : min;
		}).age;
		this.maxAge = this.agents.reduce(function (max, cur) {
			return cur.age > max.age ? cur : max;
		}).age;
	}
};

World.prototype.addAgent = function (agent) {
	this.agents.push(agent);
};