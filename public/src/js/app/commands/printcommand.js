define('app/commands/printcommand',['app/utils/alertmanager', 'app/commands/abstractcommand'],

function(AlertManager, AbstractCommand) {
	
	"use strict";
	
	var PrintCommand = function(){
		AbstractCommand.call(this);
	};
	
	PrintCommand.prototype = Object.create(AbstractCommand.prototype);
	PrintCommand.prototype.constructor = PrintCommand;

	PrintCommand.prototype.execute = function(data){
		AlertManager.makeGrowl({"label":"No printers found"}, null);
	};
	
  	return PrintCommand;
});
