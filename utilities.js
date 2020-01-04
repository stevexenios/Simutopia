//World
var NUMBER_OF_CELLS = 20;
var SIM_DURATION = 10000;
var UPDATE_PERIOD = 5;
var INITIAL_POPULATION = 100;

//Cell
var CELL_DIMENSION = 1010 / NUMBER_OF_CELLS;
var MAX_BONUS = 5;
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

// Reproduction Control Values
var REPRODUCTION_DIFFICULTY = 3;
var REPRODUCTION_FACTOR = 5;
var REPRODUCTION_BASE_COST = 5;

//Bubble Chart
var BUBBLE_CHART_WIDTH = 400;

function randomInt(n) {
	return Math.floor(Math.random() * n);
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