define('app/commands/typechoicecommand',['app/utils/alertmanager', 'app/models/modelfacade'],

function(AlertManager, ModelFacade) {
	
	"use strict";
	
	var TypeChoiceCommand = function(){
		
	};
	
	TypeChoiceCommand.prototype.execute = function(data){
		AlertManager.makeScreenMenu({"page":0, "index":ModelFacade.getInstance().get(ModelFacade.SCREEN).getData().screen},
			this.onScreenChosen.bind(this)); 
	};
	
	TypeChoiceCommand.prototype.onScreenChosen = function(data) {
		if(data.index === 1){
			ModelFacade.getInstance().get(ModelFacade.SCREEN).setData(data.selection.selectedIndex);
		}
	};
	
  	return TypeChoiceCommand;
});


	