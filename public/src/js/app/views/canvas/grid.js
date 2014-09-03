
define('app/views/canvas/grid',['phaser', 'app/game', 'app/components/container'],

function(Phaser, Game, Container){
	
	"use strict";
	
	var Grid  = function(options){
		Container.call(this, options);
		this.visModel = this.options.visModel;
		this.sizeModel = this.options.sizeModel;
		this.visModel.changeSignal.add(this.onChangeGrid, this);
		this.sizeModel.changeSignal.add(this.onChangeSize, this);
		this.setVisible(this.visModel.getData().index === 1);
		this.updateImage();
	};
	
	Grid.prototype = Object.create(Container.prototype);
	Grid.prototype.constructor = Grid;
	
	Grid.prototype.onChangeGrid = function(data) {
		this.setVisible(data.index === 1);
	};

	Grid.prototype.onChangeSize = function(data) {
		this.updateImage();
	};

	Grid.prototype.updateImage = function() {
		var asset;
		if(this.sprite){
			this.sprite.destroy(true);
			this.sprite.destroy(true);
			this.sprite = null;
		}
		asset = 'grid' + this.sizeModel.getData().index;
		this.sprite = new Phaser.TileSprite(Game.getInstance(), this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h, asset);
		this.group.add(this.sprite);
	};
	
	Grid.prototype.create = function() {
		Container.prototype.create.call(this);
	};
	
	Grid.prototype.destroy = function() {
		this.visModel.changeSignal.remove(this.onChangeGrid, this);
		this.sizeModel.changeSignal.remove(this.onChangeSize, this);
		this.sprite.destroy(true);
	};
	
	return Grid;

});
	
