//World
var NUMBER_OF_CELLS = 20;
var SIM_DURATION = 5000;
var UPDATE_PERIOD = 5;
var INITIAL_POPULATION = 100;

//Cell
var CELL_DIMENSION = 1010 / NUMBER_OF_CELLS;
var MAX_BONUS = 10;
//Agent
var DEATH_CHANCE = 0.01;
var AGENT_DIMENSION = CELL_DIMENSION/4;
var AGENT_COLOR = "red";
//Gene
var GENE_COUNT = 5;

//Genome
var BIOLOGICAL_LEARNING = true;
var BIOLOGICAL_GENOME_LABEL = 0;

var INDIVIDUAL_LEARNING = true;
var INDIVIDUAL_LEARNING_LABEL = 1;

// Mutation Rates for all three Genomes
var B_GENOME_MUTATION_RATE = 5;
var I_GENOME_MUTATION_RATE = 5;
var S_GENOME_MUTATION_RATE = 5;

// This could be just a single "cell" or the entire "world"
var SOCIAL_LEARNING_ENVIRONMENT_CELL = true;
var SOCIAL_LEARNING_ENVIRONMENT_WORLD = false;

// Social Learning Level
var SOCIAL_LEARNING_OPTIMUM_AGENT = false;
var SOCIAL_LEARNING_RAND_AGENT = true;

var SOCIAL_LEARNING = true;
var SOCIAL_LEARNING_LABEL = 2;

// Bonus Distribution
var BONUS_DISTRIBUTION_RANDOM = true;
var	BONUS_DISTRIBUTION_INCREASE_LEFT = false;
var	BONUS_DISTRIBUTION_INCREASE_RIGHT = false;
var	BONUS_DISTRIBUTION_INCREASE_CENTER = false;
var	BONUS_DISTRIBUTION_DECREASE_CENTER = false;
var	BONUS_DISTRIBUTION_PLATEAU = false;

/**
 * World difficulty, difficulty level from scale starting at 0. 
 * Used during Agent Attempt tasks. 
 */
var WORLD_DIFFICULTY = 8;

/**
 * Used in Agents to multiply genome cost, and thus increase energy required for reproduction.
 * Called in Set reproduction. 
 */
var REPRODUCTION_FACTOR = 6;

/**
 * Used in Agents to add to sum of the genome cost, and thus increase energy required for reproduction.
 * Also Called in Set reproduction. 
 */
var REPRODUCTION_BASE_COST = 10;

/**
 * Individual Learning Rate
*/
var IL_RATE = 100;

/**
 * Social Learning Rate
 */
var SL_RATE = 100;

/**
 * Controls the penalty for cell population in multiples of the given value .e.g. -1*CELL_POP/CELLPOP_PENALTY_FACTOR. 
 * Used in cell calc..penalty function.
 */
var CELLPOP_PENALTY_FACTOR = 5;

function randomInt(n) {
	return Math.floor(Math.random() * n);
}

/**
 * Function that creates a String from concating 3 parameter strings.
 * @param {*} s1 
 * @param {*} s2 
 * @param {*} s3 
 */
function returnString(s1, s2, s3){
	return s1+s2+s3;
}

function within(xx, minX, maxX) {
	if (xx > maxX - 1) {
		return xx % maxX;
	} else if (xx < minX) {
		return maxX + xx - 1;
	} else {
		return xx;
	}
}

function rgb(r, g, b) {
	return "rgb(" + r + "," + g + "," + b + ")";
}

download_img = function (el) {
	var image = canvas.toDataURL("image/jpg");
	el.href = image;
};

