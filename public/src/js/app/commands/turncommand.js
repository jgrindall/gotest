
define(['app/commands/abstractcommand',

'app/commands/commandtypes'

], function(AbstractCommand,

CommandTypes){
	
	"use strict";
	
	var TurnCommand = function(direction, color, index, total){
		AbstractCommand.call(this, direction, color, index, total);
	};
	
	TurnCommand.prototype = Object.create(AbstractCommand.prototype);
	TurnCommand.prototype.constructor = TurnCommand;
	
	TurnCommand.prototype.toJson = function(){
		var json = AbstractCommand.prototype.toJson.call(this);
		json.type = CommandTypes.TURN;
		return json;
	};
	
	return TurnCommand;
});




