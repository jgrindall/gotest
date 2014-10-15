define([

	'app/events/events', 'phasercomponents',

	'app/models/modelconsts', 'app/logocommands/logocommandfactory'],

function(

	Events, PhaserComponents,

	ModelConsts, LogoCommandFactory) {
	
	"use strict";
	
	var AddCommandCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(AddCommandCommand, PhaserComponents.Commands.AbstractCommand);

	AddCommandCommand.prototype.execute = function(data){
		var command;
		data.color = 				this.modelFacade.get(ModelConsts.COLOR).get();
		data.width = 				this.modelFacade.get(ModelConsts.WIDTH).get();
		data.diag = 				this.modelFacade.get(ModelConsts.DIAG).get();
		data.angle = 				this.modelFacade.get(ModelConsts.ANGLE).get();
		data.stepLength = 			this.modelFacade.get(ModelConsts.STEPLENGTH).get();
		command = LogoCommandFactory.fromJson(data);
		this.modelFacade.get(ModelConsts.COMM).add(command);
		this.eventDispatcher.trigger({"type":Events.DRAW});
	};
	
  	return AddCommandCommand;
});

