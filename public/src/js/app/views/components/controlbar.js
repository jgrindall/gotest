
define(['phasercomponents'],

function(PhaserComponents){
	
	"use strict";
	
	var ControlBar  = function(options){
		PhaserComponents.Display.TabButtonBar.call(this, options);
	};

	ControlBar.WIDTH = 280;
	ControlBar.HEIGHT = 50;
	
	PhaserComponents.Utils.extends(ControlBar, PhaserComponents.Display.TabButtonBar);

	return ControlBar;
});
	
	
