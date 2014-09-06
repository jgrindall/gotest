
define('app/models/widthmodel',['phasercomponents', 'app/consts/penwidths'],

function(PhaserComponents, PenWidths){
	
	"use strict";
	
	var WidthModel  = function(){
		PhaserComponents.Model.AbstractModel.call(this);
	};
	
	WidthModel.prototype = Object.create(PhaserComponents.Model.AbstractModel.prototype);
	WidthModel.prototype.constructor = WidthModel;
	
	WidthModel.prototype.increment = function() {
		var newValue = (this.get() + 1) % PenWidths.ALL.length;
		this.set(newValue)
	};

	return WidthModel;

});
	
