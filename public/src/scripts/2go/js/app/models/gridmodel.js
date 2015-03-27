
define(['phasercomponents'],

function(PhaserComponents){
	
	"use strict";
	
	var GridModel  = function(){
		PhaserComponents.Model.ToggleModel.call(this);
	};
	
	PhaserComponents.Utils.extends(GridModel, PhaserComponents.Model.ToggleModel);
	
	return GridModel;

});
	
