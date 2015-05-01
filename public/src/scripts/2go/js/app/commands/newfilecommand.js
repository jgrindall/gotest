define(

	['phasercomponents', 

	'base/views/popups/gamebgmenu', 'base/dataproviders/bgdataprovider',

	'base/assets', 'base/events/events', 'base/utils/translation', 'base/utils/translationconsts',

	'base/models/modelconsts', 'base/consts/defaults'],

function(PhaserComponents, 

	GameBgMenu, BgDataProvider,

	Assets, Events, Translation, TranslationConsts,

	ModelConsts, Defaults) {
	
	"use strict";
	
	var NewFileCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(NewFileCommand, PhaserComponents.Commands.AbstractCommand);

	NewFileCommand.prototype.execute = function(){
		var label, options;
		label = Translation.getForKey(TranslationConsts.Keys.START_NEW_FILE);
		options = {'dataProvider': new BgDataProvider(this.game), "label":label, "sfx":Assets.SOUNDS[2]};
		this.alertManager.make(GameBgMenu, options, this.onBgChosen.bind(this));
	};
	
	NewFileCommand.prototype.onBgChosen = function(data){
		var selectedPage = data.selection.selectedPage;
		this.alertManager.close();
		if(data.index === 1){
			this.modelFacade.get(ModelConsts.CHALLENGE).reset();
			this.modelFacade.get(ModelConsts.BG).set(selectedPage, {"force":true});
			this.modelFacade.get(ModelConsts.TURTLE).set(Defaults.TURTLE_MAP[selectedPage]);
			this.eventDispatcher.trigger({"type":Events.RESET_DOC_HANDLER});
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

