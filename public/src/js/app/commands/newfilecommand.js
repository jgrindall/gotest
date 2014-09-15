define(

	['phasercomponents', 'app/models/modelfacade',

	'app/views/popups/gamebgmenu', 'app/dataproviders/bgdataprovider',

	'app/assets', 'app/views/popups/growl'],

function(PhaserComponents, ModelFacade,

	GameBgMenu, BgDataProvider,

	Assets, Growl) {
	
	"use strict";
	
	var NewFileCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(NewFileCommand, PhaserComponents.Commands.AbstractCommand);

	NewFileCommand.prototype.execute = function(){
		var options = {'dataProvider': new BgDataProvider(this.game), "label":"Start a new file - choose a background", "sfx":Assets.SOUNDS[2]};
		PhaserComponents.AlertManager.getInstance().make(GameBgMenu, options, this.onBgChosen.bind(this));
	};
	
	NewFileCommand.prototype.onBgChosen = function(data){
		if(data.index === 1){
			ModelFacade.getInstance().get(ModelFacade.BG).set(data.selection.selectedPage, {"force":true});
		}
		else if(data.index === 2){
			alert("Open external designer");
		}
	};
	
  	return NewFileCommand;
});

