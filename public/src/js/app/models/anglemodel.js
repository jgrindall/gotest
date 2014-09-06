
define('app/models/anglemodel',['phasercomponents'],

function(PhaserComponents){
	
	"use strict";
	
	var AngleModel  = function(){
		PhaserComponents.Model.AbstractModel.call(this);
	};
	
	AngleModel.prototype = Object.create(PhaserComponents.Model.AbstractModel.prototype);
	AngleModel.prototype.constructor = AngleModel;
	
	AngleModel.prototype.increment = function() {
		//TODO - should be toggle??
		this.set(1 - this.get());
	};
	
	return AngleModel;

});
	
