
define(['phasercomponents'],

function(PhaserComponents){
	
	"use strict";
	
	var AllowProgModel  = function(){
		PhaserComponents.Model.ToggleModel.call(this);
	};
	
	PhaserComponents.Utils.extends(AllowProgModel, PhaserComponents.Model.ToggleModel);
	
	return AllowProgModel;

});
