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
		console.log("loadFile!!", data);
		var that = this;
		this.toActivity();
		this.eventDispatcher.trigger({"type":Events.SHOW_ALL});
		setTimeout(function(){
			that.modelFacade.setData(data);
			that.eventDispatcher.trigger({"type":Events.REPLAY});
		}, 10);
	};

	StartUpCommand.prototype.onDefaultsLoaded = function(data){
		console.log("onDefaultsLoaded", data);
		if(data.success){
			if(data.response){
				console.log("loadFile", data.response);
				this.loadFile(data.response);
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



