
define(['phasercomponents',

	'app/assets', 'app/models/modelconsts', 'app/consts/penwidths'

],

function(PhaserComponents, 


 Assets, ModelConsts, PenWidths){
	
	"use strict";
	
	var WidthPicker  = function(options){
		options.num = PenWidths.ALL.length - 1;
		options.handle = Assets.WIDTHHANDLE;
		options.sliderbg = Assets.WIDTHBGS[0];
		options.handleSize = {'w':50, 'h':30};
		PhaserComponents.Display.VSlider.call(this, options);
		this.modelFacade.get(ModelConsts.COLOR).changeSignal.add(this.changeColor, this);
		this.changeColor();
	};

	WidthPicker.WIDTH = 50;
	WidthPicker.HEIGHT = 85;
	
	PhaserComponents.Utils.extends(WidthPicker, PhaserComponents.Display.VSlider);
	
	WidthPicker.prototype.loadTexture = function(){
		var value = this.modelFacade.get(ModelConsts.COLOR).get();
		if(value === null){
			this.setBackground(Assets.WIDTHBGS[0]);
		}
		else{
			this.setBackground(Assets.WIDTHBGS[value + 1]);
		}
		this.view.visible = (value !== null);
	};

	WidthPicker.prototype.changeColor = function(){
		this.loadTexture();
	};

	WidthPicker.prototype.destroy = function(){
		this.modelFacade.get(ModelConsts.COLOR).changeSignal.remove(this.changeColor, this);
		PhaserComponents.Display.VSlider.prototype.destroy.call(this);
	};

	return WidthPicker;
});
	
	
