
define(

	['phasercomponents', 'app/assets'],

	function(PhaserComponents, Assets){
	
	"use strict";
	
	var PlayButton = function(options){
		options.disabledAlpha = 1;
		options.asset = Assets.PLAY_BUTTON;
		PhaserComponents.Display.AbstractButton.call(this, options);
	};

	PlayButton.WIDTH = 100;
	PlayButton.HEIGHT = 50;

	PhaserComponents.Utils.extends(PlayButton, PhaserComponents.Display.AbstractButton);

	PlayButton.prototype.enableInput = function(){
		PhaserComponents.Display.AbstractButton.prototype.enableInput.call(this);
		this.goToFrame(0);
	};
	
	PlayButton.prototype.disableInput = function(){
		PhaserComponents.Display.AbstractButton.prototype.disableInput.call(this);
		this.goToFrame(3);
	};


	return PlayButton;

});









