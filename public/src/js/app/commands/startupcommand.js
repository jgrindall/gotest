define(['app/consts/defaults', 'app/models/modelfacade',

	'phasercomponents', 'app/events/events',

	'app/utils/error', 'app/utils/errorcodes'],

function(Defaults, ModelFacade,

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
				ModelFacade.getInstance().setData(data.response);
				this.eventDispatcher.trigger({"type":Events.REPLAY});
			}
		}
		else{
			Error.show(ErrorCodes.LOAD_DEFAULTS_ERROR);
		}
	};

	StartUpCommand.prototype.execute = function(){
		ModelFacade.getInstance().setData(Defaults.DEFAULT_JSON);
		this.eventDispatcher.trigger({"type":Events.REPLAY});
		PhaserComponents.Storage.Storage.getInstance().loadDefaults(this.onDefaultsLoaded.bind(this));
	};
	
  	return StartUpCommand;
});
