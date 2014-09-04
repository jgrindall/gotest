
define('app/components/buttons/arrowbutton',['phasercomponents'], function(PhaserComponents){
	
	"use strict";
	
	var ArrowButton = function(options){
		var frame0;
		options.asset = 'button';
		frame0 = 29 * 4 +  (4 * options.data.num);
		options.frames = [frame0, frame0+1, frame0+2, frame0+3];
		PhaserComponents.AbstractButton.call(this, options);
		this.sprite.visible = options.data.visible;
	};
	
	ArrowButton.WIDTH = 50;
	ArrowButton.HEIGHT = 50;
	
	ArrowButton.prototype = Object.create(PhaserComponents.AbstractButton.prototype);
	ArrowButton.prototype.constructor = ArrowButton;

	return ArrowButton;
	
});

