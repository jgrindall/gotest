
define('app/models/steplengthmodel',['phasercomponents/models/abstractmodel'],

function(AbstractModel){
	
	"use strict";
	
	var StepLengthModel  = function(){
		AbstractModel.call(this);
		this.stepLength = 0;
	};
	
	StepLengthModel.prototype = Object.create(AbstractModel.prototype);
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
	
	return new StepLengthModel();

});
	
