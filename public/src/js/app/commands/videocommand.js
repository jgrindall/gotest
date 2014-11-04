define(['phasercomponents', 'app/events/events'],

function(PhaserComponents, Events) {
	
	"use strict";
	
	var VideoCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(VideoCommand, PhaserComponents.Commands.AbstractCommand);

	VideoCommand.prototype.execute = function(){
		alert("videos");
	};
	
  	return VideoCommand;
});
