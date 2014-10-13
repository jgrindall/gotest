
define(['phasercomponents'],

function(PhaserComponents){
	
	"use strict";
	
	var TurtlePngModel  = function(){
		PhaserComponents.Model.AbstractModel.call(this);
	};
	
	PhaserComponents.Utils.extends(TurtlePngModel, PhaserComponents.Model.AbstractModel);

	return TurtlePngModel;

});
