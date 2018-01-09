
define(['phasercomponents'],

function(PhaserComponents){
	
	"use strict";
	
	var GridModel  = function(){
		PhaserComponents.Model.ToggleModel.call(this);
	};
	
	PhaserComponents.Utils.extends(GridModel, PhaserComponents.Model.ToggleModel);

	GridModel.prototype.set = function(val){
		PhaserComponents.Model.ToggleModel.prototype.set.call(this, 0);
	};
	
	return GridModel;

});
	
