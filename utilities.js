//World
var NUMBER_OF_CELLS = 20;
var SIM_DURATION = 10000;
var UPDATE_PERIOD = 50;
var INITIAL_POPULATION = 100;
var WORLD_DIFFICULTY = 4;
//Cell
var CELL_DIMENSION = 1010 / NUMBER_OF_CELLS;
var MAX_BONUS = 10;
//Agent
var DEATH_CHANCE = 0.01;
var AGENT_DIMENSION = CELL_DIMENSION/4;
var AGENT_COLOR = "red";
//Gene
var INDIVIDUAL_LEARNING = true;
var SOCIAL_LEARNING = true;
var BIOLOGICAL_LEARNING = true;
var MUTATION_RATE = 0.05;
var GENE_COUNT = 5;
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

<<<<<<< HEAD
=======
//World
var NUMBER_OF_CELLS = 10;
var SIM_DURATION = 10000;
var UPDATE_PERIOD = 20;
var INITIAL_POPULATION = 100;
var WORLD_DIFFICULTY = 65;
//Cell
var CELL_DIMENSION = 800 / NUMBER_OF_CELLS;
var MAX_BONUS = 100;
//Agent
var DEATH_CHANCE = 0.01;
var AGENT_DIMENSION = CELL_DIMENSION/5;
var AGENT_COLOR = "red";
//Gene
var INDIVIDUAL_LEARNING = true;
var SOCIAL_LEARNING = true;
var BIOLOGICAL_LEARNING = true;
var MUTATION_RATE = 0.05;
var GENE_COUNT = 5;


>>>>>>> cf4aaa10aadfb97b74721e9afa5dcbfa6560ed07
download_img = function (el) {
	var image = canvas.toDataURL("image/jpg");
	el.href = image;
};