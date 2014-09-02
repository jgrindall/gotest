
define('app/models/speedmodel',['app/consts/commspeed',

'app/models/abstractmodel'],

function(CommSpeed,

AbstractModel){
	
	"use strict";
	
	var SpeedModel  = function(){
		AbstractModel.call(this);
		this.index = CommSpeed.VSLOW;
	};
	
	SpeedModel.prototype = Object.create(AbstractModel.prototype);
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
	
	return new SpeedModel();

});
	

	
	