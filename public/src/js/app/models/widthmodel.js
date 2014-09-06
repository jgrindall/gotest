
define('app/models/widthmodel',['phasercomponents', 'app/consts/penwidths'],

function(PhaserComponents, PenWidths){
	
	"use strict";
	
	var WidthModel  = function(){
		PhaserComponents.Model.AbstractModel.call(this);
	};
	
	PhaserComponents.Utils.extends(WidthModel, PhaserComponents.Model.AbstractModel);

	WidthModel.prototype.increment = function() {
		var newValue = (this.get() + 1) % PenWidths.ALL.length;
		this.set(newValue);
	};

	return WidthModel;

});
	
