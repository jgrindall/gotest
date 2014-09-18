define( ['phasercomponents', 'app/prog/abstractplaycontroller'],

	function(PhaserComponents, AbstractPlayController){
	
	"use strict";

	var LinearPlayController = function(parent){
		AbstractPlayController.call(this, parent);
	};

	PhaserComponents.Utils.extends(LinearPlayController, AbstractPlayController);

	return LinearPlayController;
});

