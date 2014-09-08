define('app/commands/newfilecommand',

	['phasercomponents', 'app/models/modelfacade',

	'app/views/popups/gamebgmenu', 'app/dataproviders/bgdataprovider', 'app/assets'],

function(PhaserComponents, ModelFacade,

	GameBgMenu, BgDataProvider, Assets) {
	
	"use strict";
	
	var NewFileCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(NewFileCommand, PhaserComponents.Commands.AbstractCommand);

	NewFileCommand.prototype.execute = function(data){
		var options = {'dataProvider': new BgDataProvider(this.game), "label":"Choose a background", "sfx":Assets.SOUNDS[2]};
		PhaserComponents.AlertManager.getInstance().make(GameBgMenu, options, this.onBgChosen.bind(this));
	};
	
	NewFileCommand.prototype.onBgChosen = function(data){
		if(data.index === 1){
			ModelFacade.getInstance().get(ModelFacade.BG).set(data.selection.selectedPage, {"force":true});
		}
	};
	
  	return NewFileCommand;
});

