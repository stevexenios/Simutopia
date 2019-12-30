const newLocal = this.label = 0;
// JavaScript source code
// Epoch Master..
// Code to defibrilate the population, if all agents die,...??
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
	this.initializeNormalGeneHistograms();
	this.initializeIndividualLearningGeneHistograms();
	this.initializeSocialLearningGeneHistograms();
	

	// Graph for Population
	this.agentsNumber = [];
	this.agentsGraph = new Graph(this.game, 1030,820, this, "Population");
	this.game.addEntity(this.agentsGraph);

	// Bubble Chart
	//this.bubbleChart = new BubbleChart(game, 1210, 200 , this);
}

World.prototype = new Entity();
World.prototype.constructor = World;

World.prototype.initializeNormalGeneHistograms = function(){
	// Histogram
	this.gene_0_data = [];
	this.gene_0_Histogram = new Histogram(this.game, 1030, 20, "Gene_0_Histogram");
	this.game.addEntity(this.gene_0_Histogram);

	// Histogram
	this.gene_1_data = [];
	this.gene_1_Histogram = new Histogram(this.game, 1030, 160, "Gene_1_Histogram");
	this.game.addEntity(this.gene_1_Histogram);

	// Histogram
	this.gene_2_data = [];
	this.gene_2_Histogram = new Histogram(this.game, 1030, 300, "Gene_2_Histogram");
	this.game.addEntity(this.gene_2_Histogram);

	// Histogram
	this.gene_3_data = [];
	this.gene_3_Histogram = new Histogram(this.game, 1030, 440, "Gene_3_Histogram");
	this.game.addEntity(this.gene_3_Histogram);

	// Histogram
	this.gene_4_data = [];
	this.gene_4_Histogram = new Histogram(this.game, 1030, 580, "Gene_4_Histogram");
	this.game.addEntity(this.gene_4_Histogram);
};

// Individual Learning Histograms
World.prototype.initializeIndividualLearningGeneHistograms = function(){
	// Histogram
	this.genei_0_data = [];
	this.genei_0_Histogram = new Histogram(this.game, 1290, 20, "Gene_0_Histogram");
	this.game.addEntity(this.genei_0_Histogram);

	// Histogram
	this.genei_1_data = [];
	this.genei_1_Histogram = new Histogram(this.game, 1290, 160, "Gene_1_Histogram");
	this.game.addEntity(this.genei_1_Histogram);

	// Histogram
	this.genei_2_data = [];
	this.genei_2_Histogram = new Histogram(this.game, 1290, 300, "Gene_2_Histogram");
	this.game.addEntity(this.genei_2_Histogram);

	// Histogram
	this.genei_3_data = [];
	this.genei_3_Histogram = new Histogram(this.game, 1290, 440, "Gene_3_Histogram");
	this.game.addEntity(this.genei_3_Histogram);

	// Histogram
	this.genei_4_data = [];
	this.genei_4_Histogram = new Histogram(this.game, 1290, 580, "Gene_4_Histogram");
	this.game.addEntity(this.genei_4_Histogram);
};

