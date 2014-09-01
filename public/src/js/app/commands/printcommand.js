define('app/commands/printcommand',['app/utils/alertmanager'],

function(AlertManager) {
	
	"use strict";
	
	var PrintCommand = function(){
		
	};
	
	PrintCommand.prototype.execute = function(data){
		AlertManager.makeGrowl({"label":"No printers found"}, null);
	};
	
  	return PrintCommand;
});
