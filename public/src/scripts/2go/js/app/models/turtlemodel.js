
define(['phasercomponents'],

function(PhaserComponents){
	
	"use strict";
	
	var TurtleModel  = function(){
		PhaserComponents.Model.AbstractModel.call(this);
	};
	
	PhaserComponents.Utils.extends(TurtleModel, PhaserComponents.Model.AbstractModel);
	
	return TurtleModel;

});
	
