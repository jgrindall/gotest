
define('app/components/buttons/radiobutton',['app/components/buttons/abstractbutton'],

function(AbstractButton){
	
	"use strict";
	
	var RadioButton = function(options){
		options.asset = 'radio';
		AbstractButton.call(this, options);
	};

	RadioButton.WIDTH = 120;
	RadioButton.HEIGHT = 60;

	RadioButton.prototype = Object.create(AbstractButton.prototype);
	RadioButton.prototype.constructor = RadioButton;

	return RadioButton;

});


