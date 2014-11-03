define(

	['phasercomponents', 'app/consts/defaults', 'app/events/events',

	'app/views/popups/growl', 'app/assets', 'app/models/modelconsts', 'app/consts/challengedata'],

function(PhaserComponents, Defaults, Events, 

Growl, Assets, ModelConsts, ChallengeData) {
	
	"use strict";
	
	var ChooseChallengeCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(ChooseChallengeCommand, PhaserComponents.Commands.AbstractCommand);

	ChooseChallengeCommand.prototype.execute = function(data){
		var json, that = this;
		this.modelFacade.get(ModelConsts.CHALLENGE).set(data.selection);
		json = Defaults.getChallenge(data.selection);
		this.eventDispatcher.trigger({"type":Events.REWIND});
		this.modelFacade.setData(json);
		this.eventDispatcher.trigger({"type":Events.SHOW_ALL});
		setTimeout(function(){
			that.alertManager.make(Growl, {"title":"Challenge", "label":ChallengeData.MESSAGES[data.selection], "sfx":Assets.SOUNDS[2]}, null);
		}, 400);
	};
	
  	return ChooseChallengeCommand;
});


	