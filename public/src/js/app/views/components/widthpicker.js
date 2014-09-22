
define(['phasercomponents', 'app/models/modelfacade', 'app/assets'

],

function(PhaserComponents, ModelFacade, Assets){
	
	"use strict";
	
	var WidthPicker  = function(options){
		options.num = Assets.WIDTHS.length;
		PhaserComponents.Display.StepperButton.call(this, options);
		ModelFacade.getInstance().get(ModelFacade.COLOR).changeSignal.add(this.changeColor, this);
	};

	WidthPicker.WIDTH = 50;
	WidthPicker.HEIGHT = 85;
	
	PhaserComponents.Utils.extends(WidthPicker, PhaserComponents.Display.StepperButton);
	
	WidthPicker.prototype.changeColor = function(value){
		if(value === null){
			this.loadTexture(Assets.WIDTHS[0]);
		}
		else{
			this.loadTexture(Assets.WIDTHS[value + 1]);
		}
		
	};

	return WidthPicker;
});
	
	
