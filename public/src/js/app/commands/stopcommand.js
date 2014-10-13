define(

	['app/models/modelconsts', 'phasercomponents'],

function(ModelConsts,  PhaserComponents) {
	
	"use strict";
	
	var StopCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(StopCommand, PhaserComponents.Commands.AbstractCommand);

	StopCommand.prototype.execute = function(){
		this.modelFacade.get(ModelConsts.COMMTICKER).stop();
	};
	
  	return StopCommand;
});

