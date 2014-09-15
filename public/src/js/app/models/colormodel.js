
define(['phasercomponents'],

function(PhaserComponents){
	
	"use strict";
	
	var ColorModel  = function(){
		PhaserComponents.Model.AbstractModel.call(this);
	};
	
	PhaserComponents.Utils.extends(ColorModel, PhaserComponents.Model.AbstractModel);

	ColorModel.prototype.set = function(val, options) {
		var currentVal = this.value, force = false;
		if(options && options.force){
			force = true;
		}
		if(!force && val === currentVal){
			PhaserComponents.Model.AbstractModel.prototype.set.call(this, null);
		}
		else{
			PhaserComponents.Model.AbstractModel.prototype.set.call(this, val);
		}
	};

	return ColorModel;

});
