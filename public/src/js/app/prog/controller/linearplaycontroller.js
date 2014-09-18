define( ['phasercomponents', 'app/prog/controller/abstractplaycontroller'],

	function(PhaserComponents, AbstractPlayController){
	
	"use strict";

	var LinearPlayController = function(parent){
		AbstractPlayController.call(this, parent);
	};

	PhaserComponents.Utils.extends(LinearPlayController, AbstractPlayController);

	return LinearPlayController;
});

