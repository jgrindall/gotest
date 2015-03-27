
define(['phasercomponents'],

function(PhaserComponents){
	
	"use strict";
	
	var UnusedProgModel  = function(){
		PhaserComponents.Model.AbstractModel.call(this);
	};
	
	PhaserComponents.Utils.extends(UnusedProgModel, PhaserComponents.Model.AbstractModel);
	
	return UnusedProgModel;

});
