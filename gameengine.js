// This game shell was happily copied from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (/* function */ callback, /* DOMElement */ element) {
                window.setTimeout(callback, 1000 / 60);
            };
})();

function Timer() {
    this.gameTime = 0;
    this.maxStep = 0.05;
    this.wallLastTimestamp = 0;
}

Timer.prototype.tick = function () {
    var wallCurrent = Date.now();
    var wallDelta = (wallCurrent - this.wallLastTimestamp) / 1000;
    this.wallLastTimestamp = wallCurrent;

    var gameDelta = Math.min(wallDelta, this.maxStep);
    this.gameTime += gameDelta;
    return gameDelta;
}

function GameEngine() {
    this.entities = [];
    this.showOutlines = false;
    this.ctx = null;
    this.click = null;
    this.mouse = null;
    this.wheel = null;
    this.surfaceWidth = null;
	this.surfaceHeight = null;
	this.world = null;
	this.updateCounter = 0;
	this.cellCount = 0;
	this.agentCount = 0;
	this.play = null;
	this.pause = null;
	this.restart = null;
	this.reset = null;
}

GameEngine.prototype.init = function (ctx) {
	this.ctx = ctx;
	this.world = new World(this, this.ctx);
	this.addEntity(this.world);
	this.setButtons();
    this.surfaceWidth = this.ctx.canvas.width;
	this.surfaceHeight = this.ctx.canvas.height;
	this.startInput();
	this.timer = new Timer();
	this.start();
	//this.displayData();
    //console.log('Game initialized');
}

GameEngine.prototype.setButtons = function(){
	this.restart = document.getElementById("restart");
	this.pause = document.getElementById("pause");
	this.play = document.getElementById("play");
	this.reset = document.getElementById("reload");
}

GameEngine.prototype.start = function () {
	//console.log("Starting game");
    var that = this;
    (function gameLoop() {
        that.loop();
        requestAnimFrame(gameLoop, that.ctx.canvas);
    })();
}

// ?? Restart button
GameEngine.prototype.restartGame = function () {
	//console.log('Game restarting...');
	for(var i = 0; i < this.entities.length; i++){
		this.entities.splice(i, 1);
	}
	//this.entities.forEach(element=>this.removeEntity(element));
	var canvas = document.getElementById('gameWorld');
	this.ctx.clearRect(0, 0, canvas.width, canvas.height);
	this.init(this.ctx);
	this.timer = new Timer();
}

// ?? Reset button
GameEngine.prototype.reloadGame = function () {
	//console.log("Reloading sim");
	this.setParameters();
	//this.loop();
}

GameEngine.prototype.pauseGame = function () {
	this.isPaused = true;
}

GameEngine.prototype.playGame = function () {
	this.isPaused = false;
}

GameEngine.prototype.startInput = function () {
    var that = this;

    var getXandY = function (e) {
        var x = e.clientX - that.ctx.canvas.getBoundingClientRect().left;
        var y = e.clientY - that.ctx.canvas.getBoundingClientRect().top;

        return { x: x, y: y };
    }

    this.ctx.canvas.addEventListener("mousemove", function (e) {
        //console.log(getXandY(e));
        that.mouse = getXandY(e);
    }, false);

    this.ctx.canvas.addEventListener("click", function (e) {
        //console.log(getXandY(e));
        that.click = getXandY(e);
    }, false);

    this.ctx.canvas.addEventListener("wheel", function (e) {
        //console.log(getXandY(e));
        that.wheel = e;
        //       console.log(e.wheelDelta);
        e.preventDefault();
    }, false);

    this.ctx.canvas.addEventListener("contextmenu", function (e) {
        //console.log(getXandY(e));
        that.rightclick = getXandY(e);
        e.preventDefault();
	}, false);

	this.play.addEventListener("click", function (e) {
		that.playGame();
	}, false);

	this.pause.addEventListener("click", function (e) {
		that.pauseGame();
	}, false);

	this.reset.addEventListener("click", function (e) {
		that.reloadGame();
	}, false);

	this.restart.addEventListener("click", function (e) {
		that.restartGame();
	}, false);

    console.log('Input started');
}

GameEngine.prototype.addEntity = function (entity) {
    this.entities.push(entity);
}

GameEngine.prototype.removeEntity = function(entity) {
	//console.log('Removed entity.');
	var index = this.entities.indexOf(entity);
	this.entities.splice(index, 1);
}

GameEngine.prototype.draw = function () {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.save();
	for (var i = 0; i < this.entities.length; i++) {
		this.entities[i].draw(this.ctx);
	}
    this.ctx.restore();
}

GameEngine.prototype.update = function () {
	this.updateCounter++;
	for (var i = 0; i < this.entities.length; i++) {
		this.entities[i].update();
		if (this.entities[i].removeFromWorld) {
			this.entities.splice(i, 1);
		} 
	}
	this.world.update();
}

GameEngine.prototype.loop = function () {
	if (!this.isPaused) {
		this.clockTick = this.timer.tick() * 2;
		this.update();
		this.draw();
		this.click = null;
		this.rightclick = null;
		this.wheel = null;
	}

}

GameEngine.prototype.secondUpdate = function () {
	var entitiesCount = this.entities.length;
	if (this.updateCounter % UPDATE_PERIOD === 0) {
		for (var i = 0; i < entitiesCount; i++) {
			var entity = this.entities[i];
			if (entity != undefined) {
				entity.secondUpdate();
			}
		}
	}
}

GameEngine.prototype.setParameters = function () {
	// Text area
	CELL_DIMENSION = parseInt(document.getElementById("cellDimension").value);
	AGENT_DIMENSION = parseInt(document.getElementById("agentSize").value);
	SIM_DURATION = parseInt(document.getElementById("simDuration").value);
	UPDATE_PERIOD = parseInt(document.getElementById("updatePeriod").value);
	MAX_BONUS = parseInt(document.getElementById("maxBonuses").value);
	INITIAL_POPULATION = parseInt(document.getElementById("initPop").value);
	DEATH_CHANCE = parseInt(document.getElementById("mortality").value);
	MUTATION_RATE = parseInt(document.getElementById("mutationRate").value);

	// Checkbox
	INDIVIDUAL_LEARNING = document.getElementById("il").checked;
	SOCIAL_LEARNING = document.getElementById("sl").checked;
	BIOLOGICAL_LEARNING = document.getElementById("pl").checked;
}

download_img = function (el) {
	var image = canvas.toDataURL("image/jpg");
	el.href = image;
};