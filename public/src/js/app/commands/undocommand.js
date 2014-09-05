define('app/commands/undocommand',[

	'app/events/events','phasercomponents','app/models/modelfacade'],

function(Events, PhaserComponents, ModelFacade) {
	
	"use strict";
	
	var UndoCommand = function(){
		PhaserComponents.AbstractCommand.call(this);
	};
	
	UndoCommand.prototype = Object.create(PhaserComponents.AbstractCommand.prototype);
	UndoCommand.prototype.constructor = UndoCommand;

	UndoCommand.prototype.execute = function(data){
		ModelFacade.getInstance().get(ModelFacade.COMM).undo();
		this.eventDispatcher.trigger({"type":Events.REPLAY});
	};
	
  	return UndoCommand;
});

