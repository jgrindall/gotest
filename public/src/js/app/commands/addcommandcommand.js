define('app/commands/addcommandcommand',['app/models/modelfacade',

'app/logocommands/abstractcommandfactory'],

function(ModelFacade, AbstractCommandFactory) {
	
	"use strict";
	
	var AddCommandCommand = function(){
		
	};
	
	AddCommandCommand.prototype.execute = function(data){
		data.color = ModelFacade.getInstance().get(ModelFacade.COLOR).getData().index;
		var c = new AbstractCommandFactory.fromJson(data);
		ModelFacade.getInstance().get(ModelFacade.COMM).add(c);
	};
	
  	return AddCommandCommand;
});

