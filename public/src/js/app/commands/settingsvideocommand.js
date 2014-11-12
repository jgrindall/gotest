define(['phasercomponents', 'app/consts/help'],

function(PhaserComponents, Help) {
	
	"use strict";
	
	var SettingsVideoCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(SettingsVideoCommand, PhaserComponents.Commands.AbstractCommand);

	SettingsVideoCommand.prototype.execute = function(){
		var args, options;
		args = Help.getSettingsArgs();
		options = Help.getSettingsOptions();
		if(window.PMVideo && window.PMVideo.launch && typeof window.PMVideo.launch === 'function'){
			window.PMVideo.launch(args, options);
		}
		else{
			console.log("window.PMVideo is "+window.PMVideo);
			console.log("window.PMVideo.launch is "+window.PMVideo.launch);
		}
	};
	
  	return SettingsVideoCommand;
});
