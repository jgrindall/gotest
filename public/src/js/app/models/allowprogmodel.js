
define(['phasercomponents'],

function(PhaserComponents){
	
	"use strict";
	
	var AllowProgModel  = function(){
		PhaserComponents.Model.AbstractModel.call(this);
	};
	
	PhaserComponents.Utils.extends(AllowProgModel, PhaserComponents.Model.AbstractModel);

	AllowProgModel.prototype.increment = function() {
		this.set(1 - this.get());
	};
	
	return AllowProgModel;

});
