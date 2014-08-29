define(['app/scenes/activity/models/commmodel'],

function(commModel) {
	
	"use strict";
	
	var StopCommand = function(){
		
	};
	
	StopCommand.prototype.execute = function(data){
		commModel.stop();
	};
	
  	return StopCommand;
});

