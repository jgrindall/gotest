define('app/commands/newfilecommand',

	['phasercomponents', 'app/models/modelfacade',

	'app/views/popups/gamebgmenu', 'app/dataproviders/bgdataprovider'],

function(PhaserComponents, ModelFacade,

	GameBgMenu, BgDataProvider) {
	
	"use strict";
	
	var NewFileCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	NewFileCommand.prototype = Object.create(PhaserComponents.Commands.AbstractCommand.prototype);
	NewFileCommand.prototype.constructor = NewFileCommand;

	NewFileCommand.prototype.execute = function(data){
		var options = {'dataProvider': new BgDataProvider(this.game)};
		PhaserComponents.AlertManager.getInstance().make(GameBgMenu, options, this.onBgChosen.bind(this));
	};
	
	NewFileCommand.prototype.onBgChosen = function(data){
		if(data.index === 1){
			ModelFacade.getInstance().get(ModelFacade.BG).set(data.selection.selectedPage);
		}
	};
	
  	return NewFileCommand;
});

