
var startGame = function(){
	var gameEngine = new GameEngine();

	var ASSET_MANAGER = new AssetManager();
	ASSET_MANAGER.queueDownload();
	
	ASSET_MANAGER.downloadAll(function () {
		console.log("Starting...");
		var canvas = document.getElementById('gameWorld');
		var ctx = canvas.getContext('2d');
		gameEngine.init(ctx);
	
		download_img = function (el) {
			var image = canvas.toDataURL("image/jpg");
			el.href = image;
		};
	});	
}

// var restart = document.getElementById("restart");

// restart.addEventListener("click", function (e) {
// 	startGame();
// }, false);

startGame();