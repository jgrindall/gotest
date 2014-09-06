
define('app/models/diagmodel',['phasercomponents'],

function(PhaserComponents){
	
	"use strict";
	
	var DiagModel  = function(){
		PhaserComponents.Model.AbstractModel.call(this);
	};
	
	PhaserComponents.Utils.extends(DiagModel, PhaserComponents.Model.AbstractModel);
	
	DiagModel.prototype.increment = function() {
		this.set(1 - this.get());
	};

	return DiagModel;

});
	
