
define(['phasercomponents'],

function(PhaserComponents){
	
	"use strict";
	
	var ColorModel  = function(){
		PhaserComponents.Model.AbstractModel.call(this);
	};
	
	PhaserComponents.Utils.extends(ColorModel, PhaserComponents.Model.AbstractModel);

	ColorModel.prototype.set = function(val) {
		var currentVal = this.value;
		if(val === currentVal){
			PhaserComponents.Model.AbstractModel.prototype.set.call(this, null);
		}
		else{
			PhaserComponents.Model.AbstractModel.prototype.set.call(this, val);
		}
	};

	return ColorModel;

});
	
