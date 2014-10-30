
define(['phasercomponents',

	'app/assets', 'app/models/modelconsts'

],

function(PhaserComponents, 


 Assets, ModelConsts){
	
	"use strict";
	
	var WidthPicker  = function(options){
		this.name = "widthPicker";
		options.num = Assets.WIDTHS.length;
		PhaserComponents.Display.VStepperButton.call(this, options);
		this.modelFacade.get(ModelConsts.COLOR).changeSignal.add(this.changeColor, this);
		this.init();
	};

	WidthPicker.WIDTH = 50;
	WidthPicker.HEIGHT = 85;
	
	PhaserComponents.Utils.extends(WidthPicker, PhaserComponents.Display.VStepperButton);
	
	WidthPicker.prototype.init = function(){
		this.load();
		PhaserComponents.Display.VStepperButton.prototype.init.call(this);

	};

	WidthPicker.prototype.load = function(){
		var value = this.modelFacade.get(ModelConsts.COLOR).get();
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
		this.modelFacade.get(ModelConsts.COLOR).changeSignal.remove(this.changeColor, this);
		PhaserComponents.Display.VStepperButton.prototype.destroy.call(this);
	};

	return WidthPicker;
});
	
	
