
define(['app/game', 'app/components/container'],

function(Game, Container){
	
	"use strict";
	
	var Map  = function(options){
		Container.call(this, options);
		this.create();
	};
	
	Map.prototype = Object.create(Container.prototype);
	Map.prototype.constructor = Map;
	
	Map.prototype.addImage = function() {
		this.sprite = new Phaser.Image(Game.getInstance(), 0, 0, 'map');
		this.group.add(this.sprite);
	};
	
	Map.prototype.create = function() {
		Container.prototype.create.call(this);
		this.addImage();	
	};
	
	Map.prototype.destroy = function() {
		this.sprite.destroy(true);
	};
	
	return Map;

});
	
