define(['app/game'], function(Game){
	
	"use strict";
	
	var Star = function(options){
		options.asset = 'star';
		this.options = options;
		Game.pauseSignal.add(this.pauseChanged, this);
		this.create();
	};
	
	Star.prototype.pauseChanged = function(){
		var paused = Game.physicsPaused;
		if(paused){
			this.pause();
		}
		else{
			this.unPause();
		}
	};
	
	Star.prototype.pause = function (){
		this.vy = this.sprite.body.velocity.y;
		this.sprite.body.velocity.y = 0;
		this.sprite.body.gravity.y = 0;
	};
	
	Star.prototype.unPause = function () {
		this.sprite.body.velocity.y = this.vy;
		this.sprite.body.gravity.y = 400;
	};
	
	Star.prototype.create = function () {
		this.sprite = new Phaser.Sprite(Game.getInstance(), this.options.x, this.options.y, this.options.asset);
	    Game.getInstance().physics.enable(this.sprite, Phaser.Physics.ARCADE);
		this.sprite.enableBody = true;
		this.sprite.body.bounce.y = 0.1;
		this.sprite.body.gravity.y = 400;
		this.sprite.body.velocity.y = 0.5;
	};
	
	Star.prototype.update = function () {
		
	};
	
	Star.prototype.destroy = function () {
		Game.pauseSignal.removeAll(this);
		this.sprite.destroy(true);
	};
	
	return Star;
	
});


