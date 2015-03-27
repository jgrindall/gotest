
define(['phasercomponents'],

function(PhaserComponents){
	
	"use strict";
	
	var SelectedCommModel  = function(){
		PhaserComponents.Model.AbstractModel.call(this);
		this.reset();
	};
	
	PhaserComponents.Utils.extends(SelectedCommModel, PhaserComponents.Model.AbstractModel);

	SelectedCommModel.prototype.reset = function(){
		this.value = 4;
	};

	return SelectedCommModel;

});
