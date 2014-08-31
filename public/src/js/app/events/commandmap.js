define([

'app/commands/newfilecommand',

'app/commands/loadcommand',

'app/commands/savecommand',

'app/commands/printcommand',

'app/commands/undocommand',

'app/commands/stopcommand',

'app/commands/typechoicecommand',

'app/commands/teachercommand',

'app/commands/addcommandcommand',

'app/commands/drawcommand',

'app/commands/replaycommand',

'app/events/events'],

function(NewFileCommand, LoadCommand, SaveCommand, PrintCommand,

UndoCommand, StopCommand, TypeChoiceCommand, TeacherCommand, AddCommandCommand,

DrawCommand, ReplayCommand, Events) {
	
	"use strict";
	
	var CommandMap = function(){
		this.hash = {};
	};
	
	CommandMap.prototype.init = function(){
		this.map(Events.NEW_FILE, 			NewFileCommand);
		this.map(Events.LOAD, 				LoadCommand);
		this.map(Events.SAVE, 				SaveCommand);
		this.map(Events.PRINT, 				PrintCommand);
		this.map(Events.UNDO,				UndoCommand);
		this.map(Events.STOP, 				StopCommand);
		this.map(Events.TEACHER_LOGIN, 		TeacherCommand);
		this.map(Events.TYPE_CHOICE, 			TypeChoiceCommand);
		this.map(Events.ADD_COMMAND, 			AddCommandCommand);
		this.map(Events.DRAW, 				DrawCommand);
		this.map(Events.REPLAY, 			ReplayCommand);
	};
	
	CommandMap.prototype.map = function(eventName, commandClass){
		if(!this.hash[eventName]){
			this.hash[eventName] = commandClass;
		}
		else{
			throw "Already defined";
		}
	};
	
	CommandMap.prototype.get = function(eventName){
		return this.hash[eventName];
	};
	
  	return new CommandMap();
});




