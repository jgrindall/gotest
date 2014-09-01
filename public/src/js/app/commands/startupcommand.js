define('app/commands/startupcommand',['app/consts/defaults'],

function(Defaults) {
	
	"use strict";
	
	var StartUpCommand = function(){
		
	};

	StartUpCommand.prototype.execute = function(data){
		var ModelFacade = require('app/models/modelfacade');
		ModelFacade.getInstance().init();
		ModelFacade.getInstance().setData(Defaults.DEFAULT_JSON);
	};
	
  	return StartUpCommand;
});
