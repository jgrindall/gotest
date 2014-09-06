
define('app/models/gridmodel',['phasercomponents'],

function(PhaserComponents){
	
	"use strict";
	
	var GridModel  = function(){
		PhaserComponents.Model.AbstractModel.call(this);
	};
	
	GridModel.prototype = Object.create(PhaserComponents.Model.AbstractModel.prototype);
	GridModel.prototype.constructor = GridModel;
	
	GridModel.prototype.increment = function() {
		this.set(1 - this.get());
	};
	
	return GridModel;

});
	
