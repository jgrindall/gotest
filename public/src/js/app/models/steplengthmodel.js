
define('app/models/steplengthmodel',['phasercomponents'],

function(PhaserComponents){
	
	"use strict";
	
	var StepLengthModel  = function(){
		PhaserComponents.Model.AbstractModel.call(this);
	};
	
	PhaserComponents.Utils.extends(StepLengthModel, PhaserComponents.Model.AbstractModel);

	
	return StepLengthModel;

});
	
