
define('app/models/steplengthmodel',['phasercomponents'],

function(PhaserComponents){
	
	"use strict";
	
	var StepLengthModel  = function(){
		PhaserComponents.Model.AbstractModel.call(this);
	};
	
	StepLengthModel.prototype = Object.create(PhaserComponents.Model.AbstractModel.prototype);
	StepLengthModel.prototype.constructor = StepLengthModel;
	
	return StepLengthModel;

});
	
