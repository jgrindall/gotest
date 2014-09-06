
define(

	'app/logocommands/fdcommand',

	['app/logocommands/abstractlogocommand',

	'app/logocommands/commandtypes', 'phasercomponents'],

	function(AbstractLogoCommand, CommandTypes, PhaserComponents){
	
		"use strict";
		
		var FdCommand = function(json){
			AbstractLogoCommand.call(this, json);
		};
		
		PhaserComponents.Utils.extends(FdCommand, AbstractLogoCommand);
		
		FdCommand.prototype.toJson = function(){
			var json = AbstractLogoCommand.prototype.toJson.call(this);
			json.type = CommandTypes.FD;
			return json;
		};
		
		return FdCommand;
	}
);




