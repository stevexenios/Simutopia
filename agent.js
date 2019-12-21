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
	this.individualLearningGenome = new IndividualLearningGenome(GENE_COUNT);
	this.socialLearningGenome = new SocialLearningGenome(GENE_COUNT);

	this.reproduce = false;
	this.addAgentToCell();
	this.learningBonus = [];
	for(var i = 0; i < GENE_COUNT; i++){
		this.learningBonus.push(0);
	}
}

Agent.prototype.addAgentToCell = function () {
	this.cell.agents.push(this);
};

Agent.prototype.clone = function () {
	var a = new Agent(this.game, this.relocationCell(), this.world);
	a.genome = this.genome.clone(); // Cloned and Mutated
	a.individualLearningGenome = this.individualLearningGenome.clone();
	a.socialLearningGenome = this.socialLearningGenome.clone();
	a.generation = this.generation + 1;
	return a;
};

Agent.prototype.update = function () {
	this.age++;
	this.updateLearningBonus();
	this.attemptTasks();
	if(randomInt(100) < 2){
		this.reproduction();
	}
	this.checkDeathChance();
};

Agent.prototype.updateLearningBonus = function (){
	this.energy -= 1; // Indi and Social learning cost
	var bonus = [];
	for(var i = 0; i < GENE_COUNT; i++){
		var oldslvalue = this.socialLearningGenome.slgenotype[i].value;
		var newslvalue = this.calculateSociallyLearned(oldslvalue, i);
		bonus.push(newslvalue);
	}
	// console.log(bonus[0]);
	// console.log(this.individualLearningGenome.ilgenotype[j]);
	for(var j = 0; j<GENE_COUNT; j++){
		bonus[j] += this.individualLearningGenome.ilgenotype[j].value;
	}
	this.learningBonus = bonus;
	//this.energy -= this.socialLearningGenome.cost;
	//this.energy -= this.individualLearningGenome.cost;

};

Agent.prototype.calculateSociallyLearned = function(attempts, index){
	var maxSociallyLearnedValue = 0;
	for(var i = 0; i<=attempts; i++){
		var cellPopulation = this.cell.agents.length;
		if(cellPopulation>0){//When agents in cell are there to learn from...
			var randAgent = this.cell.agents[randomInt(cellPopulation)];
			if(maxSociallyLearnedValue < randAgent.socialLearningGenome.slgenotype[index].value){
				maxSociallyLearnedValue = randAgent.socialLearningGenome.slgenotype[index].value;
			}
		} else{//..if cell pop <0, then socially learn from World Population
			if(maxSociallyLearnedValue < randAgent.socialLearningGenome.slgenotype[index].value){
				maxSociallyLearnedValue = randAgent.socialLearningGenome.slgenotype[index].value;
			}
		}
	}

	return maxSociallyLearnedValue>attempts? maxSociallyLearnedValue: attempts;
};

Agent.prototype.checkDeathChance = function () {
	this.energy -= 1;
	if (Math.random() < DEATH_CHANCE || this.energy < 0) {
		this.removeFromWorld = true;
		this.alive = false;
	}
};

Agent.prototype.mutate = function () {
	this.genome.mutate();
};

Agent.prototype.attemptTasks = function () {
	this.energy --;

	for (var i = 0; i < GENE_COUNT; i++) {
		var count = this.learningBonus[i];
		// gene + ind + cellbonus > diff
		while(count>-1){
			if (this.genome.genotype[i].value + this.cell.bonuses[i] > WORLD_DIFFICULTY) {
				this.energy++;
			} else{
				this.energy--;
			}
			count--;
		}
	}

	// if (this.cell.agents.length / 100 > 1) {
	// 	this.energy -= Math.floor(this.energy * this.cell.agents.length / this.world.worldPopulation);
	// }
};

Agent.prototype.reproduction = function () {
	this.energy -= this.cell.agents.length;
	if (this.energy > this.genome.cost * 3) {
		this.energy -= this.genome.cost * 3;
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
	var units = [-3, -2, -1, 0, 1, 2, 3];
	var firstRand = units[randomInt(7)];
	var secondRand = units[randomInt(7)];
	var pX = fromX + firstRand - 2;
	var pY = fromY + secondRand - 2;
	var returnX;
	var returnY;
	if (pX >= NUMBER_OF_CELLS) {
		returnX = pX - NUMBER_OF_CELLS;
	} else if (pX < 0) {
		returnX = NUMBER_OF_CELLS + pX;
	} else {
		returnX = pX;
	}

	if (pY >= NUMBER_OF_CELLS) {
		returnY = pY - NUMBER_OF_CELLS;
	} else if (pY < 0) {
		returnY = NUMBER_OF_CELLS + pY;
	} else {
		returnY = pY;
	}
	//console.log(returnY);
	//console.log(pY);
	return this.world.cells[returnX][returnY];
};