
define(['phasercomponents'],

function(PhaserComponents){
	
	"use strict";
	
	var GridModel  = function(){
		PhaserComponents.Model.AbstractModel.call(this);
	};
	
	PhaserComponents.Utils.extends(GridModel, PhaserComponents.Model.AbstractModel);
	
	GridModel.prototype.increment = function() {
		this.set(1 - this.get());
	};
	
	return GridModel;

});
	
