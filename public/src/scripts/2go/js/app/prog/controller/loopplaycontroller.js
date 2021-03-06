define( ['phasercomponents', 

	'base/prog/controller/abstractplaycontroller',

	'base/models/modelconsts'],

	function(PhaserComponents,

		AbstractPlayController,

		ModelConsts){
	
	"use strict";

	var LoopPlayController = function(parent){
		AbstractPlayController.call(this, parent);
	};

	PhaserComponents.Utils.extends(LoopPlayController, AbstractPlayController);

	LoopPlayController.prototype.addCommands = function(commands){
		var rpt, i, j, that = this, command, len;
		len = commands.length;
		rpt = this.parent.modelFacade.get(ModelConsts.PROG_NUM).get() + 1;
		if(rpt === 9){
			alert("An error occurred");
			throw "Error";
		}
		for(i = 1; i <= rpt; i++){
			for(j = 0; j < len; j++){
				command = commands[j];
				if(command){
					that.parent.addCommands(command.direction, command.type, command.total);
				}
			}
		}
	};

	return LoopPlayController;
});

