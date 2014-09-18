define( ['phasercomponents', 

	'app/prog/controller/abstractplaycontroller', 'app/models/modelfacade'],

	function(PhaserComponents,

		AbstractPlayController, ModelFacade){
	
	"use strict";

	var LoopPlayController = function(parent){
		AbstractPlayController.call(this, parent);
	};

	PhaserComponents.Utils.extends(LoopPlayController, AbstractPlayController);

	LoopPlayController.prototype.addCommands = function(commands){
		var rpt, i, j, that = this, command;
		rpt = ModelFacade.getInstance().get(ModelFacade.PROG_NUM).get() + 1;
		for(i = 1; i <= rpt; i++){
			for(j = 0; j < commands.length; j++){
				command = commands[j];
				if(command){
					that.parent.addCommand(command.direction, command.type, command.total);
				}
			}
		}
	};

	return LoopPlayController;
});

