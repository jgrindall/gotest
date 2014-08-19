
define(['app/game'], function(Game){
	
	"use strict";
	
	var Platforms = function(options){
		this.options = options;
		this.create();
	};

	Platforms.prototype.create = function () {
		this.map = new Phaser.Tilemap(Game.getInstance(), this.options.levelName);
	    this.map.addTilesetImage(this.options.tileImage);
	    this.map.setCollisionByExclusion([ ]);
	    this.tileMapLayer = this.map.createLayer(this.options.layerName);
	    this.tileMapLayer.resizeWorld();
	};
	
	Platforms.prototype.destroy = function() {
		this.tileMapLayer.destroy(true);
		this.tileMapLayer = null;
		this.map = null;
	};
	
	return Platforms;
	
});
	



