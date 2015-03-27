
define(['base/logocommands/abstractlogocommand', 'base/logocommands/commandtypes', 'phasercomponents'], 

	function(AbstractLogoCommand, CommandTypes, PhaserComponents){
	
		"use strict";

		var TransportCommand = function(json){
			AbstractLogoCommand.call(this, json);
		};
		
		PhaserComponents.Utils.extends(TransportCommand, AbstractLogoCommand);

		TransportCommand.prototype.toJson = function(){
			var json = AbstractLogoCommand.prototype.toJson.call(this);
			json.type = CommandTypes.TRANSPORT;
			return json;
		};
		
		return TransportCommand;
	}
);




