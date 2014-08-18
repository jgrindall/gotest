
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
	
	Game.getPhysics = function(){
		return Game.getInstance().physics.arcade;
	};
	
	Game.getInput = function(){
		return Game.getInstance().input;
	};
	
	Game.unPausePhysics = function(){
		if(Game.physicsPaused){
			Game.physicsPaused = false;
			Game.pauseSignal.dispatch();
		}
	};
	
	Game.pausePhysics = function(){
		if(!Game.physicsPaused){
			Game.physicsPaused = true;
			Game.pauseSignal.dispatch();
		}
	};
	
	Game.startPhysics = function(){
		if(!Game.physicsStarted){
			Game.physicsPaused = false;
			Game.getInstance().physics.startSystem(Phaser.Physics.ARCADE);
			Game.getPhysics().gravity.y = Game.GRAVITY;
		}
		else{
			Game.unpausePhysics();
		}
	};
	
	Game.getWidth = function(){
		var pRatio, w;
		pRatio = window.devicePixelRatio;
		w = Math.min(1024, document.body.offsetWidth);
		return pRatio * w;
	};
	
	// 800 x 600??
	
	Game.getHeight = function(){
		var pRatio, h;
		pRatio = window.devicePixelRatio;
		h = Math.min(768, document.body.offsetHeight);
		return pRatio * h;
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
	
	Game.create = function(){
		var w, h;
		w = Game.getWidth();
    	h = Game.getHeight();
    	console.log("size "+window.devicePixelRatio, document.body.offsetWidth, document.body.offsetHeight);
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

