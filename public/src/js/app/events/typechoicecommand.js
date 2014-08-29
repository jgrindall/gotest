define(['app/utils/alertmanager', 'app/scenes/activity/models/screenmodel'],

function(AlertManager, screenModel) {
	
	"use strict";
	
	var TypeChoiceCommand = function(){
		
	};
	
	TypeChoiceCommand.prototype.execute = function(data){
		AlertManager.makeScreenMenu({"page":0, "index":screenModel.getData().screen}, $.proxy(this.onScreenChosen, this)); 
	};
	
	TypeChoiceCommand.prototype.onScreenChosen = function(data) {
		if(data.index === 1){
			screenModel.setData(data.selection.selectedIndex);
		}
	};
	
  	return TypeChoiceCommand;
});


	