
define(['app/scenes/activity/commands/movecommand',

'app/scenes/activity/commands/turncommand',

'app/scenes/activity/commands/commandtypes'],

function(MoveCommand, TurnCommand, CommandTypes){
	
	"use strict";
	
	var AbstractCommandFactory = function(){
		
	};
	
	AbstractCommandFactory.fromJson = function(json){
		if(json.type === CommandTypes.MOVE){
			return new MoveCommand(json.direction, json.color, json.index, json.total);
		}
		else{
			return new TurnCommand(json.direction, json.color, json.index, json.total);
		}
	};
	
	return AbstractCommandFactory;

});




