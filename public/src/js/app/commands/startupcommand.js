define(['app/consts/defaults', 'app/models/modelfacade',

	'phasercomponents', 'app/events/events', 'app/views/popups/growl', 'app/assets'],

function(Defaults, ModelFacade,

	PhaserComponents, Events, Growl, Assets) {
	
	"use strict";
	
	var StartUpCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};

	PhaserComponents.Utils.extends(StartUpCommand, PhaserComponents.Commands.AbstractCommand);

	StartUpCommand.prototype.onDefaultsLoaded = function(data){
		console.log("onDefaultsLoaded "+JSON.stringify(data));
		if(data.success){
			if(data.response){
				ModelFacade.getInstance().setData(data.response);
				this.eventDispatcher.trigger({"type":Events.REPLAY});
			}
		}
		else{
			PhaserComponents.AlertManager.getInstance().make(Growl, {"title":"Message", "label":"Error loading defaults", "sfx":Assets.SOUNDS[2]}, null);
		}
	};

	StartUpCommand.prototype.execute = function(){
		ModelFacade.getInstance().setData(Defaults.DEFAULT_JSON);
		this.eventDispatcher.trigger({"type":Events.REPLAY});
		PhaserComponents.Storage.Storage.getInstance().loadDefaults(this.onDefaultsLoaded.bind(this));
	};
	
  	return StartUpCommand;
});
