define(

	['phasercomponents', 'app/models/modelconsts'],

function(PhaserComponents, ModelConsts) {
	
	"use strict";
	
	var CheckChallengeCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(CheckChallengeCommand, PhaserComponents.Commands.AbstractCommand);

	CheckChallengeCommand.prototype.execute = function(data){
		this.modelFacade.get(ModelConsts.CHALLENGE).check(data);
	};
	
  	return CheckChallengeCommand;
});

