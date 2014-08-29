
define(['app/commands/abstractcommand',

'app/commands/commandtypes'],

function(AbstractCommand,

CommandTypes){
	
	"use strict";
	
	var FdCommand = function(direction, color, index, total){
		AbstractCommand.call(this, direction, color, index, total);
	};
	
	FdCommand.prototype = Object.create(AbstractCommand.prototype);
	FdCommand.prototype.constructor = FdCommand;
	
	FdCommand.prototype.toJson = function(){
		var json = AbstractCommand.prototype.toJson.call(this);
		json.type = CommandTypes.FD;
		return json;
	};
	
	return FdCommand;

});




