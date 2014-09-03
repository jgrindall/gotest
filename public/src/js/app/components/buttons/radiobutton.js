
define('app/components/buttons/radiobutton',['app/game', 'phasercomponents'],

function(Game, PhaserComponents){
	
	"use strict";
	
	var RadioButton = function(options){
		options.asset = 'radio';
		PhaserComponents.AbstractButton.call(this, Game.getInstance(), options);
	};

	RadioButton.WIDTH = 120;
	RadioButton.HEIGHT = 60;

	RadioButton.prototype = Object.create(PhaserComponents.AbstractButton.prototype);
	RadioButton.prototype.constructor = RadioButton;

	return RadioButton;

});


