define(['app/utils/alertmanager', 'app/models/commtickermodel'],

function(AlertManager, commTickerModel) {
	
	"use strict";
	
	var DrawCommand = function(){
		
	};
	
	DrawCommand.prototype.execute = function(data){
		commTickerModel.start();
	};
	
  	return DrawCommand;
});

