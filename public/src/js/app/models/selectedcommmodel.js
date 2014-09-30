
define(['phasercomponents'],

function(PhaserComponents){
	
	"use strict";
	
	var SelectedCommModel  = function(){
		PhaserComponents.Model.AbstractModel.call(this);
		this.value = 4;
	};
	
	PhaserComponents.Utils.extends(SelectedCommModel, PhaserComponents.Model.AbstractModel);

	return SelectedCommModel;

});
