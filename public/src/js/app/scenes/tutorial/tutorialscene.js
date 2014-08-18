
define(['app/scenes/scene', 'app/preloader/preloader', 'app/components/buttons/homebutton', 'app/utils/textfactory', 'app/game'],

function(Scene, Preloader, HomeButton, TextFactory, Game){
	
	"use strict";
	
	var TutorialScene  = function(key){
		Scene.call(this, key);
	};

	TutorialScene.prototype = Object.create(Scene.prototype);
	TutorialScene.prototype.constructor = TutorialScene;

	TutorialScene.prototype.create = function() {
		Scene.prototype.create.apply(this, arguments);
		this.label = TextFactory.make(Game.cx() - 300, 50, "Tutorial", TextFactory.LARGE);
		this.startButton = new HomeButton({"x":0, "y":0});
		this.startButton.create();
		this.startButton.mouseUpSignal.add(this.startButtonClicked, this);
		Game.getInstance().world.add(this.startButton.sprite);
		Game.getInstance().world.add(this.label);
	};

	TutorialScene.prototype.startButtonClicked = function(data) {
		this.navigationSignal.dispatch({"key":this.key});
	};

	TutorialScene.prototype.tutorialButtonClicked = function(data) {
		this.navigationSignal.dispatch({"key":this.key});
	};

	TutorialScene.prototype.update = function() {
		Scene.prototype.update.apply(this, arguments);
	};

	TutorialScene.prototype.shutdown = function() {
		Scene.prototype.shutdown.apply(this, arguments);
	};

	return TutorialScene;

});
	
	





