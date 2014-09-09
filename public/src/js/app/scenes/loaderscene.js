
define('app/scenes/loaderscene',['phasercomponents', 'app/assets', 

	'app/views/loaderbar/loaderbar', 'app/views/background'],

function(PhaserComponents, Assets,

	LoaderBar, Background){
	
	"use strict";
	
	var LoaderScene  = function(){
		PhaserComponents.Scene.call(this);
		this.numLoaded = 0;
	};
	
	LoaderScene.created = false;
	
	PhaserComponents.Utils.extends(LoaderScene, PhaserComponents.Scene);

	LoaderScene.prototype.preload = function() {
		this.addChildren();
		this.preloader = new PhaserComponents.Display.Preloader(this.game, Assets.DATA);
		this.preloader.loadSignal.add(this.loadProgress, this);
		this.preloader.start();
	};
	
	LoaderScene.prototype.addChildren = function() {
		this.addBg();
		this.addBar();
	};
	
	LoaderScene.prototype.addBg = function() {
		var w, h, bounds;
		bounds = {'x':0, 'y':0, 'w':this.game.w, 'h':this.game.h};
		this.bg = new Background({"asset":Assets.BG, "bounds":bounds});
		this.world.add(this.bg.sprite);
	};

	LoaderScene.prototype.addBar = function() {
		var x, y, bounds;
		x = this.game.cx - LoaderBar.WIDTH/2;
		y = this.game.cy - 20;
		bounds = {"x":x, "y":y};
		this.loaderBar = new LoaderBar({'bounds':bounds, 'asset':Assets.LOADER_BAR, 'numFrames':8});
		this.world.add(this.loaderBar.sprite);
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
	
	

		



