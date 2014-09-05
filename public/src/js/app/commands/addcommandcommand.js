define('app/commands/addcommandcommand',[

	'app/events/events', 'phasercomponents',

	'app/models/modelfacade', 'app/logocommands/logocommandfactory'],

function(

	Events, PhaserComponents,

	ModelFacade, LogoCommandFactory) {
	
	"use strict";
	
	var AddCommandCommand = function(){
		PhaserComponents.AbstractCommand.call(this);
	};
	
	AddCommandCommand.prototype = Object.create(PhaserComponents.AbstractCommand.prototype);
	AddCommandCommand.prototype.constructor = AddCommandCommand;

	AddCommandCommand.prototype.execute = function(data){
		var command;
		data.color = ModelFacade.getInstance().get(ModelFacade.COLOR).getData().index;
		data.width = ModelFacade.getInstance().get(ModelFacade.WIDTH).getData().index;
		data.diag = ModelFacade.getInstance().get(ModelFacade.DIAG).getData().index;
		data.angle = ModelFacade.getInstance().get(ModelFacade.ANGLE).getData().index;
		data.stepLength = ModelFacade.getInstance().get(ModelFacade.STEPLENGTH).getData().index;
		command = LogoCommandFactory.fromJson(data);
		ModelFacade.getInstance().get(ModelFacade.COMM).add(command);
		this.eventDispatcher.trigger({"type":Events.DRAW});
	};
	
  	return AddCommandCommand;
});

