define([

	'app/events/events','phasercomponents','app/models/modelfacade'],

function(Events, PhaserComponents, ModelFacade) {
	
	"use strict";
	
	var UndoCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(UndoCommand, PhaserComponents.Commands.AbstractCommand);

	UndoCommand.prototype.execute = function(){
		ModelFacade.getInstance().get(ModelFacade.COMM).undo();
		this.eventDispatcher.trigger({"type":Events.REPLAY});
	};
	
  	return UndoCommand;
});

