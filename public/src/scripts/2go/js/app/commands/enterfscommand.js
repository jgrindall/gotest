define(

	['phasercomponents'],

function(PhaserComponents) {
	
	"use strict";
	
	var EnterFsCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(EnterFsCommand, PhaserComponents.Commands.AbstractCommand);

	EnterFsCommand.prototype.execute = function(){
		var el = document.getElementsByTagName("canvas")[0];
 		if (el.requestFullscreen) {
		    el.requestFullscreen();
		} 
		else if (el.webkitRequestFullscreen) {
		    el.webkitRequestFullscreen();
		}
		else if (el.mozRequestFullScreen) {
		    el.mozRequestFullScreen();
		}
		else if (el.msRequestFullscreen) {
		    el.msRequestFullscreen();
		}
	};
	
  	return EnterFsCommand;
});

