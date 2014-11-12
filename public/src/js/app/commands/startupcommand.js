define(['phasercomponents', 'app/events/events',

	'app/utils/error', 'app/utils/errorcodes', 'app/consts/appconsts'],

function(PhaserComponents, Events,

	Error, ErrorCodes, AppConsts) {
	
	"use strict";
	
	var StartUpCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};

	PhaserComponents.Utils.extends(StartUpCommand, PhaserComponents.Commands.AbstractCommand);

	StartUpCommand.prototype.toScene = function(key){
		this.eventDispatcher.trigger({"type":PhaserComponents.Events.AppEvents.CHANGE_SCENE, "data":{"sceneTo":key}});
	};

	StartUpCommand.prototype.toActivity = function(){
		this.toScene(AppConsts.ACTIVITY_SCENE);
	};

	StartUpCommand.prototype.onDefaultsError = function(code){
		var that = this;
		if(code === null || code === undefined){
			code = ErrorCodes.LOAD_DEFAULTS_ERROR;
		}
		setTimeout(function(){
			Error.show(that.alertManager, code);
		}, 250);
	};

	StartUpCommand.prototype.loadChallenges = function(){
		var that = this;
		this.eventDispatcher.trigger({"type":Events.SHOW_ALL});
		setTimeout(function(){
			that.eventDispatcher.trigger({"type":Events.NEW_FILE});
		}, 250);
	};

	StartUpCommand.prototype.loadFile = function(data){
		this.modelFacade.setData(data);
		this.eventDispatcher.trigger({"type":Events.SHOW_ALL});
	};

	StartUpCommand.prototype.onDefaultsLoaded = function(data){
		this.toActivity();
		if(data.success){
			if(data.response){
				this.loadFile(data.response);
			}
			else{
				this.loadChallenges();
			}
		}
		else{
			this.eventDispatcher.trigger({"type":Events.SHOW_ALL});
			this.onDefaultsError(data.response);
		}
	};

	StartUpCommand.prototype.execute = function(){
		this.storage.loadDefaults(this.onDefaultsLoaded.bind(this));
	};
	
  	return StartUpCommand;
});



