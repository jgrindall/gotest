define(['phasercomponents', 'app/views/popups/challengegrowl',

	'app/models/modelconsts', 'app/consts/challengedata', 'app/assets'],

function(PhaserComponents, ChallengeGrowl,

	ModelConsts, ChallengeData, Assets) {
	
	"use strict";
	
	var HelpCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	HelpCommand.MESSAGE = "Choose a background and use the commands\nto move around. Try using the flow charts to\nlearn about programming, and choose a\nchallenge to test yourself";

	PhaserComponents.Utils.extends(HelpCommand, PhaserComponents.Commands.AbstractCommand);

	HelpCommand.prototype.onClick = function(data){
		if(data.index === 2){
			alert("SOUND PLAYS");
		}
		else{
			this.alertManager.close();
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
