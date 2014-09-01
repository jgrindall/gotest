
define('app/components/background',['app/game', 'phaser'], function(Game, Phaser){
	
	"use strict";
	
	var Background = function(options){
		this.options = options;
		this.bounds = this.options.bounds;
		this.create();
	};
	
	Background.prototype.destroy = function(){
		this.sprite.destroy(true);
		this.sprite = null;
	};
	
	Background.prototype.create = function(){
    	this.sprite = new Phaser.TileSprite(Game.getInstance(), this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h, this.options.asset);
	    this.sprite.fixedToCamera = true;
	};
	
	return Background;

});




