
define(['app/scenes/scene', 'app/preloader/preloader', 'app/components/buttons/navbutton', 'app/scenes/game/commgameview', 'app/consts/layoutdata', 'app/components/buttons/bulbbutton', 'app/components/loaderbar', 'app/utils/textfactory', 'app/game'],

function(Scene, Preloader, NavButton, CommGameView, LayoutData, BulbButton, LoaderBar, TextFactory, Game){
	
	"use strict";
	
	var LoaderScene  = function(key){
		Scene.call(this, key);
		this.numLoaded = 0;
	};
	
	LoaderScene.created = false;
	
	LoaderScene.prototype = Object.create(Scene.prototype);
	LoaderScene.prototype.constructor = LoaderScene;

	LoaderScene.prototype.preload = function() {
		this.addChildren();
		this.preloader = new Preloader();
		this.preloader.loadSignal.add(this.loadProgress, this);
		this.preloader.start();
	};
	
	LoaderScene.prototype.addChildren = function() {
		Scene.prototype.addChildren.call(this);
		this.addBar();
		this.addText();
	};
	
	LoaderScene.prototype.addBar = function() {
		var x, y, options;
		x = Game.cx() - LoaderBar.WIDTH/2;
		y = Game.cy() - 20;
		options = {"x":x, "y":y};
		this.loaderBar = new LoaderBar(options);
		this.loaderBar.create();
		Game.getInstance().world.add(this.loaderBar.sprite);
	};
	
	LoaderScene.prototype.addText = function() {
		this.label = TextFactory.make(Game.cx() - 300, 0, "Loading...", TextFactory.LARGE);
		Game.getInstance().world.add(this.label);
	};
	
	LoaderScene.prototype.loadProgress = function(data) {
		var p = Math.round(data.numLoaded * 100 / data.total);
		this.loaderBar.goToPercent(p);
	};

	LoaderScene.prototype.create = function() {
		Scene.prototype.create.call(this);
		var that = this;
		this.loaderBar.goToPercent(100);
		setTimeout(function(){
			that.navigationSignal.dispatch({"key":that.key});
		}, 700);
	};

	LoaderScene.prototype.update = function() {
		Scene.prototype.update.apply(this, arguments);
	};

	LoaderScene.prototype.shutdown = function() {
		Scene.prototype.shutdown.apply(this, arguments);
		this.loaderBar.destroy();
		if(this.preloader){
			this.preloader.loadSignal.removeAll(this);
			this.preloader.destroy();
		}
		this.loaderBar = null;
		this.preloader = null;
	};

	return LoaderScene;

});
	
	

		



