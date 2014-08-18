
define(['app/game'], function(Game){
	
	"use strict";
	
	var KillArea = function(options){
		options.asset = 'killarea';
		this.options = options;
	};
	
	KillArea.prototype.create = function () {
		this.makeSprite();
	};
	
	KillArea.prototype.makeSprite = function() {
	    this.sprite = new Phaser.Sprite(Game.getInstance(), this.options.x, this.options.y, this.options.asset);
		this.sprite.enableBody = true;
		Game.getInstance().physics.enable(this.sprite, Phaser.Physics.ARCADE);
		this.body = this.sprite.body;
		this.body.allowGravity = false;
	};
	
	KillArea.prototype.destroy = function () {
		this.sprite.destroy(true);
		this.sprite = null;
	};
	
	return KillArea;
	
});


