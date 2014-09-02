
define('app/logocommands/abstractlogocommandfactory', ['app/logocommands/movecommand',

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
			return new MoveCommand(json);
		}
		else if(json.type === CommandTypes.TURN){
			return new TurnCommand(json);
		}
		else if(json.type === CommandTypes.FD){
			return new FdCommand(json);
		}
	};
	
	return AbstractCommandFactory;

});




