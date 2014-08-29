
define(['app/consts/commspeed',

'app/models/abstractmodel'],

function(CommSpeed,

AbstractModel){
	
	"use strict";
	
	var SpeedModel  = function(){
		AbstractModel.call(this);
		this.speed = CommSpeed.VSLOW;
	};
	
	SpeedModel.prototype = Object.create(AbstractModel.prototype);
	SpeedModel.prototype.constructor = SpeedModel;
	
	SpeedModel.prototype.getData = function() {
		return {"speed":this.speed, "actualSpeed":CommSpeed.ALL[this.speed]};
	};
	
	SpeedModel.prototype.setData = function(n) {
		this.setSpeed(n);
	};
	
	SpeedModel.prototype.setSpeed = function(s) {
		if(this.speed !== s){
			this.speed = s;
			this.trigger();
		}
	};
	
	return new SpeedModel();

});
	

	
	