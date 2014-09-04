define('app/commands/gridchoicecommand',['app/utils/alertmanager', 'app/commands/abstractcommand'],

function(AlertManager, AbstractCommand) {
	
	"use strict";
	
	var GridChoiceCommand = function(){
		AbstractCommand.call(this);
	};
	
	GridChoiceCommand.prototype = Object.create(AbstractCommand.prototype);
	GridChoiceCommand.prototype.constructor = GridChoiceCommand;

	GridChoiceCommand.prototype.execute = function(data){
		AlertManager.makeGridMenu({}, null); 
	};
	
  	return GridChoiceCommand;
});


	