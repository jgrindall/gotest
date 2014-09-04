
define('app/gamemanager', ['phaser', 'phaserstatetrans'],

function(Phaser, PhaserStateTrans){
	
	"use strict";
	
	var GameManager = function(){

	};

	GameManager.prototype.init = function(config){
		var w, h;
		w = this.getWidth();
    	h = this.getHeight();
		this.game = new Phaser.Game(w, h, Phaser.AUTO, config.el, config);
		this.scaleManager = new Phaser.ScaleManager(this.game, w, h);
		this.scaleManager.scaleMode = Phaser.StageScaleMode.EXACT_FIT;
		this.transitions = this.game.plugins.add(PhaserStateTrans);
		this.transitions.settings({'duration': 300,	'properties': {'alpha': 0, 'scale': {'x': 1.05, 'y': 1.05}}});
	};

	GameManager.prototype.start = function(){
		this.game.state.start(s);
	};

	GameManager.prototype.registerScene = function(key, scene){
		scene.navigationSignal.add(this.onNavigation, this);
		this.game.state.add(key, scene);
	};

	GameManager.prototype.onNavigation = function(data){
		if(data.key === AppConsts.LOADER_SCENE){
			this.goToScene(AppConsts.ACTIVITY_SCENE);
		}
	};

	GameManager.prototype.goToScene = function(key){
		this.transitions.to(key);
	};

	GameManager.prototype.getWidth = function(){
		return 1024 * window.devicePixelRatio;
	};
	
	GameManager.prototype.getHeight = function(){
		return 570 * window.devicePixelRatio;
	};
	
	GameManager.prototype.w = function(){
		return this.game.camera.width;
	};
	
	GameManager.prototype.h = function(){
		return this.game.camera.height;
	};
	
	GameManager.prototype.cx = function(){
		return this.w()/2;
	};
	
	GameManager.prototype.cy = function(){
		return this.h()/2;
	};
	
	return GameManager;
	
});

