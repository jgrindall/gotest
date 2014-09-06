
define('app/models/speedmodel',['app/consts/commspeed',

'phasercomponents'],

function(CommSpeed,

PhaserComponents){
	
	"use strict";
	
	var SpeedModel  = function(){
		PhaserComponents.Model.AbstractModel.call(this);
	};
	
	SpeedModel.prototype = Object.create(PhaserComponents.Model.AbstractModel.prototype);
	SpeedModel.prototype.constructor = SpeedModel;
	
	return SpeedModel;

});
	

	
	