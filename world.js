function World(game, ctx) {
	this.label = 0;
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
	this.difficulty = MAX_WORLD_DIFFICULTY;

	// Visualizations for the data
	this.initBioGeneHist();
	this.initIndGeneHist();
	this.initSocGeneHist();
	this.initBonusHist();
	this.initGraph();
	// Bubble Chart
	// BoxPlots
}

World.prototype = new Entity();
World.prototype.constructor = World;

/**
 * Function to initialize the Graph.
 */
World.prototype.initGraph = function(){
	this.agentsNumber = [];
	this.agentsGraph = new Graph(this.game, 1030,820, this, "Population");
	this.game.addEntity(this.agentsGraph);
}

World.prototype.initBioGeneHist = function(){
	// Histogram
	this.bgene_0_data = [];
	this.bgene_0_Histogram = new Histogram(this.game, 1025, 20, "Gene_0_Histogram");
	this.game.addEntity(this.bgene_0_Histogram);

	// Histogram
	this.bgene_1_data = [];
	this.bgene_1_Histogram = new Histogram(this.game, 1025, 160, "Gene_1_Histogram");
	this.game.addEntity(this.bgene_1_Histogram);

	// Histogram
	this.bgene_2_data = [];
	this.bgene_2_Histogram = new Histogram(this.game, 1025, 300, "Gene_2_Histogram");
	this.game.addEntity(this.bgene_2_Histogram);

	// Histogram
	this.bgene_3_data = [];
	this.bgene_3_Histogram = new Histogram(this.game, 1025, 440, "Gene_3_Histogram");
	this.game.addEntity(this.bgene_3_Histogram);

	// Histogram
	this.bgene_4_data = [];
	this.bgene_4_Histogram = new Histogram(this.game, 1025, 580, "Gene_4_Histogram");
	this.game.addEntity(this.bgene_4_Histogram);
};

// Init bonus histograms
World.prototype.initBonusHist = function(){
	// Histogram
	this.bonus_0_data = [];
	this.bonus_0_Histogram = new Histogram(this.game, 1805, 20, "Bonus_0_Histogram");
	this.game.addEntity(this.bonus_0_Histogram);

	// Histogram
	this.bonus_1_data = [];
	this.bonus_1_Histogram = new Histogram(this.game, 1805, 160, "Bonus_1_Histogram");
	this.game.addEntity(this.bonus_1_Histogram);

	// Histogram
	this.bonus_2_data = [];
	this.bonus_2_Histogram = new Histogram(this.game, 1805, 300, "Bonus_2_Histogram");
	this.game.addEntity(this.bonus_2_Histogram);

	// Histogram
	this.bonus_3_data = [];
	this.bonus_3_Histogram = new Histogram(this.game, 1805, 440, "Bonus_3_Histogram");
	this.game.addEntity(this.bonus_3_Histogram);

	// Histogram
	this.bonus_4_data = [];
	this.bonus_4_Histogram = new Histogram(this.game, 1805, 580, "Bonus_4_Histogram");
	this.game.addEntity(this.bonus_4_Histogram);
};

// Individual Learning Histograms
World.prototype.initIndGeneHist = function(){
	// Histogram
	this.igene_0_data = [];
	this.igene_0_Histogram = new Histogram(this.game, 1285, 20, "Gene_0_Histogram");
	this.game.addEntity(this.igene_0_Histogram);

	// Histogram
	this.igene_1_data = [];
	this.igene_1_Histogram = new Histogram(this.game, 1285, 160, "Gene_1_Histogram");
	this.game.addEntity(this.igene_1_Histogram);

	// Histogram
	this.igene_2_data = [];
	this.igene_2_Histogram = new Histogram(this.game, 1285, 300, "Gene_2_Histogram");
	this.game.addEntity(this.igene_2_Histogram);

	// Histogram
	this.igene_3_data = [];
	this.igene_3_Histogram = new Histogram(this.game, 1285, 440, "Gene_3_Histogram");
	this.game.addEntity(this.igene_3_Histogram);

	// Histogram
	this.igene_4_data = [];
	this.igene_4_Histogram = new Histogram(this.game, 1285, 580, "Gene_4_Histogram");
	this.game.addEntity(this.igene_4_Histogram);
};

