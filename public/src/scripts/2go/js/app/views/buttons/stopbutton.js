
define(

	['phasercomponents', 'base/assets'],

	function(PhaserComponents, Assets){
	
	"use strict";
	
	var StopButton = function(options){
		options.disabledAlpha = 1;
		options.asset = Assets.STOP_BUTTON;
		options.label = {'key':'button', 'bounds':{'x':2, 'y':15, 'w':80, 'h':40}, 'text':'Stop'};
		PhaserComponents.Display.AbstractButton.call(this, options);
	};

	StopButton.WIDTH = 100;
	StopButton.HEIGHT = 50;

	PhaserComponents.Utils.extends(StopButton, PhaserComponents.Display.AbstractButton);

	StopButton.prototype.enableInput = function(){
		PhaserComponents.Display.AbstractButton.prototype.enableInput.call(this);
		this.goToFrame(0);
	};
	
	StopButton.prototype.disableInput = function(){
		PhaserComponents.Display.AbstractButton.prototype.disableInput.call(this);
		this.goToFrame(3);
	};

	return StopButton;

});









