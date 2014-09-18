
define(['phasercomponents'],

function(PhaserComponents){
	
	"use strict";
	
	var ProgNumModel  = function(){
		PhaserComponents.Model.AbstractModel.call(this);
	};
	
	PhaserComponents.Utils.extends(ProgNumModel, PhaserComponents.Model.AbstractModel);

	ProgNumModel.prototype.increment = function() {
		var newValue = (this.get() + 1) % 4;
		this.set(newValue);
	};
	
	return ProgNumModel;

});