// Social Learning Histograms
World.prototype.initSocGeneHist = function(){
	// Histogram
	this.sgene_0_data = [];
	this.sgene_0_Histogram = new Histogram(this.game, 1545, 20, "Gene_0_Histogram");
	this.game.addEntity(this.sgene_0_Histogram);

	// Histogram
	this.sgene_1_data = [];
	this.sgene_1_Histogram = new Histogram(this.game, 1545, 160, "Gene_1_Histogram");
	this.game.addEntity(this.sgene_1_Histogram);

	// Histogram
	this.sgene_2_data = [];
	this.sgene_2_Histogram = new Histogram(this.game, 1545, 300, "Gene_2_Histogram");
	this.game.addEntity(this.sgene_2_Histogram);

	// Histogram
	this.sgene_3_data = [];
	this.sgene_3_Histogram = new Histogram(this.game, 1545, 440, "Gene_3_Histogram");
	this.game.addEntity(this.sgene_3_Histogram);

	// Histogram
	this.sgene_4_data = [];
	this.sgene_4_Histogram = new Histogram(this.game, 1545, 580, "Gene_4_Histogram");
	this.game.addEntity(this.sgene_4_Histogram);
};

World.prototype.initiate = function () {
	this.day++;
	for (var i = 0; i < NUMBER_OF_CELLS; i++) {
		this.cells.push([]);
		for (var j = 0; j < NUMBER_OF_CELLS; j++) {
			this.cells[i].push(new Cell(this.game, this, i, j));
		}
	}
	for (var z = 0; z < this.worldPopulation; z++) {
		var agent = new Agent(this.game, this.cells[randomInt(this.dimension)][randomInt(this.dimension)], this);
		this.agents.push(agent);
	}
};

