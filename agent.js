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

		this.genome = new Genome(GENE_COUNT, BIOLOGICAL_GENOME_LABEL, B_GENOME_MUTATION_RATE);
		this.individualLearningGenome = new Genome(GENE_COUNT, INDIVIDUAL_LEARNING_LABEL, I_GENOME_MUTATION_RATE);
		this.socialLearningGenome = new Genome(GENE_COUNT, SOCIAL_LEARNING_LABEL, S_GENOME_MUTATION_RATE);
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
		clonedAgent.genome = this.genome.clone();
		clonedAgent.individualLearningGenome = this.individualLearningGenome.clone();
		clonedAgent.socialLearningGenome = this.socialLearningGenome.clone();
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
<<<<<<< Updated upstream
		this.setReproduction();
		this.checkDeathChance();
		// Increase death chance for the elderly
		if(this.age > 75 && this.alive === true){
			this.checkDeathChance();
			// if(this.age > 75 && this.alive === true){
			// 	this.checkDeathChance();
			// }
=======
		if(this.world.day % UPDATE_PERIOD === 0){
			this.setReproduction();
			this.checkDeathChance();
>>>>>>> Stashed changes
		}
	}

	/**
	 * Function to update the learning bonus for each agent.
	 */
	updateLearningBonus() {
		var bonus = [];
		var randomAgent = this.cell.agents[randomInt(this.cell.agents.length)];
		for(var index = 0; index < GENE_COUNT; index++){
			var initialSLValue = this.socialLearningGenome.genotype[index].value;
			bonus.push(this.calculateSociallyLearned(initialSLValue, index, randomAgent));
		}
		for(var j = 0; j<GENE_COUNT; j++){
			this.learningBonus[j] = bonus[j] + this.individualLearningGenome.genotype[j].value;
		}
	}
	
	/**
	 * Social Learning is set to occur just within the same cell.
	 * @param initialSLValue 
	 * @param index 
	 * @param randomAgent
	 */
	calculateSociallyLearned(initialSLValue, index, randAgent){
		var possibleSociallyLearnedValue = 0;
		var attempts = initialSLValue;
		for(var i = 1; i<=attempts; i++){
			if(randAgent != null) {
				if(possibleSociallyLearnedValue < randAgent.socialLearningGenome.genotype[index].value){
					possibleSociallyLearnedValue = randAgent.socialLearningGenome.genotype[index].value;
				}
			}
		}
		return possibleSociallyLearnedValue > initialSLValue ? possibleSociallyLearnedValue : initialSLValue;
	}

	/**
	 * Function for simulating Agent attemtpting a task.
	 */
	attemptTasks() {
		for (var i = 0; i < GENE_COUNT; i++) {
<<<<<<< Updated upstream
			if (this.genome.genotype[i].value + this.learningBonus[i] + this.cell.bonuses[i] > WORLD_DIFFICULTY) {
=======
			if (this.genome.genotype[i].value + this.learningBonus[i] + this.cell.bonuses[i] > REPRODUCTION_DIFFICULTY) {
>>>>>>> Stashed changes
				this.energy++;
			} else {
				this.energy--;
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
		if (this.energy > (sumGenomeCost * REPRODUCTION_FACTOR)) {
			this.energy -= sumGenomeCost;
<<<<<<< Updated upstream
			this.energy -= this.cell.populationPenalty;
=======
			this.energy -= this.cell.populationPenalty * REPRODUCTION_FACTOR;
>>>>>>> Stashed changes
			/**
			 * This boolean is checked during each update in the world
			 * If TRUE, Agent clones itself...then World adds agent to itself. 
			 * Value is then reset to FALSE.
			 */
			this.reproduce = true;
		}
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
			accumulator += this.genome.genotype[i].value;
			accumulator += this.individualLearningGenome.genotype[i].value;
			accumulator += this.socialLearningGenome.genotype[i].value;
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






