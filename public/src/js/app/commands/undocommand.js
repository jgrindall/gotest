define('app/commands/undocommand',[

	'app/events/events','phasercomponents','app/models/modelfacade', 'app/commands/abstractcommand'],

function(Events, PhaserComponents, ModelFacade, AbstractCommand) {
	
	"use strict";
	
	var UndoCommand = function(){
		AbstractCommand.call(this);
	};
	
	UndoCommand.prototype = Object.create(AbstractCommand.prototype);
	UndoCommand.prototype.constructor = UndoCommand;

	UndoCommand.prototype.execute = function(data){
		ModelFacade.getInstance().get(ModelFacade.COMM).undo();
		PhaserComponents.eventDispatcher.trigger({"type":Events.REPLAY});
	};
	
  	return UndoCommand;
});

