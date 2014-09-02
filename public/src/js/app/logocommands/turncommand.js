
define(

	'app/logocommands/turncommand',

	['app/logocommands/abstractlogocommand', 'app/logocommands/commandtypes'],

	function(AbstractLogoCommand, CommandTypes){
	
		"use strict";
		
		var TurnCommand = function(json){
			AbstractLogoCommand.call(this, json);
		};

		TurnCommand.prototype = Object.create(AbstractLogoCommand.prototype);
		TurnCommand.prototype.constructor = TurnCommand;
		
		TurnCommand.prototype.toJson = function(){
			var json = AbstractLogoCommand.prototype.toJson.call(this);
			json.type = CommandTypes.TURN;
			return json;
		};
		
		return TurnCommand;
	}
);




