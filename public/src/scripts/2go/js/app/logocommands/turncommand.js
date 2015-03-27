
define(

	'base/logocommands/turncommand',

	['base/logocommands/abstractlogocommand', 'base/logocommands/commandtypes', 'phasercomponents'],

	function(AbstractLogoCommand, CommandTypes, PhaserComponents){
	
		"use strict";
		
		var TurnCommand = function(json){
			AbstractLogoCommand.call(this, json);
		};

		PhaserComponents.Utils.extends(TurnCommand, AbstractLogoCommand);
	
		TurnCommand.prototype.toJson = function(){
			var json = AbstractLogoCommand.prototype.toJson.call(this);
			json.type = CommandTypes.TURN;
			return json;
		};
		
		return TurnCommand;
	}
);




