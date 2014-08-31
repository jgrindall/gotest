define(['app/models/commmodel', 'app/models/commtickermodel'],

function(commModel, commTickerModel) {
	
	"use strict";
	
	var StopCommand = function(){
		
	};
	
	StopCommand.prototype.execute = function(data){
		commModel.stop();
		commTickerModel.stop();
	};
	
  	return StopCommand;
});

