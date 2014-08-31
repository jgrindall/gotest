
define(['app/logocommands/movecommand',

'app/logocommands/turncommand',

'app/logocommands/fdcommand',

'app/logocommands/commandtypes'],

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




