
define('app/models/scalemodel',['app/models/abstractmodel'],

function(AbstractModel){
	
	"use strict";
	
	var ScaleModel  = function(){
		AbstractModel.call(this);
		this.scale = false;
	};
	
	ScaleModel.prototype = Object.create(AbstractModel.prototype);
	ScaleModel.prototype.constructor = ScaleModel;
	
	ScaleModel.prototype.getData = function(){
		return {"scale":this.scale};
	};
	
	ScaleModel.prototype.setData = function(s) {
		this.setScale(s);
	};
	
	ScaleModel.prototype.setScale = function(i) {
		if(this.scale !== i){
			this.scale = i;
			this.trigger();
		}
	};
	
	return new ScaleModel();

});
	
