
define(['app/scenes/scene', 'app/components/buttons/navbutton', 'app/components/buttons/pausebutton', 'app/commsdata',

'app/locdata', 'app/scenes/game/controls', 'app/scenes/game/gamemode', 'app/scenes/game/commgameview',

'app/utils/alertmanager', 'app/game', 'app/consts/layoutdata'],

function(Scene, NavButton, PauseButton, CommsData, 

LocData, Controls, GameMode, CommGameView,

AlertManager, Game, LayoutData){
	
	"use strict";
	
	var GameScene  = function(key){
		Scene.call(this, key);
		this.gameMenu = null;
	};
	
	GameScene.prototype = Object.create(Scene.prototype);
	GameScene.prototype.constructor = GameScene;
	
	GameScene.prototype.addControls = function() {
		this.controls = new Controls({"bounds":{"x":0, "y":0}});
		Game.getInstance().world.add(this.controls.group);
		this.controls.upSignal.add(this.gameView.controlUp, this.gameView);
		this.controls.downSignal.add(this.gameView.controlDown, this.gameView);
	};
	GameScene.prototype.showControls = function(tf) {
		this.controls.visible = tf;
	};
	
	GameScene.prototype.onHome = function(data) {
		this.showGameOverMenu(data);
	};
	
	GameScene.prototype.listenToGame = function() {
		this.gameView.stackCompleteSignal.add(this.stackComplete, this);
		this.gameView.stillSignal.add(this.onStill, this);
		this.gameView.deadSignal.add(this.onDead, this);
		this.gameView.homeSignal.add(this.onHome, this);
	};
	
	GameScene.prototype.create = function() {
		Scene.prototype.create.apply(this, arguments);
		this.gameView = new CommGameView(LayoutData.getData(0, 0));
		this.pauseButton = new PauseButton({"x":Game.w() - PauseButton.WIDTH, "y":0});
		this.pauseButton.sprite.fixedToCamera = true;
		this.pauseButton.mouseUpSignal.add(this.buttonClicked, this);
		Game.getInstance().world.add(this.pauseButton.sprite);
		if(LocData.getInstance().getMode() !== GameMode.COMMANDS){
			this.addControls();
		}
		this.listenToGame();
		this.checkLaunch();
	};
	
	GameScene.prototype.onStill = function() {
		if(this.controls){
			this.controls.enableAll();
		}
	};
	
	GameScene.prototype.onDead = function() {
		this.showDeadMenu();
	};
	
	GameScene.prototype.stackComplete = function() {
		var success = true;
		LocData.getInstance().levelCompleted(success);
	};
	
	GameScene.prototype.checkLaunch_playback = function() {
		setTimeout($.proxy(this.gameView.playBack, this.gameView), 500);
	};
	
	GameScene.prototype.checkLaunch = function() {
		var firstLevel = LocData.getInstance().isFirstLevel();
		if(LocData.getInstance().getMode() === GameMode.INTERACTIVE){
			this.showGrowlMenu();
		}
		else if(LocData.getInstance().getMode() === GameMode.COMMANDS){
			this.showGrowlMenu();
		}
	};
	
	GameScene.prototype.showPauseMenu = function(data) {
		AlertManager.makePauseMenu("pause", $.proxy(this.pauseMenuClick, this));
	};
	
	GameScene.prototype.showGameOverMenu = function(data) {
		if(data.success){
			AlertManager.makeGameOverMenuSuccess("Well done!", $.proxy(this.gameOverMenuClick, this));
		}
		else{
			AlertManager.makeGameOverMenuFail("Well done!", $.proxy(this.gameOverMenuClick, this));
		}
	};
	
	GameScene.prototype.showDeadMenu = function(data) {
		AlertManager.makeGameOverMenuFail("dead game over", $.proxy(this.gameOverMenuClick, this));
	};
	
	GameScene.prototype.showGrowlMenu = function(data) {
		AlertManager.makeGrowl("Use the buttons to...", null);
	};
	
	GameScene.prototype.gameOverMenuClick = function(data) {
		console.log("gameOverMenuClick "+JSON.stringify(data));
		if(data.index === 0){
			//reset
			this.navigationSignal.dispatch({"key":this.key, "target":"refresh"});	
		}
		else{
			this.navigationSignal.dispatch({"key":this.key, "target":"levels"});	
		}
	};
	
	GameScene.prototype.pauseMenuClick = function(data) {
		if(data.index === 0){
			LocData.getInstance().setMode(GameMode.INTERACTIVE);
		}
		else if(data.index === 1){
			LocData.getInstance().setMode(GameMode.COMMANDS);
			this.navigationSignal.dispatch({"key":this.key, "target":"comms"});
		}
		else if(data.index === 2){
			this.navigationSignal.dispatch({"key":this.key, "target":"levels"});
		}
		else if(data.index === 3){
			this.navigationSignal.dispatch({"key":this.key, "target":"home"});
		}
		else if(data.index === 4){
			this.navigationSignal.dispatch({"key":this.key, "target":"refresh"});
		}
		else if(data.index === 5){
			
		}
	};
	
	GameScene.prototype.hideMenu = function(data) {
		
	};
	
	GameScene.prototype.buttonClicked = function(data) {
		this.showPauseMenu();
	};

	GameScene.prototype.update = function() {
		Scene.prototype.update.apply(this, arguments);
		this.gameView.update();
	};
	
	GameScene.prototype.shutdown = function() {
		Scene.prototype.shutdown.apply(this, arguments);
		this.pauseButton.mouseUpSignal.removeAll(this);
		this.gameView.stackCompleteSignal.removeAll(this);
		this.gameView.stillSignal.removeAll(this);
		this.hideMenu();
		this.gameView.destroy();
		this.gameView = null;
		if(this.gameMenu){
			this.gameMenu.destroy();
			this.gameMenu = null;
		}
		if(this.controls){
			this.controls.upSignal.removeAll(this.gameView);
			this.controls.downSignal.removeAll(this.gameView);
			this.controls.destroy();
			this.controls = null;
		}
	};
	
	return GameScene;

});
	
