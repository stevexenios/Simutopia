var gameEngine = new GameEngine();

var ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload();

ASSET_MANAGER.downloadAll(function () {
	console.log("Starting...");
	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');
	gameEngine.init(ctx);
	var world = new World(gameEngine, ctx);
	gameEngine.world = world;
	gameEngine.addEntity(world);
	gameEngine.start();
});
