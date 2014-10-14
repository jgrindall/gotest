define( ['phasercomponents'],

	function(PhaserComponents){

	"use strict";

	var DropView = function(options){
		options.numFrames = 3;
		PhaserComponents.Drag.AbstractDropView.call(this, options);
	};

	DropView.WIDTH = 			150;
	DropView.SMALL_WIDTH = 		80;
	DropView.HEIGHT = 			50;

	DropView.prototype = Object.create(PhaserComponents.Drag.AbstractDropView.prototype);
	DropView.prototype.constructor = DropView;

	DropView.prototype.highlight = function(show){
		PhaserComponents.Drag.AbstractDropView.prototype.highlight.call(this, show);
		var frame;
		if(show){
			frame = 1;
		}
		else{
			frame = 0;
		}
		this.goTo(frame);
	};

	DropView.prototype.color = function(show){
		PhaserComponents.Drag.AbstractDropView.prototype.color.call(this, show);
		var frame;
		if(show){
			frame = 2;
		}
		else{
			frame = 0;
		}
		this.goTo(frame);
	};

	return DropView;
});

