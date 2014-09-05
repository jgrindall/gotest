
define('app/models/widthmodel',['phasercomponents', 'app/consts/penwidths'],

function(PhaserComponents, PenWidths){
	
	"use strict";
	
	var WidthModel  = function(){
		PhaserComponents.AbstractModel.call(this);
		this.index = 0;
	};
	
	WidthModel.prototype = Object.create(PhaserComponents.AbstractModel.prototype);
	WidthModel.prototype.constructor = WidthModel;
	
	WidthModel.prototype.getData = function(){
		return {"index":this.index};
	};
	
	WidthModel.prototype.increment = function() {
		var newWidth = (this.index + 1) % PenWidths.ALL.length;
		this.setData(newWidth);
	};

	WidthModel.prototype.setData = function(n) {
		this.setWidth(n);
	};
	
	WidthModel.prototype.setWidth = function(i) {
		if(this.index !== i){
			this.index = i;
			this.trigger();
		}
	};
	
	return WidthModel;

});
	
