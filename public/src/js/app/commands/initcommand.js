define('app/commands/initcommand',[],

function() {
	
	"use strict";
	
	var InitCommand = function(){
		if(!ModelFacade){
			throw "no modelfacade";
		}
		console.log("new InitCommand "+ModelFacade);
	};
	
	InitCommand.prototype.execute = function(data){
		
	};
	
  	return InitCommand;
});

