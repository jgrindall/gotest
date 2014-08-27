
define(['app/scenes/activity/commands/movecommand',

'app/scenes/activity/commands/turncommand',

'app/scenes/activity/commands/fdcommand',

'app/scenes/activity/commands/commandtypes'],

function(MoveCommand, TurnCommand,

FdCommand, CommandTypes){
	
	"use strict";
	
	var AbstractCommandFactory = function(){
		
	};
	
	AbstractCommandFactory.fromJson = function(json){
		if(json.type === CommandTypes.MOVE){
			return new MoveCommand(json.direction, json.color, json.index, json.total);
		}
		else if(json.type === CommandTypes.TURN){
			return new TurnCommand(json.direction, json.color, json.index, json.total);
		}
		else if(json.type === CommandTypes.FD){
			return new FdCommand(json.direction, json.color, json.index, json.total);
		}
	};
	
	return AbstractCommandFactory;

});




