define(['phasercomponents', 'base/views/popups/challengegrowl',

	'base/models/modelconsts', 'base/consts/challengedata', 'base/assets'],

function(PhaserComponents, ChallengeGrowl,

	ModelConsts, ChallengeData, Assets) {
	
	"use strict";
	
	var HelpCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	HelpCommand.MESSAGE = "Choose a background and use the commands\nto move around. Try using the flow charts to\nlearn about programming, and choose a\nchallenge to test yourself";

	PhaserComponents.Utils.extends(HelpCommand, PhaserComponents.Commands.AbstractCommand);

	HelpCommand.prototype.onClick = function(data){
		var index = this.modelFacade.get(ModelConsts.CHALLENGE).get();
		if(data.index === 2){
			if(index === null){
				this.eventDispatcher.trigger({"type":PhaserComponents.Events.AppEvents.PLAY_SOUND, "data":ChallengeData.HELP_VOICEOVER});
			}
			else{
				this.eventDispatcher.trigger({"type":PhaserComponents.Events.AppEvents.PLAY_SOUND, "data":ChallengeData.VOICEOVER[index]});
			}
		}
		else{
			this.alertManager.close();
			this.eventDispatcher.trigger({"type":PhaserComponents.Events.AppEvents.PLAY_SOUND, "data":null});
		}
	};

	HelpCommand.prototype.execute = function(){
		var msg, title, index = this.modelFacade.get(ModelConsts.CHALLENGE).get();
		if(index !== null){
			msg = ChallengeData.MESSAGES[index];
			title = "Challenge";
		}
		else{
			msg = HelpCommand.MESSAGE;
			title = "Help";
		}
		this.alertManager.make(ChallengeGrowl, {"title":title, "label":msg, "sfx":Assets.SOUNDS[2]}, this.onClick.bind(this));
	};
	
  	return HelpCommand;
});
