
define('app/models/colormodel',['phasercomponents'],

function(PhaserComponents){
	
	"use strict";
	
	var ColorModel  = function(){
		PhaserComponents.AbstractModel.call(this);
		this.color = 0;
	};
	
	ColorModel.prototype = Object.create(PhaserComponents.AbstractModel.prototype);
	ColorModel.prototype.constructor = ColorModel;
	
	ColorModel.prototype.getData = function(){
		return {"index":this.color};
	};
	
	ColorModel.prototype.setData = function(n) {
		this.setColor(n);
	};
	
	ColorModel.prototype.setColor = function(i) {
		if(this.color !== i){
			this.color = i;
			this.trigger();
		}
	};
	
	return ColorModel;

});
	
