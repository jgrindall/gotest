
define(['phaser', 'phasercomponents', 'app/assets'],

	function(Phaser, PhaserComponents, Assets){
	
	"use strict";
	
	var AbstractMarker = function(options){
		options.asset = Assets.MARKERS;
		options.numFrames = 11;
		PhaserComponents.Display.MovieClip.call(this, options);
		this.sprite.anchor.setTo(0.5, 0.5);
		this.sprite.alpha = 0.5;
		this.model.changeSignal.add(this.onChanged, this);
	};
	
	PhaserComponents.Utils.extends(AbstractMarker, PhaserComponents.Display.MovieClip);

	AbstractMarker.WIDTH = 50;
	AbstractMarker.HEIGHT = 50;

	AbstractMarker.prototype.onChanged = function(value){
		this.goTo(value);
	};

	AbstractMarker.prototype.goTo = function(i){
		PhaserComponents.Display.MovieClip.prototype.goTo.call(this, i);
		this.game.add.tween(this.sprite.scale).to( {'x':1.2, 'y':1.2}, 200, Phaser.Easing.Back.InOut, true, 0, false);
		this.game.add.tween(this.sprite.scale).to( {'x':1, 'y':1}, 200, Phaser.Easing.Back.InOut, true, 203, false);
	};
	
	return AbstractMarker;

});

