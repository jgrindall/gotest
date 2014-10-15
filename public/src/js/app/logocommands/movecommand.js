
define(	['app/logocommands/abstractlogocommand', 'app/logocommands/commandtypes', 'phasercomponents'], 

	function(AbstractLogoCommand, CommandTypes, PhaserComponents){
	
		"use strict";

		var MoveCommand = function(json){
			AbstractLogoCommand.call(this, json);
		};
		
		PhaserComponents.Utils.extends(MoveCommand, AbstractLogoCommand);

		MoveCommand.prototype.toJson = function(){
			var json = AbstractLogoCommand.prototype.toJson.call(this);
			json.type = CommandTypes.MOVE;
			return json;
		};
		
		return MoveCommand;
	}
);




