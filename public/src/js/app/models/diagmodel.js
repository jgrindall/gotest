
define('app/models/diagmodel',['phasercomponents'],

function(PhaserComponents){
	
	"use strict";
	
	var DiagModel  = function(){
		PhaserComponents.AbstractModel.call(this);
		this.index = 0;
	};
	
	DiagModel.prototype = Object.create(PhaserComponents.AbstractModel.prototype);
	DiagModel.prototype.constructor = DiagModel;
	
	DiagModel.prototype.getData = function(){
		return {"index":this.index};
	};
	
	DiagModel.prototype.increment = function() {
		this.setData(1 - this.index);
	};

	DiagModel.prototype.setData = function(s) {
		this.setOn(s);
	};
	
	DiagModel.prototype.setOn = function(i) {
		if(this.index !== i){
			this.index = i;
			this.trigger();
		}
	};
	
	return DiagModel;

});
	
