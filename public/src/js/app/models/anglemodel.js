
define(['phasercomponents'],

function(PhaserComponents){
	
	"use strict";
	
	var AngleModel  = function(){
		PhaserComponents.Model.ToggleModel.call(this);
	};
	
	PhaserComponents.Utils.extends(AngleModel, PhaserComponents.Model.ToggleModel);
	
	return AngleModel;

});
	
