
define('app/views/canvas/grid',['phaser', 'app/game', 'app/components/container'],

function(Phaser, Game, Container){
	
	"use strict";
	
	var Grid  = function(options){
		this.asset = 'grid' + options.num;
		Container.call(this, options);
	};
	
	Grid.prototype = Object.create(Container.prototype);
	Grid.prototype.constructor = Grid;
	
	Grid.prototype.updateImage = function() {
		if(this.sprite){
			this.sprite.destroy(true);
			this.sprite.destroy(true);
			this.sprite = null;
		}
		this.sprite = new Phaser.TileSprite(Game.getInstance(), this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h, this.asset);
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
	
