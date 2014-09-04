
define('app/components/loaderbar/loaderbar',['phaser','phasercomponents'], 

	function(Phaser, PhaserComponents){
	
	"use strict";
	
	var LoaderBar = function(options){
		PhaserComponents.View.call(this);
		this.options = options;
		this.create();
	};
	
	LoaderBar.WIDTH = 500;
	LoaderBar.HEIGHT = 60;
	
	LoaderBar.prototype = Object.create(PhaserComponents.View.prototype);
	LoaderBar.prototype.constructor = LoaderBar;

	LoaderBar.prototype.goToPercent = function(p){
		var g, numFrames;
		numFrames = 8;
		g = (numFrames - 1)/100;
		this.sprite.loadTexture('loaderBar', Math.round(p*g));
	};
	
	LoaderBar.prototype.create = function(){
		this.sprite = new Phaser.Sprite(this.game, this.options.bounds.x, this.options.bounds.y, 'loaderBar');
	};
	
	LoaderBar.prototype.destroy = function(){
		this.sprite.destroy(true);
		this.sprite = null;
	};
	
	return LoaderBar;

});

