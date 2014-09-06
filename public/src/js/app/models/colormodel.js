
define('app/models/colormodel',['phasercomponents'],

function(PhaserComponents){
	
	"use strict";
	
	var ColorModel  = function(){
		PhaserComponents.Model.AbstractModel.call(this);
	};
	
	PhaserComponents.Utils.extends(ColorModel, PhaserComponents.Model.AbstractModel);

	return ColorModel;

});
	