World.prototype.update = function () {
	this.day++;
	
	if(this.day >= INDIVIDUAL_LEARNING_DAY){
		INDIVIDUAL_LEARNING = true;
	}

	if(this.day >= SOCIAL_LEARNING_DAY){
		SOCIAL_LEARNING = true;
	}

	for (var k = this.agents.length-1; k >=0 ; k--) {
		this.agents[k].update();
		if (!this.agents[k].alive) { // if agent is dead, 'bury'
			this.agents.splice(k, 1);
			//console.log("world agent deleted");
		
		} else if (this.agents[k].reproduce) { // if agent is alive,..
			var clone = this.agents[k].clone();
			this.addAgent(clone);
			this.agents[k].reproduce = false;
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
	if (this.day % 1 === 0) {
		this.updateData();
		this.updateGeneration();
		//this.displayData();
	}
	
};

World.prototype.updateData = function () {
	var bbgene_0_data = [];
	var bbgene_1_data = [];
	var bbgene_2_data = [];
	var bbgene_3_data = [];
	var bbgene_4_data = [];

	var iigene_0_data = [];
	var iigene_1_data = [];
	var iigene_2_data = [];
	var iigene_3_data = [];
	var iigene_4_data = [];

	var ssgene_0_data = [];
	var ssgene_1_data = [];
	var ssgene_2_data = [];
	var ssgene_3_data = [];
	var ssgene_4_data = [];

	var bonus_0_data = [];
	var bonus_1_data = [];
	var bonus_2_data = [];
	var bonus_3_data = [];
	var bonus_4_data = [];

	for (var i = 0; i < 20; i++) {
		bbgene_0_data.push(0);
		bbgene_1_data.push(0);
		bbgene_2_data.push(0);
		bbgene_3_data.push(0);
		bbgene_4_data.push(0);

		iigene_0_data.push(0);
		iigene_1_data.push(0);
		iigene_2_data.push(0);
		iigene_3_data.push(0);
		iigene_4_data.push(0);

		ssgene_0_data.push(0);
		ssgene_1_data.push(0);
		ssgene_2_data.push(0);
		ssgene_3_data.push(0);
		ssgene_4_data.push(0);

		bonus_0_data.push(0);
		bonus_1_data.push(0);
		bonus_2_data.push(0);
		bonus_3_data.push(0);
		bonus_4_data.push(0);
	}

	for (var k = 0; k < this.agents.length; k++) {
		// Biological Genome
		var g0 = this.agents[k].bGenome.genotype[0].value < 20 ? this.agents[k].bGenome.genotype[0].value : 19;
		bbgene_0_data[g0]++;

		var g1 = this.agents[k].bGenome.genotype[1].value < 20 ? this.agents[k].bGenome.genotype[1].value : 19;
		bbgene_1_data[g1]++;

		var g2 = this.agents[k].bGenome.genotype[2].value < 20 ? this.agents[k].bGenome.genotype[2].value : 19;
		bbgene_2_data[g2]++;

		var g3 = this.agents[k].bGenome.genotype[3].value < 20 ? this.agents[k].bGenome.genotype[3].value : 19;
		bbgene_3_data[g3]++;

		var g4 = this.agents[k].bGenome.genotype[4].value < 20 ? this.agents[k].bGenome.genotype[4].value : 19;
		bbgene_4_data[g4]++;

		// Individual Learning Genome
		var gi0 = this.agents[k].iGenome.genotype[0].value < 20 ? this.agents[k].iGenome.genotype[0].value : 19;
		iigene_0_data[gi0]++;

		var gi1 = this.agents[k].iGenome.genotype[1].value < 20 ? this.agents[k].iGenome.genotype[1].value : 19;
		iigene_1_data[gi1]++;

		var gi2 = this.agents[k].iGenome.genotype[2].value < 20 ? this.agents[k].iGenome.genotype[2].value : 19;
		iigene_2_data[gi2]++;

		var gi3 = this.agents[k].iGenome.genotype[3].value < 20 ? this.agents[k].iGenome.genotype[3].value : 19;
		iigene_3_data[gi3]++;

		var gi4 = this.agents[k].iGenome.genotype[4].value < 20 ? this.agents[k].iGenome.genotype[4].value : 19;
		iigene_4_data[gi4]++;

		// Social Learning Genome
		var sg0 = this.agents[k].sGenome.genotype[0].value < 20 ? this.agents[k].sGenome.genotype[0].value : 19;
		ssgene_0_data[sg0]++;

		var sg1 = this.agents[k].sGenome.genotype[1].value < 20 ? this.agents[k].sGenome.genotype[1].value : 19;
		ssgene_1_data[sg1]++;

		var sg2 = this.agents[k].sGenome.genotype[2].value < 20 ? this.agents[k].sGenome.genotype[2].value : 19;
		ssgene_2_data[sg2]++;

		var sg3 = this.agents[k].sGenome.genotype[3].value < 20 ? this.agents[k].sGenome.genotype[3].value : 19;
		ssgene_3_data[sg3]++;

		var sg4 = this.agents[k].sGenome.genotype[4].value < 20 ? this.agents[k].sGenome.genotype[4].value : 19;
		ssgene_4_data[sg4]++;

		// For Scaling Learning Bonus
		// var scalingMaxBonus = 1
		// indMaximumLearningBonusWeight(this.agents);
		// if(scalingMaxBonus === 0){
		// 	scalingMaxBonus = 1;
		// }

		// Learning Bonus List
		var b0 = this.agents[k].learningBonus[0] < 20 ? this.agents[k].learningBonus[0]: 19;
		bonus_0_data[b0]++;
		// console.log(this.agents[k].learningBonus[0]);
		var b1 = this.agents[k].learningBonus[1] < 20  ? this.agents[k].learningBonus[1]: 19;
		bonus_1_data[b1]++;

		var b2 = this.agents[k].learningBonus[2] < 20 ? this.agents[k].learningBonus[2]: 19;
		bonus_2_data[b2]++;

		var b3 = this.agents[k].learningBonus[3] < 20 ? this.agents[k].learningBonus[3]: 19;
		bonus_3_data[b3]++;

		var b4 = this.agents[k].learningBonus[4] < 20 ? this.agents[k].learningBonus[4]: 19;
		bonus_4_data[b4]++;

	}

	// Biological
	this.bgene_0_data.push(bbgene_0_data);
	this.bgene_0_Histogram.data = this.bgene_0_data;

	this.bgene_1_data.push(bbgene_1_data);
	this.bgene_1_Histogram.data = this.bgene_1_data;

	this.bgene_2_data.push(bbgene_2_data);
	this.bgene_2_Histogram.data = this.bgene_2_data;

	this.bgene_3_data.push(bbgene_3_data);
	this.bgene_3_Histogram.data = this.bgene_3_data;

	this.bgene_4_data.push(bbgene_4_data);
	this.bgene_4_Histogram.data = this.bgene_4_data;

	// Individual
	this.igene_0_data.push(iigene_0_data);
	this.igene_0_Histogram.data = this.igene_0_data;

	this.igene_1_data.push(iigene_1_data);
	this.igene_1_Histogram.data = this.igene_1_data;

	this.igene_2_data.push(iigene_2_data);
	this.igene_2_Histogram.data = this.igene_2_data;

	this.igene_3_data.push(iigene_3_data);
	this.igene_3_Histogram.data = this.igene_3_data;

	this.igene_4_data.push(iigene_4_data);
	this.igene_4_Histogram.data = this.igene_4_data;

	// Social
	this.sgene_0_data.push(ssgene_0_data);
	this.sgene_0_Histogram.data = this.sgene_0_data;

	this.sgene_1_data.push(ssgene_1_data);
	this.sgene_1_Histogram.data = this.sgene_1_data;

	this.sgene_2_data.push(ssgene_2_data);
	this.sgene_2_Histogram.data = this.sgene_2_data;

	this.sgene_3_data.push(ssgene_3_data);
	this.sgene_3_Histogram.data = this.sgene_3_data;

	this.sgene_4_data.push(ssgene_4_data);
	this.sgene_4_Histogram.data = this.sgene_4_data;

	// Bonus
	this.bonus_0_data.push(bonus_0_data);
	this.bonus_0_Histogram.data = this.bonus_0_data;

	this.bonus_1_data.push(bonus_1_data);
	this.bonus_1_Histogram.data = this.bonus_1_data;

	this.bonus_2_data.push(bonus_2_data);
	this.bonus_2_Histogram.data = this.bonus_2_data;

	this.bonus_3_data.push(bonus_3_data);
	this.bonus_3_Histogram.data = this.bonus_3_data;

	this.bonus_4_data.push(bonus_4_data);
	this.bonus_4_Histogram.data = this.bonus_4_data;

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
	this.displayData();
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

World.prototype.displayData = function () {
	// this.ctx.strokeStyle = "#000000";
	this.ctx.fillSytle = "#000000";
	this.ctx.strokeStyle = "black"
	this.ctx.font = "bold 15px Courier";
	this.ctx.textAlign = "start";
	
	this.ctx.fillText("Normal Genes", 1050, 15);
	this.ctx.fillText("Social Learning Genes", 1590, 15);
	this.ctx.fillText("Individual Learning Genes", 1290, 15);
	this.ctx.fillText("Learning Bonus", 1860, 15);
	
	this.ctx.fillText("Day: " + this.day, 1100, 740);
	this.ctx.fillText("Population: " + this.worldPopulation, 1100, 755);
	this.ctx.fillText("Min Gen: " + this.minGen, 1100, 770);
	this.ctx.fillText("Average Gen: " + this.averageGen, 1620, 740);
	this.ctx.fillText("Max Gen: " + this.maxGen, 1650, 755);
	this.ctx.fillText("Min Age: " + this.minAge, 1390, 770);
	this.ctx.fillText("Average Age: " + this.averageAge, 1390, 740);
	this.ctx.fillText("Max Age: " + this.maxAge, 1390, 755);
};

function findMaximumLearningBonusWeight(worldAgents){
	var max = -Infinity;
	worldAgents.forEach(element => {
		if(element.learningBonusWeight > max){
			max = element.learningBonusWeight;
			// console.log(max);
		}
	});
	return max;
}