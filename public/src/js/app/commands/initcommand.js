define('app/commands/initcommand',['phasercomponents'],

function(PhaserComponents) {
	
	"use strict";
	
	var InitCommand = function(){
		PhaserComponents.AbstractCommand.call(this);
	};
	
	InitCommand.prototype = Object.create(PhaserComponents.AbstractCommand.prototype);
	InitCommand.prototype.constructor = InitCommand;

	InitCommand.prototype.execute = function(data){
		
	};
	
  	return InitCommand;
});

