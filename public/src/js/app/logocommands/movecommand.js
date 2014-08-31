
define(['app/logocommands/abstractcommand',

'app/logocommands/commandtypes'],

function(AbstractCommand,

CommandTypes){
	
	"use strict";
	
	var MoveCommand = function(direction, color, index, total){
		AbstractCommand.call(this, direction, color, index, total);
	};
	
	MoveCommand.prototype = Object.create(AbstractCommand.prototype);
	MoveCommand.prototype.constructor = MoveCommand;
	
	MoveCommand.prototype.toJson = function(){
		var json = AbstractCommand.prototype.toJson.call(this);
		json.type = CommandTypes.MOVE;
		return json;
	};
	
	return MoveCommand;

});




