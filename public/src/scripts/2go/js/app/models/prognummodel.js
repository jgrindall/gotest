
define(['phasercomponents'],

function(PhaserComponents){
	
	"use strict";
	
	var ProgNumModel  = function(){
		PhaserComponents.Model.IncrementModel.call(this, {"num":9});
	};
	
	PhaserComponents.Utils.extends(ProgNumModel, PhaserComponents.Model.IncrementModel);
	
	return ProgNumModel;

});
