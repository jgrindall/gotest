
define(['phasercomponents'

],

function(PhaserComponents){
	
	"use strict";
	
	var ColorPicker  = function(options){
		this.name = "colorPicker";
		PhaserComponents.Display.MultiButton.call(this, options);
	};

	ColorPicker.WIDTH = 235;
	ColorPicker.HEIGHT = 110;
	
	PhaserComponents.Utils.extends(ColorPicker, PhaserComponents.Display.MultiButton);

	ColorPicker.prototype.setFrame = function(frame, options){
		var currentVal;
		currentVal = this.model.get();
		if(currentVal !== null && currentVal === frame){
			frame = null;
		}
		PhaserComponents.Display.MultiButton.prototype.setFrame.call(this, frame, options);
	};

	ColorPicker.prototype.goTo = function(i){
		if(i === null || i === undefined){
			i = 0;
		}
		else{
			i++;
		}
		this.sprite.animations.play('frame'+ i);
	};

	return ColorPicker;
});
	
	
