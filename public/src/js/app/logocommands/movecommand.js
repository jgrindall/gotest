
define(

	'app/logocommands/movecommand',

	['app/logocommands/abstractlogocommand', 'app/logocommands/commandtypes'], 

	function(AbstractLogoCommand, CommandTypes){
	
		"use strict";

		var MoveCommand = function(json){
			AbstractLogoCommand.call(this, json);
		};
		
		MoveCommand.prototype = Object.create(AbstractLogoCommand.prototype);
		MoveCommand.prototype.constructor = MoveCommand;
		
		MoveCommand.prototype.toJson = function(){
			var json = AbstractLogoCommand.prototype.toJson.call(this);
			json.type = CommandTypes.MOVE;
			return json;
		};
		
		return MoveCommand;
	}
);




