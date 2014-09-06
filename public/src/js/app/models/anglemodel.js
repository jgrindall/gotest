
define('app/models/anglemodel',['phasercomponents'],

function(PhaserComponents){
	
	"use strict";
	
	var AngleModel  = function(){
		PhaserComponents.Model.AbstractModel.call(this);
	};
	
	PhaserComponents.Utils.extends(AngleModel, PhaserComponents.Model.AbstractModel);

	AngleModel.prototype.increment = function() {
		//TODO - should be toggle??
		this.set(1 - this.get());
	};
	
	return AngleModel;

});
	
