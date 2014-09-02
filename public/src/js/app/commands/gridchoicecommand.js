define('app/commands/gridchoicecommand',['app/utils/alertmanager'],

function(AlertManager) {
	
	"use strict";
	
	var GridChoiceCommand = function(){
		
	};
	
	GridChoiceCommand.prototype.execute = function(data){
		AlertManager.makeGridMenu({}, null); 
	};
	
  	return GridChoiceCommand;
});


	