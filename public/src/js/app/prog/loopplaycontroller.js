define( ['phaser', 'phasercomponents', 'app/consts/progtypes',

	'app/prog/dropview', 'app/consts/proglayout',

	'app/assets', 'app/prog/abstractplaycontroller', 'app/models/modelfacade'],

	function(Phaser, PhaserComponents, ProgTypes,

		DropView, ProgLayout,

		Assets, AbstractPlayController, ModelFacade){
	
	"use strict";

	var LoopPlayController = function(parent){
		AbstractPlayController.call(this, parent);
	};

	PhaserComponents.Utils.extends(LoopPlayController, AbstractPlayController);

	LoopPlayController.prototype.addCommands = function(commands){
		var rpt, i, that = this;
		rpt = ModelFacade.getInstance().get(ModelFacade.PROG_NUM).get() + 1;
		for(i = 1; i <= rpt; i++){
			commands.forEach(function(command){
				if(command){
					that.parent.addCommand(command.direction, command.type, command.total);
				}
			});
		}
	};

	return LoopPlayController;
});

