
define('app/models/anglemodel',['phasercomponents'],

function(PhaserComponents){
	
	"use strict";
	
	var AngleModel  = function(){
		PhaserComponents.AbstractModel.call(this);
		this.index = 0;
	};
	
	AngleModel.prototype = Object.create(PhaserComponents.AbstractModel.prototype);
	AngleModel.prototype.constructor = AngleModel;
	
	AngleModel.prototype.getData = function(){
		return {"index":this.index};
	};
	
	AngleModel.prototype.increment = function() {
		this.setData(1 - this.index);
	};

	AngleModel.prototype.setData = function(s) {
		this.set45(s);
	};
	
	AngleModel.prototype.set45 = function(i) {
		if(this.index !== i){
			this.index = i;
			this.trigger();
		}
	};
	
	return AngleModel;

});
	
