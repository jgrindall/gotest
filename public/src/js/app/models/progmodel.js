
define(['phasercomponents'],

function(PhaserComponents){
	
	"use strict";
	
	var ProgModel  = function(){
		PhaserComponents.Model.AbstractModel.call(this);
	};
	
	PhaserComponents.Utils.extends(ProgModel, PhaserComponents.Model.AbstractModel);
	
	return ProgModel;

});
