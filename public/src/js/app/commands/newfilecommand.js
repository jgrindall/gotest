define(

	['phasercomponents', 

	'app/views/popups/gamebgmenu', 'app/dataproviders/bgdataprovider',

	'app/assets', 'app/events/events', 'app/models/modelconsts'],

function(PhaserComponents, 

	GameBgMenu, BgDataProvider,

	Assets, Events, ModelConsts) {
	
	"use strict";
	
	var NewFileCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(NewFileCommand, PhaserComponents.Commands.AbstractCommand);

	NewFileCommand.prototype.execute = function(){
		var options = {'dataProvider': new BgDataProvider(this.game), "label":"Start a new file - choose a background", "sfx":Assets.SOUNDS[2]};
		this.alertManager.make(GameBgMenu, options, this.onBgChosen.bind(this));
	};
	
	NewFileCommand.prototype.onBgChosen = function(data){
		var selectedPage = data.selection.selectedPage;
		if(data.index === 1){
			this.modelFacade.get(ModelConsts.BG).set(selectedPage, {"force":true});
		}
		else if(data.index === 2){
			this.eventDispatcher.trigger({"type":Events.OPEN_BG_EDITOR});
		}
		else if(data.index === 3){
			this.eventDispatcher.trigger({"type":Events.SHOW_CHALLENGES});
		}
	};
	
  	return NewFileCommand;
});

