define( ['phaser', 'app/consts/progtypes',

	'app/prog/dropview', 'app/consts/proglayout', 'app/assets',

	'phasercomponents', 'app/prog/abstractplaycontroller'],

	function(Phaser, ProgTypes,

		DropView, ProgLayout, Assets,

		PhaserComponents, AbstractPlayController){
	
	"use strict";

	var LinearPlayController = function(parent){
		AbstractPlayController.call(this, parent);
	};

	PhaserComponents.Utils.extends(LinearPlayController, AbstractPlayController);

	return LinearPlayController;
});

