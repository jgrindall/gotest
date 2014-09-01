define('app/commands/typechoicecommand',['jquery', 'app/utils/alertmanager'],

function($, AlertManager) {
	
	"use strict";
	
	var TypeChoiceCommand = function(){
		
	};
	
	TypeChoiceCommand.prototype.execute = function(data){
		var ModelFacade = require('app/models/modelfacade');
		AlertManager.makeScreenMenu({"page":0, "index":ModelFacade.getInstance().get(ModelFacade.SCREEN).getData().screen},
			$.proxy(this.onScreenChosen, this)); 
	};
	
	TypeChoiceCommand.prototype.onScreenChosen = function(data) {
		var ModelFacade = require('app/models/modelfacade');
		if(data.index === 1){
			ModelFacade.getInstance().get(ModelFacade.SCREEN).setData(data.selection.selectedIndex);
		}
	};
	
  	return TypeChoiceCommand;
});


	