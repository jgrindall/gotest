define('app/commands/loadcommand',['app/models/modelfacade', 'app/views/popups/growl',

	'phasercomponents', 'app/events/events', 'app/assets'],

function(ModelFacade, Growl,

	PhaserComponents, Events, Assets) {
	
	"use strict";
	
	var LoadCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(LoadCommand, PhaserComponents.Commands.AbstractCommand);

	LoadCommand.prototype.execute = function(){
		PhaserComponents.Storage.getInstance().load(this.onLoaded.bind(this));
	};
	
	LoadCommand.prototype.onLoaded = function(data){
		if(data.success){
			try{
				ModelFacade.getInstance().setData(data.json);
				this.eventDispatcher.trigger({"type":Events.REPLAY});
				PhaserComponents.AlertManager.getInstance().make(Growl, {"title":"Message", "label":"Loaded your file", "sfx":Assets.SOUNDS[2]}, null);
			}
			catch(e){
				PhaserComponents.AlertManager.getInstance().make(Growl, {"title":"Message", "label":"Format error", "sfx":Assets.SOUNDS[2]}, null);
			}
		}
		else{
			PhaserComponents.AlertManager.getInstance().make(Growl, {"title":"Message", "label":"Error - unable to load", "sfx":Assets.SOUNDS[2]}, null);
		}
	};
	
  	return LoadCommand;
});
