
define(['phasercomponents', 'app/assets', 

	'app/views/loaderbar/loaderbar', 'app/views/background',

	'app/consts/appconsts'],

function(PhaserComponents, Assets,

	LoaderBar, Background,

	AppConsts){
	
	"use strict";
	
	var LoaderScene  = function(){
		PhaserComponents.Scene.call(this);
		this.numLoaded = 0;
	};
	
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
		var bounds;
		bounds = {'x':0, 'y':0, 'w':this.game.w, 'h':this.game.h};
		this.bg = new Background({"asset":Assets.BG, "bounds":bounds});
		this.world.add(this.bg.view);
	};

	LoaderScene.prototype.addBar = function() {
		var x, y, bounds;
		x = this.game.cx - LoaderBar.WIDTH/2;
		y = this.game.cy - 20;
		bounds = {"x":x, "y":y};
		this.loaderBar = new LoaderBar({'bounds':bounds, 'asset':Assets.LOADER_BAR, 'numFrames':21});
		this.world.add(this.loaderBar.view);
	};
	
	LoaderScene.prototype.loadProgress = function(progress) {
		var p, data;
		p = Math.round(progress.numLoaded * 100 / progress.total);
		this.loaderBar.goToPercent(p);
		if(progress.numLoaded === progress.total){
			data = {"sceneFrom":AppConsts.LOADER_SCENE};
			this.eventDispatcher.trigger({"type":PhaserComponents.Events.AppEvents.CHANGE_SCENE, "data":data});
		}
	};

	LoaderScene.prototype.create = function() {
		this.loaderBar.goToPercent(100);
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
	
	

		



