define([

	'app/events/events', 'phasercomponents',

	'app/models/modelfacade', 'app/logocommands/logocommandfactory'],

function(

	Events, PhaserComponents,

	ModelFacade, LogoCommandFactory) {
	
	"use strict";
	
	var AddCommandCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(AddCommandCommand, PhaserComponents.Commands.AbstractCommand);

	AddCommandCommand.prototype.execute = function(data){
		var command;
		data.color = this.modelFacade.get(ModelFacade.COLOR).get();
		data.width = this.modelFacade.get(ModelFacade.WIDTH).get();
		data.diag = this.modelFacade.get(ModelFacade.DIAG).get();
		data.angle = this.modelFacade.get(ModelFacade.ANGLE).get();
		data.stepLength = this.modelFacade.get(ModelFacade.STEPLENGTH).get();
		command = LogoCommandFactory.fromJson(data);
		this.modelFacade.get(ModelFacade.COMM).add(command);
		this.eventDispatcher.trigger({"type":Events.DRAW});
	};
	
  	return AddCommandCommand;
});

