


var gameEngine = new GameEngine();

var ASSET_MANAGER = new AssetManager();

function startGame(){
	gameEngine.entities = [];
	var world = new World(gameEngine, gameEngine.ctx);
	gameEngine.addEntity(world);
}

function reload(){
	setParameters();
	gameEngine.entities = [];
	var world = new World(gameEngine, gameEngine.ctx);
	gameEngine.addEntity(world);
}

ASSET_MANAGER.queueDownload();
ASSET_MANAGER.downloadAll(function () {
	console.log("Starting...");
	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');
	gameEngine.init(ctx);
	startGame();

	download_img = function (el) {
		var image = canvas.toDataURL("image/jpg");
		el.href = image;
	};
});	

// var restart = document.getElementById("restart");

// restart.addEventListener("click", function (e) {
// 	startGame();
// }, false);
