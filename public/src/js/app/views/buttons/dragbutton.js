
define('app/views/buttons/dragbutton',[ 'phasercomponents', 'app/assets'],

function(PhaserComponents, Assets){
	
	"use strict";
	
	var DragButton = function(options){
		var frame0;
		options.asset = Assets.DRAG_BUTTON;
		frame0 = options.type * 10 + options.index;
   		options.frames = [frame0, frame0 , frame0 , frame0];
		PhaserComponents.Display.AbstractButton.call(this, options);
	};

	DragButton.WIDTH = 32;
	DragButton.HEIGHT = 32;

	PhaserComponents.Utils.extends(DragButton, PhaserComponents.Display.AbstractButton);

	return DragButton;

});


