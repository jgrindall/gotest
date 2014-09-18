
define( ['app/prog/dropview', 'phasercomponents',

	'app/consts/proglayout', 'app/assets', 'app/prog/abstractplaycontroller'],

	function(DropView, PhaserComponents,

		ProgLayout, Assets, AbstractPlayController){
	
	"use strict";

	var DblLinearPlayController = function(parent){
		AbstractPlayController.call(this, parent);
	};

	PhaserComponents.Utils.extends(DblLinearPlayController, AbstractPlayController);

	return DblLinearPlayController;
});

