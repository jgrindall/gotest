define(['app/activity/models/commmodel'],

function(commModel) {
	
	"use strict";
	
	var UndoCommand = function(){
		
	};
	
	UndoCommand.prototype.execute = function(data){
		console.log("UNDO");
		commModel.undo();
	};
	
  	return UndoCommand;
});

