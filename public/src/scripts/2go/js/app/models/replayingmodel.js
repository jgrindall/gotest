
define(['phasercomponents'],

function(PhaserComponents){
	
	"use strict";
	
	var ReplayingModel  = function(){
		PhaserComponents.Model.AbstractModel.call(this);
		this.value = false;
	};
	
	PhaserComponents.Utils.extends(ReplayingModel, PhaserComponents.Model.AbstractModel);

	return ReplayingModel;

});