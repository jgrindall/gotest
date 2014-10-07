
define(['phasercomponents', 'app/models/modelfacade', 'app/assets'

],

function(PhaserComponents, ModelFacade, Assets){
	
	"use strict";
	
	var WidthPicker  = function(options){
		this.name = "widthPicker";
		options.num = Assets.WIDTHS.length;
		PhaserComponents.Display.StepperButton.call(this, options);
		this.modelFacade.get(ModelFacade.COLOR).changeSignal.add(this.changeColor, this);
		this.init();
	};

	WidthPicker.WIDTH = 50;
	WidthPicker.HEIGHT = 85;
	
	PhaserComponents.Utils.extends(WidthPicker, PhaserComponents.Display.StepperButton);
	
	WidthPicker.prototype.init = function(){
		this.load();
		PhaserComponents.Display.StepperButton.prototype.init.call(this);
	};

	WidthPicker.prototype.load = function(){
		var value = this.modelFacade.get(ModelFacade.COLOR).get();
		if(value === null){
			this.loadTexture(Assets.WIDTHS[0]);
		}
		else{
			this.loadTexture(Assets.WIDTHS[value + 1]);
		}
	};

	WidthPicker.prototype.changeColor = function(){
		this.init();
	};

	WidthPicker.prototype.destroy = function(){
		this.modelFacade.get(ModelFacade.COLOR).changeSignal.remove(this.changeColor, this);
		PhaserComponents.Display.StepperButton.prototype.destroy.call(this);
	};

	return WidthPicker;
});
	
	
