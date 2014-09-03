
define('app/views/controls/radiobuttons',['app/game', 'app/components/buttons/radiobutton',

'phasercomponents'

],

function(Game, RadioButton,

PhaserComponents

){
	
	"use strict";
	
	var RadioButtons  = function(options){
		options.buttonClass = RadioButton;
		options.numX = 1;
		options.numY = 2;
		options.data = [{'num':0}, {'num':1}];
		PhaserComponents.ButtonBar.call(this, Game.getInstance(), options);
	};
	
	RadioButtons.WIDTH = 120;
	RadioButtons.HEIGHT = 120;

	RadioButtons.prototype = Object.create(PhaserComponents.ButtonBar.prototype);
	RadioButtons.prototype.constructor = RadioButtons;
	
	return RadioButtons;

});
	
