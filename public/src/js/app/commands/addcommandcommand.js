define('app/commands/addcommandcommand',[

	'app/events/events', 'phasercomponents',

	'app/models/modelfacade', 'app/logocommands/logocommandfactory'],

function(

	Events, PhaserComponents,

	ModelFacade, LogoCommandFactory) {
	
	"use strict";
	
	var AddCommandCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	AddCommandCommand.prototype = Object.create(PhaserComponents.Commands.AbstractCommand.prototype);
	AddCommandCommand.prototype.constructor = AddCommandCommand;

	AddCommandCommand.prototype.execute = function(data){
		var command;
		data.color = ModelFacade.getInstance().get(ModelFacade.COLOR).get();
		data.width = ModelFacade.getInstance().get(ModelFacade.WIDTH).get();
		data.diag = ModelFacade.getInstance().get(ModelFacade.DIAG).get();
		data.angle = ModelFacade.getInstance().get(ModelFacade.ANGLE).get();
		data.stepLength = ModelFacade.getInstance().get(ModelFacade.STEPLENGTH).get();
		command = LogoCommandFactory.fromJson(data);
		ModelFacade.getInstance().get(ModelFacade.COMM).add(command);
		this.eventDispatcher.trigger({"type":Events.DRAW});
	};
	
  	return AddCommandCommand;
});

