define(['phasercomponents'], function(PhaserComponents){
	
	"use strict";

	var AbstractDragView = function(options){
		PhaserComponents.Drag.AbstractDragView.call(this, options);
	};

	PhaserComponents.Utils.extends(AbstractDragView, PhaserComponents.Drag.AbstractDragView);

	AbstractDragView.prototype.toJson = function(){
		return {"type":this.options.type, "index":this.options.index};
	};

	AbstractDragView.prototype.create = function(){
		this.sprite = new Phaser.Sprite(this.game, this.bounds.x, this.bounds.y, this.options.asset);
		PhaserComponents.Drag.AbstractDragView.prototype.create.call(this);
	};

	return AbstractDragView;

});

