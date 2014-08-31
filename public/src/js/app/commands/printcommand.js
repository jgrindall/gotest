define(['app/utils/alertmanager', 'app/utils/storage'],

function(AlertManager, Storage) {
	
	"use strict";
	
	var PrintCommand = function(){
		
	};
	
	PrintCommand.prototype.execute = function(data){
		AlertManager.makeGrowl({"label":"No printers found"}, null);
	};
	
  	return PrintCommand;
});
