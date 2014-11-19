define(['phasercomponents', 'app/consts/help'],

function(PhaserComponents, Help) {
	
	"use strict";
	
	var VideoCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(VideoCommand, PhaserComponents.Commands.AbstractCommand);

	VideoCommand.prototype.execute = function(){
		var args, options;
		args = Help.getArgs();
		options = Help.getOptions();
		if(window.PMVideo && window.PMVideo.launch && typeof window.PMVideo.launch === 'function'){
			window.PMVideo.launch(args, options);
		}
		else{
			//console.log("window.PMVideo is "+window.PMVideo);
			//console.log("window.PMVideo.launch is "+window.PMVideo.launch);
		}
	};
	
  	return VideoCommand;
});
