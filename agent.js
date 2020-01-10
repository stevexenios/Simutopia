// JavaScript source code

/**
 * Agent class.
 * 
 * @param game - this iteration of the game
 * @param cell - the cell the agent is located in
 * @param world - so agent can have a copy of the world
 */
class Agent{
	constructor(game, cell, world){
		this.label = "agent";	
		this.game = game;
		this.ctx = world.ctx;
		this.cell = cell;
		this.world = world;
		this.x = this.cell.x;
		this.y = this.cell.y;
		
		this.age = 0;
		this.generation = 0;
		this.energy = 0;
		this.alive = true;
		this.reproduce = false;

		this.color = AGENT_COLOR;
		this.width = AGENT_DIMENSION;
		this.height = AGENT_DIMENSION;

		this.bGenome = new Genome(GENE_COUNT, BIOLOGICAL_GENOME_LABEL, B_GENOME_MUTATION_RATE);
		this.iGenome = new Genome(GENE_COUNT, INDIVIDUAL_LEARNING_LABEL, I_GENOME_MUTATION_RATE);
		this.sGenome = new Genome(GENE_COUNT, SOCIAL_LEARNING_LABEL, S_GENOME_MUTATION_RATE);
		this.learningBonus = [];
		for(var i = 0; i < GENE_COUNT; i++){
			this.learningBonus.push(0);
		}
		this.addAgentToCell();
	}

	/**
	 * Function to add agent to it's cell after it has been created
	 */
	addAgentToCell(){
		this.cell.agents.push(this);
	}

	/**
	 * Function to clone this agent. Clones and mutates the genome.
	 */
	clone(){
		var clonedAgent = new Agent(this.game, this.relocationCell(), this.world);
		clonedAgent.bGenome = this.bGenome.clone();
		clonedAgent.iGenome = this.iGenome.clone();
		clonedAgent.sGenome = this.sGenome.clone();
		clonedAgent.generation = this.generation + 1;
		return clonedAgent;
	}

	/**
	 * Updates each Agent by calling the functions.
	 */
	update(){
		this.age++;
		this.updateLearningBonus();
		this.attemptTasks();
		this.setReproduction();
		this.updateEnergy();
		this.checkDeathChance();
		// console.log(this.bGenome.genotype);
		// console.log(this.iGenome.genotype);
		// console.log(this.sGenome.genotype);
		// // Increase death chance for the elderly
		// if(this.age > 75 && this.alive === true){
		// 	this.checkDeathChance();
		// }
	}

	/**
	 * Function to update agent energy
	 * Soft Cap on Pop
	 */
	updateEnergy(){
		this.energy -= this.cell.cellPopPenalty;
	}

	/**
	 * Function to update the learning bonus for each agent.
	 */
	updateLearningBonus() {
		var bonus = [];
		for(var index = 0; index < GENE_COUNT; index++){
			var initialSLValue = this.sGenome.genotype[index].value;
			var initialIValue = this.iGenome.genotype[index].value;
			bonus.push(this.calculateSociallyLearned(initialSLValue, initialIValue, index));
		}
	}
	
	/**
	 * Social Learning is set to occur just within the same cell.
	 * @param initialSLValue 
	 * @param index 
	 * @param randomAgent
	 */
	calculateSociallyLearned(initialSLValue, initialIValue, index){
		var possibleSociallyLearnedValue = 0;
		var attemptss = initialSLValue;
		var ii = initialIValue;
		// Individual Learning
		for(var i = 0; i< ii; i++ ){
			if(Math.random() < IL_RATE){
				this.learningBonus[index]++;
			}
		}
		for(var i = 0; i < attemptss; i++){
			var randAgent = this.cell.agents[randomInt(this.cell.agents.length)];
			if(this.learningBonus[index] < randAgent.learningBonus[index]){
				this.learningBonus[index] = randAgent.learningBonus[index];
			}
		}
	}

	/**
	 * Function for simulating Agent attemtpting a task.
	 * No energy deducted.
	 */
	attemptTasks() {
		for (var i = 0; i < GENE_COUNT; i++) {
			if (this.bGenome.genotype[i].value + this.learningBonus[i] + this.cell.bonuses[i] > WORLD_DIFFICULTY) {
				this.energy++;
			}
		}
	}

	/**
	 * Function that sets Agent reproduction to TRUE...
	 * and reduces energy in Agent after the process.
	 * ...otherwise always false.
	 */
	setReproduction() {
		var sumGenomeCost = this.genomeCost() + REPRODUCTION_BASE_COST;
		//if(this.age > 18 && this.age < 80){
			if (this.energy > (sumGenomeCost * REPRODUCTION_FACTOR)) {
				this.energy -= sumGenomeCost;
				/**
				 * This boolean is checked during each update in the world
				 * If TRUE, Agent clones itself...then World adds agent to itself. 
				 * Value is then reset to FALSE.
				 */
				this.reproduce = true;
			}
		//}
	}

	/**
	 * Function for determining death chance. 
	 * Agent death depends on:
	 * 		1. DEATH_CHANCE
	 * 		2. Energy of Agent 
	 */
	checkDeathChance() {
		if (Math.random() < DEATH_CHANCE || this.energy < 0) {
			this.alive = false;
		}
	}

	/**
	 * Function to calculate the cost of the given genome.
	 */
	genomeCost(){
		var accumulator = 0;
		for(var i = 0; i < GENE_COUNT; i++){
			accumulator += this.bGenome.genotype[i].value;
			accumulator += this.iGenome.genotype[i].value;
			accumulator += this.sGenome.genotype[i].value;
		}
		//console.log(accumulator);
		return accumulator;
	}
	/**
	 * Function called by World to draw each Agent.
	 * @param ctx
	 */
	draw(ctx) {
		var center = CELL_DIMENSION / 2 - AGENT_DIMENSION / 2;
		ctx.fillStyle = this.color;
		ctx.fillRect(CELL_DIMENSION * this.x + center, CELL_DIMENSION * this.y + center, this.width, this.height);
		ctx.fill();
	}

	/**
	 * Function that determines how far from parent,
	 * each cloned Agent relocates.
	 */
	relocationCell() {
		var fromX = this.cell.x;
		var fromY = this.cell.y;
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
		return this.world.cells[returnX][returnY];
	}
}






