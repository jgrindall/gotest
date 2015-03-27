define(

	['base/models/modelconsts', 'phasercomponents'],

function(ModelConsts, PhaserComponents) {
	
	"use strict";
	
	var ProgChangeCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(ProgChangeCommand, PhaserComponents.Commands.AbstractCommand);

	ProgChangeCommand.prototype.execute = function(data){
		this.modelFacade.get(ModelConsts.PROG_TYPE).set(data.value);
	};
	
  	return ProgChangeCommand;
});
