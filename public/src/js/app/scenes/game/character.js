
define(['app/game'], function(Game){
	
	"use strict";
	
	var Character = function(options){
		Game.pauseSignal.add(this.pauseChanged, this);
		this.options = options;
	};
	
	Character.prototype.create = function () {
		this.makeSprite();
	};
	
	Character.prototype.makeSprite = function() {
	    this.sprite = new Phaser.Sprite(Game.getInstance(), this.options.x, this.options.y, this.options.asset);
		this.sprite.enableBody = true;
		Game.getInstance().physics.enable(this.sprite, Phaser.Physics.ARCADE);
		this.body = this.sprite.body;
	    this.body.gravity.y = 400;
	    this.body.velocity.x = this.options.vx;
	    this.body.velocity.y = this.options.vy;
	    this.body.collideWorldBounds = true;
	};

	Character.prototype.pauseChanged = function(){
		var paused = Game.physicsPaused;
		if(paused){
			this.pause();
		}
		else{
			this.unPause();
		}
	};
	
	Character.prototype.pause = function(){
		this.cachedVelocity = {'x':this.sprite.body.velocity.x, 'y':this.sprite.body.velocity.y};
		this.body.allowGravity = false;
		this.body.velocity.x = 0;
		this.body.velocity.y = 0;
		this.sprite.animations.stop();
	};
	
	Character.prototype.unPause = function(){
		this.body.allowGravity = true;
		this.body.velocity.x = this.cachedVelocity.x;
		this.body.velocity.y = this.cachedVelocity.y;
	};
	
	Character.prototype.destroy = function () {
		Game.pauseSignal.removeAll(this);
		this.sprite.destroy(true);
		this.sprite = null;
	};
	
	return Character;
	
});
	

