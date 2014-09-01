define('app/commands/addcommandcommand',['app/logocommands/abstractlogocommandfactory',

	'app/events/events', 'app/events/eventdispatcher',

	'app/models/modelfacade'],

function(AbstractCommandFactory,

	Events, eventDispatcher,

	ModelFacade) {
	
	"use strict";
	
	var AddCommandCommand = function(){
		
	};
	
	AddCommandCommand.prototype.execute = function(data){
		var command;
		data.color = ModelFacade.getInstance().get(ModelFacade.COLOR).getData().index;
		command = new AbstractCommandFactory.fromJson(data);
		ModelFacade.getInstance().get(ModelFacade.COMM).add(command);
		eventDispatcher.trigger({"type":Events.DRAW});
	};
	
  	return AddCommandCommand;
});

