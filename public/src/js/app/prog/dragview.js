define('app/prog/dragview', ['phasercomponents'], function(PhaserComponents){
	
	"use strict";

	var DragView = function(game, options){
		PhaserComponents.Drag.AbstractDragView.call(this, game, options);
	};

	DragView.prototype = Object.create(PhaserComponents.Drag.AbstractDragView.prototype);
	DragView.prototype.constructor = DragView;

	DragView.prototype.toJson = function(){
		return {"type":this.options.type, "index":this.options.index};
	};

	DragView.prototype.create = function(){
		this.sprite = new Phaser.Sprite(this.game, this.options.bounds.x, this.options.bounds.y, this.options.asset);
		PhaserComponents.Drag.AbstractDragView.prototype.create.call(this);
	};

	return DragView;

});

