const newLocal = this.label = 0;
// JavaScript source code
function World(game, ctx) {
	this.ctx = ctx;
	this.game = game;
	this.x = 0;
	this.y = 0;
	this.cells = [];
	this.agents = [];
	this.worldPopulation = INITIAL_POPULATION;
	this.dimension = NUMBER_OF_CELLS;
	this.minGen = 0;
	this.maxGen = 0;
	this.averageGen = 0;
	this.minAge = 0;
	this.maxAge = 0;
	this.averageAge = 0;
	this.tick = 0;
	this.day = 0;
	this.initiate();
	this.difficulty = WORLD_DIFFICULTY;

	// Histogram
	this.gene_0_data = [];
	this.gene_0_Histogram = new Histogram(game, 810, 10, "Gene_0_Histogram");
	this.game.addEntity(this.gene_0_Histogram);

	// Histogram
	this.gene_1_data = [];
	this.gene_1_Histogram = new Histogram(game, 810, 210, "Gene_1_Histogram");
	this.game.addEntity(this.gene_1_Histogram);

	// Histogram
	this.gene_2_data = [];
	this.gene_2_Histogram = new Histogram(game, 810, 410, "Gene_2_Histogram");
	this.game.addEntity(this.gene_2_Histogram);

	// Histogram
	this.gene_3_data = [];
	this.gene_3_Histogram = new Histogram(game, 810, 610, "Gene_3_Histogram");
	this.game.addEntity(this.gene_3_Histogram);

	// Histogram
	this.gene_4_data = [];
	this.gene_4_Histogram = new Histogram(game, 810, 810, "Gene_4_Histogram");
	this.game.addEntity(this.gene_4_Histogram);

	// Graph
	this.agentsNumber = [];
	this.agentsGraph = new Graph(this.game, 1210, 10, this, "Population");
	this.game.addEntity(this.agentsGraph);
}

World.prototype = new Entity();
World.prototype.constructor = World;

World.prototype.initiate = function () {
	this.day++;
	for (var i = 0; i < NUMBER_OF_CELLS; i++) {
		this.cells.push([]);
		for (var j = 0; j < NUMBER_OF_CELLS; j++) {
			this.cells[i].push(new Cell(this.game, i, j));
		}
	}
	for (var z = 0; z < this.worldPopulation; z++) {
		var agent = new Agent(this.game, this.cells[randomInt(this.dimension)][randomInt(this.dimension)], this);
		this.agents.push(agent);
	}
};

// Method to delete agents from world and cells

// Method to add length of cells to world population

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
			// MAP Structure to keep track of the agents, by ID

			this.agents.splice(k, 1);
		}
	}
	this.worldPopulation = this.agents.length;

	for (var g = 0; g < this.cells.length; g++) {
		for (var h = 0; h < this.cells[g].length; h++) {
			this.cells[g][h].update();
		}
	}
	// UPDATE_PERIOD
	if (this.day % UPDATE_PERIOD === 0) {
		this.updateData();
		this.updateGeneration();
	}
};

World.prototype.updateData = function () {
	var gene_0_data = [];
	var gene_1_data = [];
	var gene_2_data = [];
	var gene_3_data = [];
	var gene_4_data = [];

	for (var i = 0; i < 20; i++) {
		gene_0_data.push(0);
		gene_1_data.push(0);
		gene_2_data.push(0);
		gene_3_data.push(0);
		gene_4_data.push(0);
	}

	for (var k = 0; k < this.agents.length; k++) {
		var g0 = this.agents[k].genome.genotype[0].value < 20 ? this.agents[k].genome.genotype[0].value : 19;
		gene_0_data[g0]++;

		var g1 = this.agents[k].genome.genotype[1].value < 20 ? this.agents[k].genome.genotype[1].value : 19;
		gene_1_data[g1]++;

		var g2 = this.agents[k].genome.genotype[2].value < 20 ? this.agents[k].genome.genotype[2].value : 19;
		gene_2_data[g2]++;

		var g3 = this.agents[k].genome.genotype[3].value < 20 ? this.agents[k].genome.genotype[3].value : 19;
		gene_3_data[g3]++;

		var g4 = this.agents[k].genome.genotype[4].value < 20 ? this.agents[k].genome.genotype[4].value : 19;
		gene_4_data[g4]++;
	}

	this.gene_0_data.push(gene_0_data);
	this.gene_0_Histogram.data = this.gene_0_data;

	this.gene_1_data.push(gene_1_data);
	this.gene_1_Histogram.data = this.gene_1_data;

	this.gene_2_data.push(gene_2_data);
	this.gene_2_Histogram.data = this.gene_2_data;

	this.gene_3_data.push(gene_3_data);
	this.gene_3_Histogram.data = this.gene_3_data;

	this.gene_4_data.push(gene_4_data);
	this.gene_4_Histogram.data = this.gene_4_data;

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
	this.ctx.fillText("Day: " + this.day, 1300, 620);
	this.ctx.fillText("Population: " + this.worldPopulation, 1300, 640);
	this.ctx.fillText("Min Gen: " + this.minGen, 1300, 660);
	this.ctx.fillText("Average Gen: " + this.averageGen, 1300, 680);
	this.ctx.fillText("Max Gen: " + this.maxGen, 1300, 700);
	this.ctx.fillText("Min Age: " + this.minAge, 1300, 720);
	this.ctx.fillText("Average Age: " + this.averageAge, 1300, 740);
	this.ctx.fillText("Max Age: " + this.maxAge, 1300, 760);
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

		this.minGen = this.agents.length === 0 ? 0 : this.agents.reduce(function (min, cur) {
			return cur.generation < min.generation ? cur : min;
		}).generation;
		this.maxGen = this.agents.length === 0 ? 0 : this.agents.reduce(function (max, cur) {
			return cur.generation > max.generation ? cur : max;
		}).generation;
		this.minAge = this.agents.length === 0 ? 0 : this.agents.reduce(function (min, cur) {
			return cur.age < min.age ? cur : min;
		}).age;
		this.maxAge = this.agents.length === 0 ? 0 : this.agents.reduce(function (max, cur) {
			return cur.age > max.age ? cur : max;
		}).age;
	}
};

World.prototype.addAgent = function (agent) {
	this.agents.push(agent);
};