// Social Learning Histograms
World.prototype.initializeSocialLearningGeneHistograms = function(){
	// Histogram
	this.sgene_0_data = [];
	this.sgene_0_Histogram = new Histogram(this.game, 1550, 20, "Gene_0_Histogram");
	this.game.addEntity(this.sgene_0_Histogram);

	// Histogram
	this.sgene_1_data = [];
	this.sgene_1_Histogram = new Histogram(this.game, 1550, 160, "Gene_1_Histogram");
	this.game.addEntity(this.sgene_1_Histogram);

	// Histogram
	this.sgene_2_data = [];
	this.sgene_2_Histogram = new Histogram(this.game, 1550, 300, "Gene_2_Histogram");
	this.game.addEntity(this.sgene_2_Histogram);

	// Histogram
	this.sgene_3_data = [];
	this.sgene_3_Histogram = new Histogram(this.game, 1550, 440, "Gene_3_Histogram");
	this.game.addEntity(this.sgene_3_Histogram);

	// Histogram
	this.sgene_4_data = [];
	this.sgene_4_Histogram = new Histogram(this.game, 1550, 580, "Gene_4_Histogram");
	this.game.addEntity(this.sgene_4_Histogram);
};

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
	//this.bubbleChart.cells = this.cells;
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

	var genei_0_data = [];
	var genei_1_data = [];
	var genei_2_data = [];
	var genei_3_data = [];
	var genei_4_data = [];

	var sgene_0_data = [];
	var sgene_1_data = [];
	var sgene_2_data = [];
	var sgene_3_data = [];
	var sgene_4_data = [];

	for (var i = 0; i < 20; i++) {
		gene_0_data.push(0);
		gene_1_data.push(0);
		gene_2_data.push(0);
		gene_3_data.push(0);
		gene_4_data.push(0);

		genei_0_data.push(0);
		genei_1_data.push(0);
		genei_2_data.push(0);
		genei_3_data.push(0);
		genei_4_data.push(0);

		sgene_0_data.push(0);
		sgene_1_data.push(0);
		sgene_2_data.push(0);
		sgene_3_data.push(0);
		sgene_4_data.push(0);
	}

	for (var k = 0; k < this.agents.length; k++) {
		// Biological Genome
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

		// Individual Learning Genome
		var gi0 = this.agents[k].individualLearningGenome.ilgenotype[0].value < 20 ? this.agents[k].individualLearningGenome.ilgenotype[0].value : 19;
		genei_0_data[gi0]++;

		var gi1 = this.agents[k].individualLearningGenome.ilgenotype[1].value < 20 ? this.agents[k].individualLearningGenome.ilgenotype[1].value : 19;
		genei_1_data[gi1]++;

		var gi2 = this.agents[k].individualLearningGenome.ilgenotype[2].value < 20 ? this.agents[k].individualLearningGenome.ilgenotype[2].value : 19;
		genei_2_data[gi2]++;

		var gi3 = this.agents[k].individualLearningGenome.ilgenotype[3].value < 20 ? this.agents[k].individualLearningGenome.ilgenotype[3].value : 19;
		genei_3_data[gi3]++;

		var gi4 = this.agents[k].individualLearningGenome.ilgenotype[4].value < 20 ? this.agents[k].individualLearningGenome.ilgenotype[4].value : 19;
		genei_4_data[gi4]++;

		// Social Learning Genome
		var sg0 = this.agents[k].socialLearningGenome.slgenotype[0].value < 20 ? this.agents[k].socialLearningGenome.slgenotype[0].value : 19;
		sgene_0_data[sg0]++;

		var sg1 = this.agents[k].socialLearningGenome.slgenotype[1].value < 20 ? this.agents[k].socialLearningGenome.slgenotype[1].value : 19;
		sgene_1_data[sg1]++;

		var sg2 = this.agents[k].socialLearningGenome.slgenotype[2].value < 20 ? this.agents[k].socialLearningGenome.slgenotype[2].value : 19;
		sgene_2_data[sg2]++;

		var sg3 = this.agents[k].socialLearningGenome.slgenotype[3].value < 20 ? this.agents[k].socialLearningGenome.slgenotype[3].value : 19;
		sgene_3_data[sg3]++;

		var sg4 = this.agents[k].socialLearningGenome.slgenotype[4].value < 20 ? this.agents[k].socialLearningGenome.slgenotype[4].value : 19;
		sgene_4_data[sg4]++;
	}

	// Biological
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

	// Individual
	this.genei_0_data.push(genei_0_data);
	this.genei_0_Histogram.data = this.genei_0_data;

	this.genei_1_data.push(genei_1_data);
	this.genei_1_Histogram.data = this.genei_1_data;

	this.genei_2_data.push(genei_2_data);
	this.genei_2_Histogram.data = this.genei_2_data;

	this.genei_3_data.push(genei_3_data);
	this.genei_3_Histogram.data = this.genei_3_data;

	this.genei_4_data.push(genei_4_data);
	this.genei_4_Histogram.data = this.genei_4_data;

	// Social
	this.sgene_0_data.push(sgene_0_data);
	this.sgene_0_Histogram.data = this.sgene_0_data;

	this.sgene_1_data.push(sgene_1_data);
	this.sgene_1_Histogram.data = this.sgene_1_data;

	this.sgene_2_data.push(sgene_2_data);
	this.sgene_2_Histogram.data = this.sgene_2_data;

	this.sgene_3_data.push(sgene_3_data);
	this.sgene_3_Histogram.data = this.sgene_3_data;

	this.sgene_4_data.push(sgene_4_data);
	this.sgene_4_Histogram.data = this.sgene_4_data;

	// Graph on Population
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
	//this.displayData();
	//this.bubbleChart.draw(ctx);
};

World.prototype.secondUpdate = function () {
	this.tick++;
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