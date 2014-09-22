
define(['phasercomponents'],

function(PhaserComponents){
	
	"use strict";
	
	var ProgNumModel  = function(){
		PhaserComponents.Model.IncrementModel.call(this, {"num":4});
	};
	
	PhaserComponents.Utils.extends(ProgNumModel, PhaserComponents.Model.IncrementModel);
	
	return ProgNumModel;

});
