
define('app/scenes/loaderscene',['phasercomponents', 'app/assets', 

	'app/components/loaderbar/loaderbar',

'app/text/textfactory'],

function(PhaserComponents, Assets,

	LoaderBar,

TextFactory){
	
	"use strict";
	
	var LoaderScene  = function(){
		PhaserComponents.Scene.call(this);
		this.numLoaded = 0;
	};
	
	LoaderScene.created = false;
	
	LoaderScene.prototype = Object.create(PhaserComponents.Scene.prototype);
	LoaderScene.prototype.constructor = LoaderScene;

	LoaderScene.prototype.preload = function() {
		this.addChildren();
		this.preloader = new PhaserComponents.Display.Preloader(this.game, Assets.DATA);
		this.preloader.loadSignal.add(this.loadProgress, this);
		this.preloader.start();
	};
	
	LoaderScene.prototype.addChildren = function() {
		this.addBar();
		this.addText();
	};
	
	LoaderScene.prototype.addBar = function() {
		var x, y, bounds;
		x = this.game.cx - LoaderBar.WIDTH/2;
		y = this.game.cy - 20;
		bounds = {"x":x, "y":y};
		this.loaderBar = new LoaderBar({'bounds':bounds, 'asset':Assets.LOADER_BAR, 'num':7});
		this.world.add(this.loaderBar.sprite);
	};
	
	LoaderScene.prototype.addText = function() {
		this.label = TextFactory.make(this.game, this.game.cx - 300, 0, "Loading...", TextFactory.LARGE);
		this.world.add(this.label);
	};
	
	LoaderScene.prototype.loadProgress = function(data) {
		var p = Math.round(data.numLoaded * 100 / data.total);
		this.loaderBar.goToPercent(p);
	};

	LoaderScene.prototype.create = function() {
		this.loaderBar.goToPercent(100);
		var data = {"scene":this};
		this.eventDispatcher.trigger({"type":PhaserComponents.Events.AppEvents.CHANGE_SCENE, "data":data});
	};

	LoaderScene.prototype.shutdown = function() {
		PhaserComponents.Scene.prototype.shutdown.apply(this, arguments);
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
	
	

		



