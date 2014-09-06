define('app/commands/undocommand',[

	'app/events/events','phasercomponents','app/models/modelfacade'],

function(Events, PhaserComponents, ModelFacade) {
	
	"use strict";
	
	var UndoCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	UndoCommand.prototype = Object.create(PhaserComponents.Commands.AbstractCommand.prototype);
	UndoCommand.prototype.constructor = UndoCommand;

	UndoCommand.prototype.execute = function(data){
		ModelFacade.getInstance().get(ModelFacade.COMM).undo();
		this.eventDispatcher.trigger({"type":Events.REPLAY});
	};
	
  	return UndoCommand;
});

