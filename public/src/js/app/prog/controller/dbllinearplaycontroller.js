
define( ['phasercomponents', 'app/prog/abstractplaycontroller'],

	function(PhaserComponents, AbstractPlayController){
	
	"use strict";

	var DblLinearPlayController = function(parent){
		AbstractPlayController.call(this, parent);
	};

	PhaserComponents.Utils.extends(DblLinearPlayController, AbstractPlayController);

	return DblLinearPlayController;
});

