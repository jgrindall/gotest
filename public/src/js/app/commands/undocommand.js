define('app/commands/undocommand',[

	'app/events/events','phasercomponents','app/models/modelfacade'],

function(Events, PhaserComponents, ModelFacade) {
	
	"use strict";
	
	var UndoCommand = function(){
		
	};
	
	UndoCommand.prototype.execute = function(data){
		ModelFacade.getInstance().get(ModelFacade.COMM).undo();
		PhaserComponents.eventDispatcher.trigger({"type":Events.REPLAY});
	};
	
  	return UndoCommand;
});

