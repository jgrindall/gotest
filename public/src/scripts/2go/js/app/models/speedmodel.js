
define(['phasercomponents'],

function(PhaserComponents){
	
	"use strict";
	
	var SpeedModel  = function(){
		PhaserComponents.Model.AbstractModel.call(this);
	};
	
	PhaserComponents.Utils.extends(SpeedModel, PhaserComponents.Model.AbstractModel);

	SpeedModel.prototype.set = function(val, options) {
		if(val < 2){
			val = 2;
		}
		PhaserComponents.Model.AbstractModel.prototype.set.call(this, val, options);
	};

	
	return SpeedModel;

});
	

	
	