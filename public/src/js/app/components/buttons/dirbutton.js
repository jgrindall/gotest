
define('app/components/buttons/dirbutton',['app/components/buttons/abstractbutton'], function(AbstractButton){
	
	"use strict";
	
	var DirButton = function(options){
		var frame0;
		options.asset = 'button';
		frame0 = 4 * options.data.num;
		if(options.data.turn && options.data.num === 3){
			frame0 = 104;
		}
		else if(options.data.turn && options.data.num === 5){
			frame0 = 108;
		}
		options.frames = [frame0, frame0+1, frame0+2, frame0+3];
		AbstractButton.call(this, options);
		this.sprite.visible = options.data.visible;
	};
	
	DirButton.WIDTH = 50;
	DirButton.HEIGHT = 50;
	
	DirButton.prototype = Object.create(AbstractButton.prototype);
	DirButton.prototype.constructor = DirButton;

	return DirButton;
	
});

