
define(['phasercomponents'],

function(PhaserComponents){
	
	"use strict";
	
	var StartPosModel  = function(){
		PhaserComponents.Model.AbstractModel.call(this);
		this.value = {'x':0.5, 'y':0.5};
	};
	
	PhaserComponents.Utils.extends(StartPosModel, PhaserComponents.Model.AbstractModel);

	return StartPosModel;

});
