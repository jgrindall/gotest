
define(['phasercomponents'],

function(PhaserComponents){
	
	"use strict";
	
	var ColorModel  = function(){
		this.name = "colorModel";
		PhaserComponents.Model.AbstractModel.call(this);
	};
	
	PhaserComponents.Utils.extends(ColorModel, PhaserComponents.Model.AbstractModel);

	return ColorModel;

});
