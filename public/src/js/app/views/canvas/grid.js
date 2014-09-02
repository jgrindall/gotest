
define('app/views/canvas/grid',['app/game', 'app/components/container'],

function(Game, Container){
	
	"use strict";
	
	var Grid  = function(options){
		Container.call(this, options);
	};
	
	Grid.prototype = Object.create(Container.prototype);
	Grid.prototype.constructor = Grid;
	
	Grid.prototype.updateImage = function() {
		if(this.sprite){
			this.sprite.destroy(true);
			this.sprite = null;
		}
		this.sprite = new Phaser.TileSprite(Game.getInstance(), this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h, 'grid0');
		this.group.add(this.sprite);
	};
	
	Grid.prototype.create = function() {
		Container.prototype.create.call(this);
		this.updateImage();	
	};
	
	Grid.prototype.destroy = function() {
		this.sprite.destroy(true);
	};
	
	return Grid;

});
	
