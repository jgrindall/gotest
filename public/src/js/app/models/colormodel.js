
define('app/models/colormodel',['phasercomponents/models/abstractmodel'],

function(AbstractModel){
	
	"use strict";
	
	var ColorModel  = function(){
		AbstractModel.call(this);
		this.color = 0;
	};
	
	ColorModel.prototype = Object.create(AbstractModel.prototype);
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
	
	return new ColorModel();

});
	
