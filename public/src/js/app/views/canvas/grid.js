
define('app/views/canvas/grid',


	['phaser',	'phasercomponents', 'app/consts/steplengths', 'app/assets'],

function(Phaser, PhaserComponents, StepLengths, Assets){
	
	"use strict";
	
	var Grid  = function(options){
		PhaserComponents.Display.Container.call(this, options);
		this.visModel = this.options.visModel;
		this.sizeModel = this.options.sizeModel;
		this.visModel.changeSignal.add(this.onChangeGrid, this);
		this.sizeModel.changeSignal.add(this.onChangeSize, this);
		this.setVisible(this.visModel.get() === 1);
		this.updateImage();
	};
	
	PhaserComponents.Utils.extends(Grid, PhaserComponents.Display.Container);
	
	Grid.prototype.onChangeGrid = function(value) {
		this.setVisible(value === 1);
	};

	Grid.prototype.onChangeSize = function(value) {
		this.updateImage();
	};

	Grid.prototype.getOffset = function() {
		var x0, y0, dx, dy, size, xNum, yNum, index;
		index = this.sizeModel.get();
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
		index = this.sizeModel.get();
		if(this.sprite){
			this.sprite.destroy(true);
			this.sprite = null;
		}
		offset = this.getOffset();
		asset = Assets.GRIDS[index];
		this.sprite = new Phaser.TileSprite(this.game, this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h, asset);
		this.sprite.tilePosition = new PIXI.Point(-offset.x, -offset.y);
		this.sprite.alpha = 0.15;
		this.group.add(this.sprite);
	};

	Grid.prototype.updateImage = function() {
		this.updateTile();
	};
	
	Grid.prototype.destroy = function() {
		this.visModel.changeSignal.remove(this.onChangeGrid, this);
		this.sizeModel.changeSignal.remove(this.onChangeSize, this);
		this.group.remove(this.sprite);
		this.sprite.destroy(true);
		PhaserComponents.Display.Container.prototype.destroy.call(this);
	};
	
	return Grid;

});
	
