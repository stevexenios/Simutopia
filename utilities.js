
/**
 * WORLD
 * 
 * World difficulty, difficulty level from scale starting at 0. 
 * Used during Agent Attempt tasks.
 * 
 * Changed this so that the it is the maximum difficulty for the
 * entire world. Cell difficulty is distributed randomly upto this
 * difficulty or can be the constant value of World Difficulty.
 */
var MAX_WORLD_DIFFICULTY = 8;
var NUMBER_OF_CELLS = 20;
var SIM_DURATION = 5000;
var UPDATE_PERIOD = 5;
var INITIAL_POPULATION = 100;

//Cell
var CELLPOP_PENALTY_FACTOR = 5;
var CELL_DIMENSION = 1010 / NUMBER_OF_CELLS;
var MAX_BONUS = 10;
var DIFFICULTY_DISTRIBUTION_RANDOM = true; // Cells with different difficulty upto Max World Difficulty
var DIFFICULTY_DISTRIBUTION_CONSTANT = false; // Cells with Constant = Max World difficulty

//Agent
var DEATH_CHANCE = 0.01;
var AGENT_DIMENSION = CELL_DIMENSION/4;
var AGENT_COLOR = "red";
var BASE_REPRODUCTION_COST = 10;
var ENERGY_FACTOR = 3; // New addition

//Gene
var GENE_COUNT = 5;
var GENE_VALUE_DISTRIBUTION_RANDOM = true; // Random Normal/Bio. Gene Value Distribution
var GENE_VALUE_DISTRIBUTION_CONSTANT = false; // Constant Normal/Bio. Gene Value Distribution
var MAX_GENE_VALUE = 5; 

//Genome
var BIOLOGICAL_GENOME_LABEL = 0;
var B_GENOME_MUTATION_RATE = 0.05;
var B_REPRODUCTION_FACTOR = 1;

var INDIVIDUAL_LEARNING_DAY = 0; // Start Day of Individual Learning Day
var INDIVIDUAL_LEARNING = false; // Starts false, changed by world, depending on Indi..Day>=actual day
var INDIVIDUAL_LEARNING_LABEL = 1;
var I_GENOME_MUTATION_RATE = 0.05;
var I_REPRODUCTION_FACTOR = 6;
var IL_RATE = 1.00;

// Social Learning
var S_GENOME_MUTATION_RATE = 0.05;
var SOCIAL_LEARNING_ENVIRONMENT_CELL = true; // SL Environment Cell
var SOCIAL_LEARNING_ENVIRONMENT_WORLD = false; // SL Environment World
var SOCIAL_LEARNING_OPTIMUM_AGENT = false; // SL Opt Agent
var SOCIAL_LEARNING_RAND_AGENT = true; // SL Rand Agent
var SOCIAL_LEARNING_DAY = 500; // Sets social learning to start at, or after this day
var SOCIAL_LEARNING = false; // Starts false, changed by world, depending on Soci..Day>=actual day
var SOCIAL_LEARNING_LABEL = 2;
var S_REPRODUCTION_FACTOR = 6;
var SL_RATE = 1.00;

// Bonus Distribution
var BONUS_DISTRIBUTION_RANDOM = true;
var	BONUS_DISTRIBUTION_INCREASE_LEFT = false;
var	BONUS_DISTRIBUTION_INCREASE_RIGHT = false;
var	BONUS_DISTRIBUTION_INCREASE_CENTER = false;
var	BONUS_DISTRIBUTION_DECREASE_CENTER = false;
var	BONUS_DISTRIBUTION_PLATEAU = false;

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
	ENERGY_FACTOR = parseInt(document.getElementById("energyFactor").value);

	// Implentation of learning day
	INDIVIDUAL_LEARNING_DAY = parseInt(document.getElementById("individualDay").value);
	SOCIAL_LEARNING_DAY = parseInt(document.getElementById("socialDay").value);
	
	UPDATE_PERIOD = parseInt(document.getElementById("updatePeriod").value);
	INITIAL_POPULATION = parseInt(document.getElementById("initPop").value);
	MAX_BONUS = parseInt(document.getElementById("maxBonuses").value);
	MAX_GENE_VALUE = parseInt(document.getElementById("maxGeneValue").value);
	MAX_WORLD_DIFFICULTY = parseInt(document.getElementById("difficulty").value);
	DEATH_CHANCE = parseFloat(document.getElementById("mortality").value);
	REPRODUCTION_FACTOR = parseInt(document.getElementById("factor").value);
	REPRODUCTION_BASE_COST = parseInt(document.getElementById("cost").value);
	AGENT_COLOR = document.getElementById("agentColor").value;

	// Setting the Mutation Rate for the Genomes
	var temp1 = parseFloat(document.getElementById("bMutationRate").value);
	var temp2 = parseFloat(document.getElementById("iMutationRate").value);
	var temp3 = parseFloat(document.getElementById("sMutationRate").value);
	if(temp1<=1.00 && temp1>=0.00){B_GENOME_MUTATION_RATE = temp1;}
	if(temp2<=1.00 && temp2>=0.00){I_GENOME_MUTATION_RATE = temp2;}
	if(temp3<=1.00 && temp3>=0.00){S_GENOME_MUTATION_RATE = temp3;}

	// Setting the Learning Rate for Associated Learning
	var tempIL = parseFloat(document.getElementById("IL_Rate").value);
	var tempSL = parseFloat(document.getElementById("SL_Rate").value);
	if(tempIL<=1.00 && tempIL>=0.00){IL_RATE = tempIL;}
	if(tempSL<=1.00 && tempSL>=0.00){SL_RATE = tempSL;}

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

	// Setting up Difficulty Distribution
	DIFFICULTY_DISTRIBUTION_RANDOM = document.otherCheckboxes.bonusDistribution[0].checked;
	DIFFICULTY_DISTRIBUTION_CONSTANT = document.otherCheckboxes.bonusDistribution[1].checked;

	// Setting up Gene Value Distribution
	GENE_VALUE_DISTRIBUTION_RANDOM = document.otherCheckboxes.geneValueDistribution[0].checked;
	GENE_VALUE_DISTRIBUTION_CONSTANT = document.otherCheckboxes.geneValueDistribution[1].checked;
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