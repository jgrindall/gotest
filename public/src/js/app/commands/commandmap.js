define('app/commands/commandmap',[

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

'app/commands/startupcommand',

'app/commands/finishcommand',

'app/commands/replaycommand',

'app/events/events', 'app/events/eventdispatcher'],

function(NewFileCommand, LoadCommand, SaveCommand, PrintCommand,

UndoCommand, StopCommand, TypeChoiceCommand, TeacherCommand, AddCommandCommand,

DrawCommand, StartUpCommand, FinishCommand, ReplayCommand, Events, eventDispatcher) {
	
	"use strict";
	
	var CommandMap = function(){
		this.hash = {};
		this.initiated = false;
	};
	
	CommandMap.prototype.init = function(){
		if(!this.initiated){
			this.map(Events.NEW_FILE, 			NewFileCommand);
			this.map(Events.LOAD, 				LoadCommand);
			this.map(Events.SAVE, 				SaveCommand);
			this.map(Events.PRINT, 				PrintCommand);
			this.map(Events.UNDO,				UndoCommand);
			this.map(Events.STOP, 				StopCommand);
			this.map(Events.TEACHER_LOGIN, 		TeacherCommand);
			this.map(Events.TYPE_CHOICE, 			TypeChoiceCommand);
			this.map(Events.ADD_COMMAND, 			AddCommandCommand);
			this.map(Events.STARTUP, 			StartUpCommand);
			this.map(Events.DRAW, 				DrawCommand);
			this.map(Events.REPLAY, 			ReplayCommand);
			this.map(Events.FINISHED, 			FinishCommand);
			this.initiated = true;
		}
	};
	
	CommandMap.prototype.trigger = function(event, obj){
		if(!obj || !obj.type){
			throw "Undefined command";
		}
		var CommandClassRef = this.get(obj.type);
		if(CommandClassRef){
			(new CommandClassRef()).execute(obj.data);
		}
	};

	CommandMap.prototype.map = function(eventName, CommandClassRef){
		var handler;
		if(!eventName || !CommandClassRef || this.hash[eventName]){
			throw "Error with map";
		}
		handler = this.trigger.bind(this);
		eventDispatcher.addListener(eventName, handler);
		this.hash[eventName] = CommandClassRef;
		new CommandClassRef();
	};
	
	CommandMap.prototype.get = function(eventName){
		return this.hash[eventName];
	};
	
  	return new CommandMap();
});




