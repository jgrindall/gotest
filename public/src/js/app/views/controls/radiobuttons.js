
define('app/views/controls/radiobuttons',['app/components/buttons/radiobutton',

'app/components/buttongrid/buttonbar', 'app/models/modelfacade',

'app/consts/playingstate'],

function(RadioButton,

ButtonBar, ModelFacade,

PlayingState){
	
	"use strict";
	
	var RadioButtons  = function(options){
		options.buttonClass = RadioButton;
		options.numX = 1;
		options.numY = 2;
		options.data = [{'num':0}, {'num':1}];
		ButtonBar.call(this, options);
	};
	
	RadioButtons.WIDTH = 120;
	RadioButtons.HEIGHT = 120;
	
	RadioButtons.prototype = Object.create(ButtonBar.prototype);
	RadioButtons.prototype.constructor = RadioButtons;
	
	return RadioButtons;

});
	
