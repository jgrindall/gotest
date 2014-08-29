define(['app/scenes/activity/models/commmodel',

'app/scenes/activity/models/colormodel',

'app/scenes/activity/commands/abstractcommandfactory'],

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

