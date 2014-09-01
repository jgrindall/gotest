define('app/commands/undocommand',['app/models/modelfacade'],

function(ModelFacade) {
	
	"use strict";
	
	var UndoCommand = function(){
		
	};
	
	UndoCommand.prototype.execute = function(data){
		ModelFacade.getInstance().get(ModelFacade.COMM).undo();
	};
	
  	return UndoCommand;
});

