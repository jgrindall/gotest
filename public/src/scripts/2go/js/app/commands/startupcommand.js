define(['phasercomponents', 'base/events/events',

	'base/utils/error', 'base/utils/errorcodes', 'base/consts/appconsts'],

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
		var that = this;
		this.toActivity();
		this.eventDispatcher.trigger({"type":Events.HIDE_UI});
		this.eventDispatcher.trigger({"type":Events.SHOW_ALL});
		setTimeout(function(){
			that.modelFacade.setData(data);
			that.eventDispatcher.trigger({"type":Events.REPLAY});
		}, 10);
	};

	StartUpCommand.prototype.replaySharedFile = function(data){
		var that = this;
		this.toActivity();
		this.eventDispatcher.trigger({"type":Events.SHOW_ALL});
		setTimeout(function(){
			that.modelFacade.setData(data);
			that.eventDispatcher.trigger({"type":Events.REPLAY_SHARE});
		}, 10);
	};

	StartUpCommand.prototype.onDefaultsLoaded = function(data){
		console.log("data.response is ", data.response);
		if(data.success){
			if(data.response){
				if(data.hide){
					this.replaySharedFile(data.response);
				}
				else{
					this.loadFile(data.response);
				}
			}
			else{
				this.toActivity();
				this.loadChallenges();
			}
		}
		else{
			this.toActivity();
			this.eventDispatcher.trigger({"type":Events.SHOW_ALL});
			this.loadChallenges();
		}
	};

	StartUpCommand.prototype.execute = function(){
		this.storage.loadDefaults(this.onDefaultsLoaded.bind(this));
	};
	
  	return StartUpCommand;
});



