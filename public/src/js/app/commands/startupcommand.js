define('app/commands/startupcommand',['app/consts/defaults', 'app/models/modelfacade', 'app/commands/abstractcommand'],

function(Defaults, ModelFacade, AbstractCommand) {
	
	"use strict";
	
	var StartUpCommand = function(){
		AbstractCommand.call(this);
	};

	StartUpCommand.prototype = Object.create(AbstractCommand.prototype);
	StartUpCommand.prototype.constructor = StartUpCommand;

	StartUpCommand.prototype.execute = function(data){
		ModelFacade.getInstance().init();
		ModelFacade.getInstance().setData(Defaults.DEFAULT_JSON);
	};
	
  	return StartUpCommand;
});
