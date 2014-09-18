
define( ['phasercomponents', 'app/prog/controller/abstractplaycontroller'],

	function(PhaserComponents, AbstractPlayController){
	
	"use strict";

	var DblLinearPlayController = function(parent){
		AbstractPlayController.call(this, parent);
	};

	PhaserComponents.Utils.extends(DblLinearPlayController, AbstractPlayController);

	return DblLinearPlayController;
});

