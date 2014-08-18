
define(['app/scenes/scene', 'app/components/buttons/navbutton', 'app/components/buttons/pausebutton', 'app/commsdata', 'app/locdata', 'app/scenes/game/controls', 'app/scenes/game/gamemode', 'app/scenes/game/commgameview', 'app/scenes/game/gamemenu', 'app/game', 'app/consts/layoutdata'],

function(Scene, NavButton, PauseButton, CommsData, LocData, Controls, GameMode, CommGameView, GameMenu, Game, LayoutData){
	
	"use strict";
	
	var GameScene  = function(key){
		Scene.call(this, key);
		this.gameMenu = null;
	};
	
	GameScene.prototype = Object.create(Scene.prototype);
	GameScene.prototype.constructor = GameScene;
	
	GameScene.prototype.addControls = function() {
		this.controls = new Controls({"bounds":{"x":0, "y":0}});
		this.controls.create();
		Game.getInstance().world.add(this.controls.group);
		this.controls.upSignal.add(this.gameView.controlUp, this.gameView);
		this.controls.downSignal.add(this.gameView.controlDown, this.gameView);
	};
	GameScene.prototype.showControls = function(tf) {
		this.controls.visible = tf;
	};
	
	GameScene.prototype.create = function() {
		Scene.prototype.create.apply(this, arguments);
		this.gameView = new CommGameView(LayoutData.getData(0, 0));
		this.gameView.stackCompleteSignal.add(this.stackComplete, this);
		this.gameView.deadSignal.add(this.onDead, this);
		this.pauseButton = new PauseButton({"x":Game.w() - PauseButton.WIDTH, "y":0});
		this.gameView.create();
	    this.pauseButton.create();
		this.pauseButton.sprite.fixedToCamera = true;
		this.pauseButton.mouseUpSignal.add(this.buttonClicked, this);
		Game.getInstance().world.add(this.pauseButton.sprite);
		if(LocData.getInstance().getMode() !== GameMode.COMMANDS){
			this.addControls();
		}
		this.checkLaunch();
	};
	
	GameScene.prototype.onDead = function() {
		this.showMenu();
	};
	
	GameScene.prototype.stackComplete = function() {
		var success = true;
		LocData.getInstance().levelCompleted(success);
	};
	
	GameScene.prototype.checkLaunch_menu = function() {
		setTimeout($.proxy(this.showMenu, this), 500);
	};
	
	GameScene.prototype.checkLaunch_playback = function() {
		setTimeout($.proxy(this.gameView.playBack, this.gameView), 500);
	};
	
	GameScene.prototype.checkLaunch = function() {
		if(LocData.getInstance().getMode() === GameMode.UNKNOWN){
			this.checkLaunch_menu();
		}
		else if(LocData.getInstance().getMode() === GameMode.COMMANDS){
			this.checkLaunch_playback();
		}
	};
	
	GameScene.prototype.showMenu = function(data) {
		var options, that = this, bounds;
		Game.pausePhysics();
		bounds = {"x":Game.cx() - GameMenu.WIDTH/2, "y":Game.cy() - GameMenu.HEIGHT/2, "w":GameMenu.WIDTH, "h":GameMenu.HEIGHT};
		options = {"bounds":bounds};
		if(!this.gameMenu){
			this.gameMenu = new GameMenu(options);
			this.gameMenu.create();
			Game.getInstance().world.add(this.gameMenu.group);
			this.gameMenu.selectSignal.add(this.menuClick, this);
		}
	};
	
	GameScene.prototype.menuClick = function(data) {
		if(data.index === 0){
			LocData.getInstance().setMode(GameMode.INTERACTIVE);
			this.hideMenu();
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
			this.hideMenu();
		}
	};
	
	GameScene.prototype.hideMenu = function(data) {
		Game.unPausePhysics();
		Game.getInstance().world.remove(this.gameMenu.group);
		this.gameMenu.selectSignal.removeAll(this);
		this.gameMenu.destroy();
		this.gameMenu = null;
	};
	
	GameScene.prototype.buttonClicked = function(data) {
		this.showMenu();
	};

	GameScene.prototype.update = function() {
		Scene.prototype.update.apply(this, arguments);
		this.gameView.update();
	};
	
	GameScene.prototype.shutdown = function() {
		Scene.prototype.shutdown.apply(this, arguments);
		this.pauseButton.mouseUpSignal.removeAll(this);
		this.gameView.stackCompleteSignal.removeAll(this);
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
	
