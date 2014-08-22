
define(['app/game', 'app/scenes/activity/commspeed',

'app/scenes/activity/abstractmodel'],

function(Game, CommSpeed,

AbstractModel){
	
	"use strict";
	
	var SpeedModel  = function(){
		this.speed = CommSpeed.VFAST;
	};
	
	SpeedModel.prototype = Object.create(AbstractModel.prototype);
	SpeedModel.prototype.constructor = SpeedModel;
	
	SpeedModel.prototype.getData = function() {
		return {"speed":this.speed};
	};
	
	SpeedModel.prototype.setSpeed = function(s) {
		if(this.speed !== i){
			this.speed = s;
			this.trigger();
		}
	};
	
	return new SpeedModel();

});
	

	
	