
define('app/models/speedmodel',['phasercomponents'],

function(PhaserComponents){
	
	"use strict";
	
	var SpeedModel  = function(){
		PhaserComponents.Model.AbstractModel.call(this);
	};
	
	PhaserComponents.Utils.extends(SpeedModel, PhaserComponents.Model.AbstractModel);

	
	return SpeedModel;

});
	

	
	