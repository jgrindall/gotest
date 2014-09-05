
define('app/models/gridmodel',['phasercomponents'],

function(PhaserComponents){
	
	"use strict";
	
	var GridModel  = function(){
		PhaserComponents.AbstractModel.call(this);
		this.index = 0;
	};
	
	GridModel.prototype = Object.create(PhaserComponents.AbstractModel.prototype);
	GridModel.prototype.constructor = GridModel;
	
	GridModel.prototype.getData = function(){
		return {"index":this.index};
	};
	
	GridModel.prototype.increment = function() {
		this.setData(1 - this.index);
	};

	GridModel.prototype.setData = function(s) {
		this.setOn(s);
	};
	
	GridModel.prototype.setOn = function(i) {
		if(this.index !== i){
			this.index = i;
			this.trigger();
		}
	};
	
	return GridModel;

});
	
