
define(['phasercomponents'],

function(PhaserComponents){
	
	"use strict";
	
	var BgPngModel  = function(){
		PhaserComponents.Model.AbstractModel.call(this);
	};
	
	PhaserComponents.Utils.extends(BgPngModel, PhaserComponents.Model.AbstractModel);

	return BgPngModel;

});
