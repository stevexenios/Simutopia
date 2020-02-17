var gameEngine = new GameEngine();

var ASSET_MANAGER = new AssetManager();

function startGame(){
	gameEngine.entities = [];
	var world = new World(gameEngine, gameEngine.ctx);
	gameEngine.addEntity(world);
}

function reload(){
	console.log("\n\n"+"First Print"+"\n\n");
	printParameters();
	setParameters();
	console.log("\n\n"+"Second Print"+"\n\n");
	// printParameters();
	startGame();
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
