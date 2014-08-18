
define(['app/components/buttons/abstractbutton'], function(AbstractButton){
	
	"use strict";
	
	var BulbButton = function(options){
		options.asset = 'bulb';
		AbstractButton.call(this, options);
	};
	
	BulbButton.prototype = Object.create(AbstractButton.prototype);
	BulbButton.prototype.constructor = BulbButton;
	
	BulbButton.WIDTH = 120;
	BulbButton.HEIGHT = 120;
	
	return BulbButton;
	
});

