define(['app/models/commmodel',

'app/models/colormodel',

'app/commands/abstractcommandfactory'],

function(commModel, colorModel, AbstractCommandFactory) {
	
	"use strict";
	
	var AddCommandCommand = function(){
		
	};
	
	AddCommandCommand.prototype.execute = function(data){
		data.color = colorModel.getData().index;
		var c = new AbstractCommandFactory.fromJson(data);
		commModel.add(c);
	};
	
  	return AddCommandCommand;
});

