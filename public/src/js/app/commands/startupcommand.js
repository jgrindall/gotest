define('app/commands/startupcommand',['app/models/modelfacade', 'app/consts/defaults'],

function(ModelFacade, Defaults) {
	
	"use strict";
	
	var StartUpCommand = function(){
		
	};

	StartUpCommand.prototype.execute = function(data){
		console.log("execute start up "+ModelFacade+"  "+Defaults);
		ModelFacade.getInstance().init();
		ModelFacade.getInstance().setData(Defaults.DEFAULT_JSON);
	};
	
  	return StartUpCommand;
});
