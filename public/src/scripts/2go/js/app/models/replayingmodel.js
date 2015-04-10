
define(['phasercomponents'],

function(PhaserComponents){
	
	"use strict";
	
	var ReplayingModel  = function(){
		PhaserComponents.Model.AbstractModel.call(this);
		this.value = true;
	};
	
	PhaserComponents.Utils.extends(ReplayingModel, PhaserComponents.Model.AbstractModel);

	return ReplayingModel;

});