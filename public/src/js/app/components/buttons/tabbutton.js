
define('app/components/buttons/tabbutton',['phasercomponents'],function(PhaserComponents){
	
	"use strict";
	
	var TabButton = function(options){
		var num = options.index || '1';
		options.asset = Assets.TABBUTTON + num;
		PhaserComponents.AbstractButton.call(this, this.game, options);
	};
	
	TabButton.WIDTH = 244;
	TabButton.HEIGHT = 52;
	
	TabButton.prototype = Object.create(PhaserComponents.AbstractButton.prototype);
	TabButton.prototype.constructor = TabButton;
	
	return TabButton;

});







