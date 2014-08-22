
define(['app/game', 'app/components/container'],

function(Game, Container){
	
	"use strict";
	
	var Map  = function(options){
		this.bg = 0;
		Container.call(this, options);
	};
	
	Map.prototype = Object.create(Container.prototype);
	Map.prototype.constructor = Map;
	
	Map.prototype.setBg = function(i) {
		this.bg = i;
		this.addImage();
	};
	
	Map.prototype.addImage = function() {
		if(this.sprite){
			this.sprite.destroy(true);
			this.sprite = null;
		}
		this.sprite = new Phaser.Image(Game.getInstance(), this.bounds.x, this.bounds.y, 'map'+this.bg);
		this.sprite.scale = {x:this.bounds.w/this.sprite.width, y:this.bounds.h/this.sprite.height};
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
	
