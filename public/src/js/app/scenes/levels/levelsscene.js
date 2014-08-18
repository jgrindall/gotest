
define(['jquery', 'app/scenes/scene', 'app/components/scroller', 'app/components/pager', 'app/utils/textfactory', 'app/components/buttons/levelsbutton', 'app/components/buttons/homebutton', 'app/game', 'app/scenes/levels/leveldataprovider', 'app/utils/storage'],

function($, Scene, Scroller, Pager, TextFactory, LevelsButton, HomeButton, Game, LevelDataProvider, Storage){
	
	"use strict";
	
	var LevelsScene  = function(key){
		Scene.call(this, key);
	};

	LevelsScene.prototype = Object.create(Scene.prototype);
	LevelsScene.prototype.constructor = LevelsScene;

	LevelsScene.prototype.create = function() {
		Scene.prototype.create.apply(this, arguments);
		var options = {"snapX":100, "dataProvider" : new LevelDataProvider()};
		this.scroller = new Pager(options);
		this.scroller.create();
		this.scroller.selectSignal.add(this.levelSelect, this);
		this.text = TextFactory.make(Game.cx() - 300, 0, "Choose a level", TextFactory.LARGE);
		this.backButton = new HomeButton({"x":0, "y":0});
		this.backButton.create();
		Game.getInstance().world.add(this.backButton.sprite);
		Game.getInstance().world.add(this.scroller.group);
		Game.getInstance().world.add(this.text);
		this.backButton.mouseUpSignal.add(this.backButtonClicked, this);
	};
	
	LevelsScene.prototype.enableAllInput = function(){
		Scene.prototype.enableAllInput.call(this);
		this.backButton.enableInput();
		this.scroller.group.enableInput();
	};
	
	LevelsScene.prototype.disableAllInput = function(){
		Scene.prototype.disableAllInput.call(this);
		this.backButton.disableInput();
		this.scroller.group.disableInput();
	};
	
	LevelsScene.prototype.backButtonClicked = function(data) {
		this.navigationSignal.dispatch({"key":this.key, "button":"back"});
	};
	
	LevelsScene.prototype.levelSelect = function(data) {
		var newData = $.extend({}, {"key":this.key, "button":"level"}, data);
		this.navigationSignal.dispatch(newData);
	};

	LevelsScene.prototype.update = function() {
		Scene.prototype.update.apply(this, arguments);
	};

	LevelsScene.prototype.shutdown = function() {
		Scene.prototype.shutdown.apply(this, arguments);
		this.scroller.selectSignal.removeAll(this);
		this.backButton.mouseUpSignal.removeAll(this);
		this.backButton.destroy();
		this.scroller.destroy();
		this.backButton = null;
		this.text = null;
		this.scroller = null;
	};

	return LevelsScene;

});
	
	



