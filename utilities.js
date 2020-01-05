//World
var NUMBER_OF_CELLS = 20;
var SIM_DURATION = 10000;
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
var B_GENOME_MUTATION_RATE = 0.05;

var INDIVIDUAL_LEARNING = true;
var INDIVIDUAL_LEARNING_LABEL = 1;
var I_GENOME_MUTATION_RATE = 0.05;

// This could be just a single "cell" or the entire "world"
var SOCIAL_LEARNING_ENVIRONMENT = "cell"
var SOCIAL_LEARNING = true;
var SOCIAL_LEARNING_LABEL = 2;
var S_GENOME_MUTATION_RATE = 0.05;

/**
 * World difficulty, difficulty level from scale starting at 0. 
 * Used during Agent Attempt tasks. 
 */
var WORLD_DIFFICULTY = 7;

/**
 * Used in Agents to multiply genome cost, and thus increase energy required for reproduction.
 * Called in Set reproduction. 
 */
var REPRODUCTION_FACTOR = 2;

/**
 * Used in Agents to add to sum of the genome cost, and thus increase energy required for reproduction.
 * Also Called in Set reproduction. 
 */
var REPRODUCTION_BASE_COST = 2;

/**
 * Marks the age the agent is capable of reproducing. 
 * UNUSED...
 */
var REPRODUCTION_START_AGE = 12;

/**
 * Marks the age the agent is no longer capable of reproducing.
 * UNUSED...
 */
var REPRODUCTION_END_AGE = 50; 

/**
 * Controls the penalty for cell population in multiples of the given value .e.g. -1*CELL_POP/CELLPOP_PENALTY_FACTOR. 
 * Used in cell calc..penalty function.
 */
var CELLPOP_PENALTY_FACTOR = 25;

//Bubble Chart
var BUBBLE_CHART_WIDTH = 400;

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