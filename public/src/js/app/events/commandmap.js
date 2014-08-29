define([

'app/events/newfilecommand',

'app/events/loadcommand',

'app/events/savecommand',

'app/events/printcommand',

'app/events/undocommand',

'app/events/stopcommand',

'app/events/typechoicecommand',

'app/events/teachercommand',

'app/events/addcommandcommand',

'app/events/events'],

function(NewFileCommand, LoadCommand, SaveCommand, PrintCommand,

UndoCommand, StopCommand, TypeChoiceCommand, TeacherCommand, AddCommandCommand,

Events) {
	
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
		this.map(Events.TYPE_CHOICE, 		TypeChoiceCommand);
		this.map(Events.ADD_COMMAND, 		AddCommandCommand);
	};
	
	CommandMap.prototype.map = function(eventName, commandClass){
		this.hash[eventName] = commandClass;
	};
	
	CommandMap.prototype.get = function(eventName){
		return this.hash[eventName];
	};
	
  	return new CommandMap();
});




