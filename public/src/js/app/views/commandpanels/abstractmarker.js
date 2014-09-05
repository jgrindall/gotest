
define('app/views/commandpanels/abstractmarker',['phaser', 'phasercomponents'],

	function(Phaser,PhaserComponents){
	
	"use strict";
	
	var AbstractMarker = function(options){
		options.defaultFrame = 4;
		options.asset = 'markers';
		options.num = 11;
		PhaserComponents.MovieClip.call(this, options);
		this.sprite.anchor.setTo(0.5, 0.5);
		this.sprite.alpha = 0.5;
	};
	
	AbstractMarker.prototype = Object.create(PhaserComponents.MovieClip.prototype);
	AbstractMarker.prototype.constructor = AbstractMarker;
	
	AbstractMarker.WIDTH = 50;
	AbstractMarker.HEIGHT = 50;

	AbstractMarker.prototype.goTo = function(i){
		PhaserComponents.MovieClip.prototype.goTo.call(this, i);
		this.game.add.tween(this.sprite.scale).to( {'x':1.2, 'y':1.2}, 200, Phaser.Easing.Back.InOut, true, 0, false);
		this.game.add.tween(this.sprite.scale).to( {'x':1, 'y':1}, 200, Phaser.Easing.Back.InOut, true, 200, false);
	};
	
	return AbstractMarker;

});

