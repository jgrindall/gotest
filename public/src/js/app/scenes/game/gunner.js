
define(['app/game'], function(Game){
	
	"use strict";
	
	var Gunner = function(options){
		options.asset = 'killarea';
		options.interval = 4000;
		this.options = options;
		this.shootSignal = new Phaser.Signal();
		Game.pauseSignal.add(this.pauseChanged, this);
		this.create();
	};
	
	Gunner.prototype.pauseChanged = function(){
		var paused = Game.physicsPaused;
		if(paused){
			this.pause();
		}
		else{
			this.unPause();
		}
	};
	
	Gunner.prototype.pause = function () {
		if(!this.interval){
			clearInterval(this.interval);
		}
	};
	
	Gunner.prototype.unPause = function () {
		if(!this.interval){
			this.interval = setInterval($.proxy(this.shoot, this), this.options.interval);
		}
	};
	
	Gunner.prototype.create = function () {
		this.makeSprite();
		this.unPause();
	};
	
	Gunner.prototype.shoot = function() {
		this.shootSignal.dispatch({"target":this});
	};
	
	Gunner.prototype.makeSprite = function() {
	    this.sprite = new Phaser.Sprite(Game.getInstance(), this.options.x, this.options.y, this.options.asset);
		this.sprite.enableBody = true;
		Game.getInstance().physics.enable(this.sprite, Phaser.Physics.ARCADE);
		this.body = this.sprite.body;
		this.body.allowGravity = false;
	};
	
	Gunner.prototype.update = function () {
		
	};
	
	Gunner.prototype.destroy = function () {
		this.shootSignal.removeAll(this);
		clearInterval(this.interval);
		this.sprite.destroy(true);
		this.sprite = null;
	};
	
	return Gunner;
	
});

