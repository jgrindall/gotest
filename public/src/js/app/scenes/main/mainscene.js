
define(['app/scenes/scene', 'app/preloader/preloader', 'app/components/buttons/navbutton', 'app/scenes/game/commgameview', 'app/consts/layoutdata', 'app/components/buttons/bulbbutton', 'app/components/loaderbar', 'app/utils/textfactory', 'app/game'],

function(Scene, Preloader, NavButton, CommGameView, LayoutData, BulbButton, LoaderBar, TextFactory, Game){
	
	"use strict";
	
	var MainScene  = function(key){
		Scene.call(this, key);
		this.numLoaded = 0;
	};
	
	MainScene.created = false;
	
	MainScene.prototype = Object.create(Scene.prototype);
	MainScene.prototype.constructor = MainScene;

	MainScene.prototype.preload = function() {
		
	};
	
	MainScene.prototype.addChildren = function() {
		Scene.prototype.addChildren.call(this);
		this.gameView = new CommGameView(LayoutData.getData(0, 0));
		this.gameView.create();
		this.addText();
		this.addButtons();
	};
	
	MainScene.prototype.addText = function() {
		this.label = TextFactory.make(Game.cx() - 300, 0, "Main menu", TextFactory.LARGE);
		Game.getInstance().world.add(this.label);
	};
	
	MainScene.prototype.addButtons = function() {
		var padding = 100;
		this.startButton = new NavButton({"x":Game.cx() - NavButton.WIDTH - padding, "y":Game.h() + 100});
		this.tutorialButton = new BulbButton({"x":Game.cx() + padding, "y":Game.h() + 100});
		this.startButton.create();
		this.tutorialButton.create();
		this.startButton.mouseUpSignal.add(this.startButtonClicked, this);
		this.tutorialButton.mouseUpSignal.add(this.tutorialButtonClicked, this);
		Game.getInstance().world.add(this.startButton.sprite);
		Game.getInstance().world.add(this.tutorialButton.sprite);
	};

	MainScene.prototype.create = function() {
		Scene.prototype.create.call(this);
		this.showButtons();
	};

	MainScene.prototype.showButtons = function() {
		var obj1, obj2, obj3;
		obj1 = {"y": Game.h() + 100};
		obj2 = {"y": Game.cy()};
		obj3 = {"y": Game.cy()};
		Game.getInstance().add.tween(this.startButton.sprite).to(obj2, 250, Phaser.Easing.Quadratic.Out, true, 20, false);
		Game.getInstance().add.tween(this.tutorialButton.sprite).to(obj3, 250, Phaser.Easing.Quadratic.Out, true, 20, false);
	};
	
	MainScene.prototype.startButtonClicked = function(data) {
		this.navigationSignal.dispatch({"key":this.key, "button":"start"});
	};

	MainScene.prototype.tutorialButtonClicked = function(data) {
		this.navigationSignal.dispatch({"key":this.key, "button":"tutorial"});
	};

	MainScene.prototype.update = function() {
		Scene.prototype.update.apply(this, arguments);
		this.gameView.update();
	};

	MainScene.prototype.shutdown = function() {
		Scene.prototype.shutdown.apply(this, arguments);
		this.startButton.mouseUpSignal.removeAll(this);
		this.tutorialButton.mouseUpSignal.removeAll(this);
		this.startButton = null
		this.tutorialButton = null;
	};

	return MainScene;

});
	
	

		



