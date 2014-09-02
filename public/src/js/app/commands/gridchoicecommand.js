define('app/commands/gridchoicecommand',['app/utils/alertmanager', 'app/models/modelfacade'],

function(AlertManager, ModelFacade) {
	
	"use strict";
	
	var GridChoiceCommand = function(){
		
	};
	
	GridChoiceCommand.prototype.execute = function(data){
		var gridOn, stepLengthIndex, penWidthIndex;
		gridOn = 
		stepLengthIndex = ModelFacade.getInstance().get(ModelFacade.SCREEN).getData().screen
		penWidthIndex = ModelFacade.getInstance().get(ModelFacade.SCREEN).getData().screen
		AlertManager.makeGridMenu({"index":0}, this.onScreenChosen.bind(this)); 
	};
	
	GridChoiceCommand.prototype.onScreenChosen = function(data) {
		if(data.index === 1){
			//ModelFacade.getInstance().get(ModelFacade.SCREEN).setData(data.selection.selectedIndex);
		}
	};
	
  	return GridChoiceCommand;
});


	