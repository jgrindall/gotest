define(['phasercomponents'],

function(PhaserComponents) {
	
	"use strict";
	
	var VideoCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(VideoCommand, PhaserComponents.Commands.AbstractCommand);

	VideoCommand.prototype.execute = function(){
		window.alert("videos");
	};
	
  	return VideoCommand;
});
