
define(['app/game'], function(Game){
	
	"use strict";
	
	var Gunner = function(options){
		options.asset = 'killarea';
		this.options = options;
		this.shootSignal = new Phaser.Signal();
	};
	
	Gunner.prototype.create = function () {
		this.makeSprite();
	};
	
	Gunner.prototype.makeSprite = function() {
	    this.sprite = new Phaser.Sprite(Game.getInstance(), this.options.x, this.options.y, this.options.asset);
		this.sprite.enableBody = true;
		Game.getInstance().physics.enable(this.sprite, Phaser.Physics.ARCADE);
		this.body = this.sprite.body;
		this.body.allowGravity = false;
	};
	
	Gunner.prototype.update = function () {
		if(Math.random() < 0.003){
			this.shootSignal.dispatch({"target":this});
		}
	};
	
	Gunner.prototype.destroy = function () {
		this.shootSignal.removeAll(this);
		this.sprite.destroy(true);
		this.sprite = null;
	};
	
	return Gunner;
	
});


