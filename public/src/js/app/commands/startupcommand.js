define(['app/consts/defaults',

	'phasercomponents', 'app/events/events',

	'app/utils/error', 'app/utils/errorcodes'],

function(Defaults,

	PhaserComponents, Events,

	Error, ErrorCodes) {
	
	"use strict";
	
	var StartUpCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};

	PhaserComponents.Utils.extends(StartUpCommand, PhaserComponents.Commands.AbstractCommand);

	StartUpCommand.prototype.onDefaultsLoaded = function(data){
		console.log("onDefaultsLoaded "+JSON.stringify(data));
		if(data.success){
			if(data.response){
				this.modelFacade.setData(data.response);
				this.eventDispatcher.trigger({"type":Events.REPLAY});
			}
		}
		else{
			Error.show(this.alertManager, ErrorCodes.LOAD_DEFAULTS_ERROR);
		}
	};

	StartUpCommand.prototype.execute = function(){
		this.modelFacade.setData(Defaults.DEFAULT_JSON);
		this.eventDispatcher.trigger({"type":Events.REPLAY});
		this.storage.loadDefaults(this.onDefaultsLoaded.bind(this));
	};
	
  	return StartUpCommand;
});
