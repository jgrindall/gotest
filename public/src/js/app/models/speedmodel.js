
define('app/models/speedmodel',['app/consts/commspeed',

'phasercomponents'],

function(CommSpeed,

PhaserComponents){
	
	"use strict";
	
	var SpeedModel  = function(){
		PhaserComponents.AbstractModel.call(this);
		this.index = CommSpeed.VSLOW;
	};
	
	SpeedModel.prototype = Object.create(PhaserComponents.AbstractModel.prototype);
	SpeedModel.prototype.constructor = SpeedModel;
	
	SpeedModel.prototype.getData = function() {
		return {"index":this.index, "actualSpeed":CommSpeed.ALL[this.index]};
	};
	
	SpeedModel.prototype.setData = function(n) {
		this.setSpeed(n);
	};
	
	SpeedModel.prototype.setSpeed = function(s) {
		if(this.index !== s){
			this.index = s;
			this.trigger();
		}
	};
	
	return SpeedModel;

});
	

	
	