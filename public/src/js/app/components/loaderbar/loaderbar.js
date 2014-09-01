
define('app/components/loaderbar/loaderbar',['app/game'], function(Game){
	
	"use strict";
	
	var LoaderBar = function(options){
		this.options = options;
		this.create();
	};
	
	LoaderBar.WIDTH = 500;
	LoaderBar.HEIGHT = 60;
	
	LoaderBar.prototype.goToPercent = function(p){
		var g, numFrames;
		numFrames = 8;
		g = (numFrames - 1)/100;
		this.sprite.loadTexture('loaderBar', Math.round(p*g));
	};
	
	LoaderBar.prototype.create = function(){
		this.sprite = new Phaser.Sprite(Game.getInstance(), this.options.bounds.x, this.options.bounds.y, 'loaderBar');
	};
	
	LoaderBar.prototype.destroy = function(){
		this.sprite.destroy(true);
		this.sprite = null;
	};
	
	return LoaderBar;

});

