define('app/commands/typechoicecommand',[

	'app/models/modelfacade',

	'phasercomponents', 'app/views/popups/gamescreenmenu'],

function(ModelFacade,

	PhaserComponents, GameScreenMenu) {
	
	"use strict";
	
	var TypeChoiceCommand = function(){
		PhaserComponents.AbstractCommand.call(this);
	};
	
	TypeChoiceCommand.prototype = Object.create(PhaserComponents.AbstractCommand.prototype);
	TypeChoiceCommand.prototype.constructor = TypeChoiceCommand;

	TypeChoiceCommand.prototype.execute = function(data){
		var screenModel, radioModel, options;
		screenModel = new PhaserComponents.ButtonGridModel();
		radioModel = new PhaserComponents.ButtonGridModel();
		screenModel.setData(ModelFacade.getInstance().get(ModelFacade.SCREEN).getData().index);
		radioModel.setData(ModelFacade.getInstance().get(ModelFacade.ANGLE).getData().index);
		options = {"screenModel":screenModel, "radioModel":radioModel};
		PhaserComponents.AlertManager.getInstance().make(GameScreenMenu, options, this.onScreenChosen.bind(this)); 
	};
	
	TypeChoiceCommand.prototype.onScreenChosen = function(data) {
		if(data.index === 0){
			ModelFacade.getInstance().get(ModelFacade.SCREEN).setData(data.selection.screenIndex);
			ModelFacade.getInstance().get(ModelFacade.ANGLE).setData(data.selection.radioIndex);
		}
	};
	
  	return TypeChoiceCommand;
});


	