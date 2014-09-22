
define(['phasercomponents', 'app/consts/penwidths'],

function(PhaserComponents, PenWidths){
	
	"use strict";
	
	var WidthModel  = function(){
		PhaserComponents.Model.IncrementModel.call(this, {"num":PenWidths.ALL.length});
	};
	
	PhaserComponents.Utils.extends(WidthModel, PhaserComponents.Model.IncrementModel);
	
	return WidthModel;

});
	
