
define(['phasercomponents',

	'base/assets', 'base/models/modelconsts', 'base/consts/penwidths'

],

function(PhaserComponents, 


 Assets, ModelConsts, PenWidths){
	
	"use strict";
	
	var WidthPicker2  = function(options){
		options.num = PenWidths.ALL.length - 1;
		options.handle = Assets.WIDTHHANDLE2;
		options.sliderbg = Assets.WIDTHBGS2[0];
		options.handleSize = {'w':32, 'h':38};
		PhaserComponents.Display.Slider.call(this, options);
		this.modelFacade.get(ModelConsts.COLOR).changeSignal.add(this.changeColor, this);
		this.changeColor();
	};

	WidthPicker2.WIDTH = 230;
	WidthPicker2.HEIGHT = 38;
	
	PhaserComponents.Utils.extends(WidthPicker2, PhaserComponents.Display.Slider);
	
	WidthPicker2.prototype.loadTexture = function(){
		var value = this.modelFacade.get(ModelConsts.COLOR).get();
		if(value === null){
			this.setBackground(Assets.WIDTHBGS2[0]);
		}
		else{
			this.setBackground(Assets.WIDTHBGS2[value + 1]);
		}
		this.view.visible = (value !== null);
	};

	WidthPicker2.prototype.changeColor = function(){
		this.loadTexture();
	};

	WidthPicker2.prototype.destroy = function(){
		this.modelFacade.get(ModelConsts.COLOR).changeSignal.remove(this.changeColor, this);
		PhaserComponents.Display.Slider.prototype.destroy.call(this);
	};

	return WidthPicker2;
});
	
	
