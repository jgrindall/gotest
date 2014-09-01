define('app/commands/undocommand',[

	'app/events/events','app/events/eventdispatcher','app/models/modelfacade'],

function(Events, eventDispatcher, ModelFacade) {
	
	"use strict";
	
	var UndoCommand = function(){
		
	};
	
	UndoCommand.prototype.execute = function(data){
		ModelFacade.getInstance().get(ModelFacade.COMM).undo();
		eventDispatcher.trigger({"type":Events.REPLAY});
	};
	
  	return UndoCommand;
});

