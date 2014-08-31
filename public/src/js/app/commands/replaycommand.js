define(['app/utils/alertmanager', 'app/models/commtickermodel'],

function(AlertManager, commTickerModel) {
	
	"use strict";
	
	var ReplayCommand = function(){
		
	};
	
	ReplayCommand.prototype.execute = function(data){
		commTickerModel.replay();
	};
	
  	return ReplayCommand;
});

