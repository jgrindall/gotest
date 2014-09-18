
define(['phasercomponents', 'app/models/modelfacade', 'app/assets'

],

function(PhaserComponents, ModelFacade, Assets){
	
	"use strict";
	
	var ProgNumButton  = function(options){
		PhaserComponents.Display.StepperButton.call(this, options);
	};

	ProgNumButton.WIDTH = 50;
	ProgNumButton.HEIGHT = 50;
	
	PhaserComponents.Utils.extends(ProgNumButton, PhaserComponents.Display.StepperButton);

	return ProgNumButton;
});
	
	
