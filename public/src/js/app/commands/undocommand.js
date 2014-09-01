define('app/commands/undocommand',[],

function() {
	
	"use strict";
	
	var UndoCommand = function(){
		
	};
	
	UndoCommand.prototype.execute = function(data){
		var ModelFacade = require('app/models/modelfacade');
		ModelFacade.getInstance().get(ModelFacade.COMM).undo();
	};
	
  	return UndoCommand;
});

