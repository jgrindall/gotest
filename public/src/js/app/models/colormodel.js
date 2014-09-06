
define('app/models/colormodel',['phasercomponents'],

function(PhaserComponents){
	
	"use strict";
	
	var ColorModel  = function(){
		PhaserComponents.Model.AbstractModel.call(this);
	};
	
	ColorModel.prototype = Object.create(PhaserComponents.Model.AbstractModel.prototype);
	ColorModel.prototype.constructor = ColorModel;
	
	return ColorModel;

});
	
