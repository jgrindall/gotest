define('app/commands/typechoicecommand',[


	'app/utils/alertmanager', 'app/models/modelfacade', 'phasercomponents'],

function(AlertManager, ModelFacade, PhaserComponents) {
	
	"use strict";
	
	var TypeChoiceCommand = function(){
		
	};
	
	TypeChoiceCommand.prototype.execute = function(data){
		var screenModel, radioModel;
		screenModel = new PhaserComponents.ButtonGridModel();
		radioModel = new PhaserComponents.ButtonGridModel();
		screenModel.setData(ModelFacade.getInstance().get(ModelFacade.SCREEN).getData().index);
		radioModel.setData(ModelFacade.getInstance().get(ModelFacade.ANGLE).getData().index);
		AlertManager.makeScreenMenu({"screenModel":screenModel, "radioModel":radioModel}, this.onScreenChosen.bind(this)); 
	};
	
	TypeChoiceCommand.prototype.onScreenChosen = function(data) {
		if(data.index === 0){
			ModelFacade.getInstance().get(ModelFacade.SCREEN).setData(data.selection.screenIndex);
			ModelFacade.getInstance().get(ModelFacade.ANGLE).setData(data.selection.radioIndex);
		}
	};
	
  	return TypeChoiceCommand;
});


	