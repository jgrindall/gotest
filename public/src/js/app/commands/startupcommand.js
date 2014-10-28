define(['phasercomponents', 'app/events/events',

	'app/utils/error', 'app/utils/errorcodes', 'app/consts/appconsts'],

function(PhaserComponents, Events,

	Error, ErrorCodes, AppConsts) {
	
	"use strict";
	
	var StartUpCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};

	StartUpCommand.CHALLENGES = true;

	PhaserComponents.Utils.extends(StartUpCommand, PhaserComponents.Commands.AbstractCommand);

	StartUpCommand.prototype.toScene = function(key){
		this.eventDispatcher.trigger({"type":PhaserComponents.Events.AppEvents.CHANGE_SCENE, "data":{"sceneTo":key}});
	};

	StartUpCommand.prototype.toActivity = function(){
		this.toScene(AppConsts.ACTIVITY_SCENE);
	};

	StartUpCommand.prototype.onDefaultsError = function(){
		var that = this;
		setTimeout(function(){
			Error.show(that.alertManager, ErrorCodes.LOAD_DEFAULTS_ERROR);
		}, 100);
	};

	StartUpCommand.prototype.loadChallenges = function(){
		var that = this;
		setTimeout(function(){
			if(StartUpCommand.CHALLENGES){
				that.eventDispatcher.trigger({"type":Events.SHOW_CHALLENGES});
			}
			else{
				that.eventDispatcher.trigger({"type":Events.SHOW_ALL});
			}
		}, 100);
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
			this.onDefaultsError();
		}
	};

	StartUpCommand.prototype.execute = function(){
		this.storage.loadDefaults(this.onDefaultsLoaded.bind(this));
	};
	
  	return StartUpCommand;
});



