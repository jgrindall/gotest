
define('app/models/diagmodel',['phasercomponents'],

function(PhaserComponents){
	
	"use strict";
	
	var DiagModel  = function(){
		PhaserComponents.Model.AbstractModel.call(this);
	};
	
	DiagModel.prototype = Object.create(PhaserComponents.Model.AbstractModel.prototype);
	DiagModel.prototype.constructor = DiagModel;
	
	DiagModel.prototype.increment = function() {
		this.set(1 - this.get());
	};

	return DiagModel;

});
	
