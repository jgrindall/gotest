
define(['app/game'], function(Game){
	
	"use strict";
	
	var Home = function(options){
		options.asset = 'home';
		this.options = options;
		this.create();
	};
	
	Home.prototype.create = function () {
		this.makeSprite();
	};
	
	Home.prototype.makeSprite = function() {
	    this.sprite = new Phaser.Sprite(Game.getInstance(), this.options.x, this.options.y, this.options.asset);
		this.sprite.enableBody = true;
		Game.getInstance().physics.enable(this.sprite, Phaser.Physics.ARCADE);
		this.body = this.sprite.body;
		this.body.allowGravity = false;
	};
	
	Home.prototype.destroy = function () {
		this.sprite.destroy(true);
		this.sprite = null;
	};
	
	return Home;
	
});


