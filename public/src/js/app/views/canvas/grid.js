
define('app/views/canvas/grid',


	['phaser',	'phasercomponents', 'app/consts/steplengths'],

function(Phaser, PhaserComponents, StepLengths){
	
	"use strict";
	
	var Grid  = function(options){
		PhaserComponents.Container.call(this, options);
		this.visModel = this.options.visModel;
		this.sizeModel = this.options.sizeModel;
		this.visModel.changeSignal.add(this.onChangeGrid, this);
		this.sizeModel.changeSignal.add(this.onChangeSize, this);
		this.setVisible(this.visModel.getData().index === 1);
		this.updateImage();
	};
	
	Grid.prototype = Object.create(PhaserComponents.Container.prototype);
	Grid.prototype.constructor = Grid;
	
	Grid.prototype.onChangeGrid = function(data) {
		this.setVisible(data.index === 1);
	};

	Grid.prototype.onChangeSize = function(data) {
		this.updateImage();
	};

	Grid.prototype.getOffset = function() {
		var x0, y0, dx, dy, size, xNum, yNum, index;
		index = this.sizeModel.getData().index;
		x0 = this.bounds.w/2;
		y0 = this.bounds.h/2;
		size = StepLengths.ALL[index];
		xNum = x0 / size;
		yNum = y0 / size;
		dx = size * (Math.ceil(xNum) - xNum);
		dy = size * (Math.ceil(yNum) - yNum);
		return {'x':dx, 'y':dy};
	};

	Grid.prototype.updateTile = function() {
		var asset, offset, index;
		index = this.sizeModel.getData().index;
		if(this.sprite){
			this.sprite.destroy(true);
			this.sprite = null;
		}
		offset = this.getOffset();
		asset = 'grid' + index;
		this.sprite = new Phaser.TileSprite(this.game, this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h, asset);
		this.sprite.tilePosition = new PIXI.Point(-offset.x, -offset.y);
		this.group.add(this.sprite);
	};

	Grid.prototype.updateImage = function() {
		this.updateTile();
	};
	
	Grid.prototype.destroy = function() {
		this.visModel.changeSignal.remove(this.onChangeGrid, this);
		this.sizeModel.changeSignal.remove(this.onChangeSize, this);
		this.sprite.mask = null;
		this.group.remove(this.mask);
		this.group.remove(this.sprite);
		this.sprite.destroy(true);
		this.mask.destroy(true);
		PhaserComponents.Container.prototype.destroy.call(this, options);
	};
	
	return Grid;

});
	
