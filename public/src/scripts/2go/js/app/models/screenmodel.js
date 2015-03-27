
define(['phasercomponents'],

function(PhaserComponents){
	
	"use strict";
	
	var ScreenModel  = function(){
		PhaserComponents.Model.AbstractModel.call(this);
	};
	
	PhaserComponents.Utils.extends(ScreenModel, PhaserComponents.Model.AbstractModel);

	return ScreenModel;

});
