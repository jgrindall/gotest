define([

	'base/events/events','phasercomponents','base/models/modelconsts'],

function(Events, PhaserComponents, ModelConsts) {
	
	"use strict";
	
	var UndoCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(UndoCommand, PhaserComponents.Commands.AbstractCommand);

	UndoCommand.prototype.execute = function(){
		this.modelFacade.get(ModelConsts.COMM).undo();
		this.eventDispatcher.trigger({"type":Events.REPLAY});
	};
	
  	return UndoCommand;
});

