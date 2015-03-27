
define(['phasercomponents', 'base/assets', 'phaser'],

	function(PhaserComponents, Assets, Phaser){
	
	"use strict";
	
	var ArrowButton = function(options){
		var frame0;
		options = options || {'data':{'num':0}};
		options.asset = Assets.LEFTRIGHT;
		frame0 = (4 * options.data.num);
		options.frames = [frame0, frame0 + 1, frame0 + 2, frame0 + 3];
		PhaserComponents.Display.AbstractButton.call(this, options);
		this.view.alpha = 0;
		this.sprite.visible = options.data.visible;
		this.stopTweens();
		this.tween0 = this.game.add.tween(this.view).to( {'alpha': 1}, 600, Phaser.Easing.Linear.None, true, 600, false);
		this.tween0.onComplete.add(this.tweenDone, this);
	};
	
	ArrowButton.WIDTH = 50;
	ArrowButton.HEIGHT = 50;
	
	PhaserComponents.Utils.extends(ArrowButton, PhaserComponents.Display.AbstractButton);

	ArrowButton.prototype.stopTweens = function(){
		PhaserComponents.Display.AbstractButton.prototype.stopTweens.call(this);
		if(this.tween0){
			this.tween0.stop();
			this.tween0.onComplete.remove(this.tweenDone, this);
		}
		this.tween0 = null;
	};

	ArrowButton.prototype.tweenDone = function(){
		this.stopTweens();
		if(this.options.data.num === 0){
			this.disableInput();
		}
	};

	return ArrowButton;
	
});

