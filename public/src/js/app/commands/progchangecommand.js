define(

	['app/models/modelfacade', 'phasercomponents'],

function(ModelFacade, PhaserComponents) {
	
	"use strict";
	
	var ProgChangeCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(ProgChangeCommand, PhaserComponents.Commands.AbstractCommand);

	ProgChangeCommand.prototype.execute = function(data){
		this.modelFacade.get(ModelFacade.PROG_TYPE).set(data.value);
	};
	
  	return ProgChangeCommand;
});
