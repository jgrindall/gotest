
define([],

function(){
	
	"use strict";
	
	var Game = function(){
		
	};
	
	Game.GRAVITY = 750;
	
	Game.init = function(config){
		Game.config = config;
		Game.pauseSignal = new Phaser.Signal();
		Game.alertSignal = new Phaser.Signal();
		Game.getInstance();
	};
	
	Game.getInput = function(){
		return Game.getInstance().input;
	};
	
	Game.getWidth = function(){
		return 1024;
		//var pRatio, w;
		//pRatio = window.devicePixelRatio;
		//w = Math.min(1024, document.body.offsetWidth);
		//return pRatio * w;
	};
	
	Game.getHeight = function(){
		return 550;
		//var pRatio, h;
		//pRatio = window.devicePixelRatio;
		//h = Math.min(768, document.body.offsetHeight);
		//return pRatio * h;
	};
	
	Game.gonePortrait = function(){
		alert("portrait");
	};
	
	Game.w = function(){
		return Game.getInstance().camera.width;
	};
	
	Game.h = function(){
		return Game.getInstance().camera.height;
	};
	
	Game.cx = function(){
		return Game.w()/2;
	};
	
	Game.cy = function(){
		return Game.h()/2;
	};
	
	Game.setupScale = function(){
		Game.scaleManager = new Phaser.ScaleManager(Game.instance, 1024, 768);
		Game.scaleManager.forceLandscape = true;
		Game.scaleManager.scaleMode = Phaser.StageScaleMode.EXACT_FIT;
		Game.scaleManager.pageAlignHorizontally = true;
		Game.scaleManager.pageAlignVertically = true;
		Game.scaleManager.enterPortrait.add(Game.gonePortrait);
		Game.scaleManager.forceOrientation(true, false);
	};
	
	Game.setMoveCallback = function(f){
		
	};
	
	Game.create = function(){
		var w, h;
		w = Game.getWidth();
    	h = Game.getHeight();
		Game.instance = new Phaser.Game(w, h, Phaser.AUTO, 'game', Game.config);
		Game.setupScale();
	};
	
	Game.getInstance = function(){
		if(!Game.instance){
			Game.create();
		}
		return Game.instance;
	};
	
	return Game;
	
});

