
define('app/models/steplengthmodel',['phasercomponents'],

function(PhaserComponents){
	
	"use strict";
	
	var StepLengthModel  = function(){
		PhaserComponents.AbstractModel.call(this);
		this.stepLength = 0;
	};
	
	StepLengthModel.prototype = Object.create(PhaserComponents.AbstractModel.prototype);
	StepLengthModel.prototype.constructor = StepLengthModel;
	
	StepLengthModel.prototype.getData = function(){
		return {"index":this.stepLength};
	};
	
	StepLengthModel.prototype.setData = function(n) {
		this.setStepLength(n);
	};
	
	StepLengthModel.prototype.setStepLength = function(i) {
		if(this.stepLength !== i){
			this.stepLength = i;
			this.trigger();
		}
	};
	
	return StepLengthModel;

});
	
