define('app/commands/initcommand',['app/commands/abstractcommand'],

function(AbstractCommand) {
	
	"use strict";
	
	var InitCommand = function(){
		AbstractCommand.call(this);
	};
	
	InitCommand.prototype = Object.create(AbstractCommand.prototype);
	InitCommand.prototype.constructor = InitCommand;

	InitCommand.prototype.execute = function(data){
		
	};
	
  	return InitCommand;
});

