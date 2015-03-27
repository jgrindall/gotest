
define(['phasercomponents'],

function(PhaserComponents){
	
	"use strict";
	
	var DiagModel  = function(){
		PhaserComponents.Model.ToggleModel.call(this);
	};
	
	PhaserComponents.Utils.extends(DiagModel, PhaserComponents.Model.ToggleModel);

	return DiagModel;

});
	
