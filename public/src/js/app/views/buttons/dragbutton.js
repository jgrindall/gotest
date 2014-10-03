
define([ 'phasercomponents', 'app/assets'],

function(PhaserComponents, Assets){
	
	"use strict";
	
	var DragButton = function(options){
		var frame0, index = options.index;
		options.asset = Assets.DRAG_ARROW;
		if(options.turn && index === 3){
			index = 9;
		}
		else if(options.turn && index === 5){
			index = 10;
		}
		frame0 = options.type * 11 + index;
   		options.frames = [frame0, frame0 , frame0 , frame0];
		PhaserComponents.Display.AbstractButton.call(this, options);
	};

	DragButton.WIDTH = 32;
	DragButton.HEIGHT = 32;

	PhaserComponents.Utils.extends(DragButton, PhaserComponents.Display.AbstractButton);

	return DragButton;

});


