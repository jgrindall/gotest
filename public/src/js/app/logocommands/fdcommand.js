
define(

	'app/logocommands/fdcommand',

	['app/logocommands/abstractlogocommand',

	'app/logocommands/commandtypes'],

	function(AbstractLogoCommand, CommandTypes){
	
		"use strict";
		
		var FdCommand = function(json){
			AbstractLogoCommand.call(this, json);
		};
		
		FdCommand.prototype = Object.create(AbstractLogoCommand.prototype);
		FdCommand.prototype.constructor = FdCommand;
		
		FdCommand.prototype.toJson = function(){
			var json = AbstractLogoCommand.prototype.toJson.call(this);
			json.type = CommandTypes.FD;
			return json;
		};
		
		return FdCommand;
	}
);