function setParameters () {
	// Text area
	NUMBER_OF_CELLS = parseInt(document.getElementById("numberOfCells").value);
	SIM_DURATION = parseInt(document.getElementById("simDuration").value);
	UPDATE_PERIOD = parseInt(document.getElementById("updatePeriod").value);
	INITIAL_POPULATION = parseInt(document.getElementById("initPop").value);
	MAX_BONUS = parseInt(document.getElementById("maxBonuses").value);
	DEATH_CHANCE = parseInt(document.getElementById("mortality").value);
	WORLD_DIFFICULTY = parseInt(document.getElementById("difficulty").value);
	REPRODUCTION_FACTOR = parseInt(document.getElementById("factor").value);
	REPRODUCTION_BASE_COST = parseInt(document.getElementById("cost").value);
	AGENT_COLOR = document.getElementById("agentColor").value;

	// Setting the Mutation Rate for the Genomes
	var temp1 = parseInt(document.getElementById("bMutationRate").value);
	var temp2 = parseInt(document.getElementById("iMutationRate").value);
	var temp3 = parseInt(document.getElementById("sMutationRate").value);
	if(temp1<=100 && temp1>=0){B_GENOME_MUTATION_RATE = temp1;}
	if(temp2<=100 && temp2>=0){I_GENOME_MUTATION_RATE = temp2;}
	if(temp3<=100 && temp3>=0){S_GENOME_MUTATION_RATE = temp3;}

	// Setting the Learning Rate for Associated Learning
	var tempIL = parseInt(document.getElementById("IL_Rate").value);
	var tempSL = parseInt(document.getElementById("SL_Rate").value);
	if(tempIL<=100 && tempIL>=0){IL_RATE = tempIL;}
	if(tempSL<=100 && tempSL>=0){SL_RATE = tempSL;}

	// Checkbox && Radio Buttons
	INDIVIDUAL_LEARNING = document.getElementById("il").checked;
	SOCIAL_LEARNING = document.getElementById("sl").checked;
	BIOLOGICAL_LEARNING = document.getElementById("pl").checked;

	// Setting up Social Learning Environment
	SOCIAL_LEARNING_ENVIRONMENT_CELL = document.otherCheckboxes.learningEnvironment[0].checked;
	SOCIAL_LEARNING_ENVIRONMENT_WORLD = document.otherCheckboxes.learningEnvironment[1].checked;

	// Setting up Social Learning Level
	SOCIAL_LEARNING_OPTIMUM_AGENT = document.otherCheckboxes.optimumAgent[0].checked;
	SOCIAL_LEARNING_RAND_AGENT = document.otherCheckboxes.optimumAgent[1].checked;

	// Setting up Bonus Distribution
	BONUS_DISTRIBUTION_RANDOM = document.otherCheckboxes.bonusDistribution[0].checked;
	BONUS_DISTRIBUTION_INCREASE_LEFT = document.otherCheckboxes.bonusDistribution[1].checked;
	BONUS_DISTRIBUTION_INCREASE_RIGHT = document.otherCheckboxes.bonusDistribution[2].checked;
	BONUS_DISTRIBUTION_INCREASE_CENTER = document.otherCheckboxes.bonusDistribution[3].checked;
	BONUS_DISTRIBUTION_DECREASE_CENTER = document.otherCheckboxes.bonusDistribution[4].checked;
	BONUS_DISTRIBUTION_PLATEAU = document.otherCheckboxes.bonusDistribution[5].checked;

	// Evaluating the checkboxes
	if(BIOLOGICAL_LEARNING){
		B_GENOME_MUTATION_RATE = parseInt(document.getElementById("bMutationRate").value);
	} else {
		B_GENOME_MUTATION_RATE = 0;
	}
	if(INDIVIDUAL_LEARNING) {
		I_GENOME_MUTATION_RATE = parseInt(document.getElementById("iMutationRate").value);
	} else {
		I_GENOME_MUTATION_RATE = 0;
	}
	if(SOCIAL_LEARNING){
		S_GENOME_MUTATION_RATE = parseInt(document.getElementById("sMutationRate").value);
	}else {
		S_GENOME_MUTATION_RATE = 0;
	}
}

function printParameters(){
	console.log("Biological Learning is: " + BIOLOGICAL_LEARNING);
	console.log("Individual Learning is: " + INDIVIDUAL_LEARNING);
	console.log("B Genome Mutation Rate is: " + B_GENOME_MUTATION_RATE);
	console.log("I Genome Mutation Rate is: " + I_GENOME_MUTATION_RATE);
	console.log("S Genome Mutation Rate is: " + S_GENOME_MUTATION_RATE);
	console.log("Social Learning Env is Cell: " + SOCIAL_LEARNING_ENVIRONMENT_CELL);
	console.log("Social Learning Env is World: " + SOCIAL_LEARNING_ENVIRONMENT_WORLD);
	console.log("Social Learning is Optimum Agent: " + SOCIAL_LEARNING_OPTIMUM_AGENT);
	console.log("Social Learning is Random Agent: " + SOCIAL_LEARNING_RAND_AGENT);
	console.log("World Difficult: " + WORLD_DIFFICULTY);
	console.log("Repro Base Factor: " + REPRODUCTION_FACTOR);
	console.log("Repro Base Cost: " + REPRODUCTION_BASE_COST);
	console.log("IL Rate is: " + IL_RATE);
	console.log("SL Rate is: " + SL_RATE);
	console.log("Cell population Penalty: " + CELLPOP_PENALTY_FACTOR);
}