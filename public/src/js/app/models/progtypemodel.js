
define(['phasercomponents'],

function(PhaserComponents){
	
	"use strict";
	
	var ProgTypeModel  = function(){
		PhaserComponents.Model.AbstractModel.call(this);
	};
	
	PhaserComponents.Utils.extends(ProgTypeModel, PhaserComponents.Model.AbstractModel);

	return ProgTypeModel;

});
