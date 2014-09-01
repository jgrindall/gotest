define('app/commands/addcommandcommand',['app/logocommands/abstractcommandfactory'],

function(AbstractCommandFactory) {
	
	"use strict";
	
	var AddCommandCommand = function(){
		
	};
	
	AddCommandCommand.prototype.execute = function(data){
		var ModelFacade = require('app/models/modelfacade');
		data.color = ModelFacade.getInstance().get(ModelFacade.COLOR).getData().index;
		var c = new AbstractCommandFactory.fromJson(data);
		ModelFacade.getInstance().get(ModelFacade.COMM).add(c);
	};
	
  	return AddCommandCommand;
});

