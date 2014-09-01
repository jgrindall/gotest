define('app/commands/startupcommand',['app/consts/defaults', 'app/models/modelfacade'],

function(Defaults, ModelFacade) {
	
	"use strict";
	
	var StartUpCommand = function(){
		
	};

	StartUpCommand.prototype.execute = function(data){
		ModelFacade.getInstance().init();
		ModelFacade.getInstance().setData(Defaults.DEFAULT_JSON);
	};
	
  	return StartUpCommand;
});
