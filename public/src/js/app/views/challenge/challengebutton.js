
define(['phaser', 'phasercomponents', 'app/assets'

],

function(Phaser, PhaserComponents, Assets

){
	
	"use strict";
	
	var ChallengeButton = function(options){
		options.asset = Assets.CHALLENGES;
		options.numFrames = 8;
		PhaserComponents.Display.Container.call(this, options);
		this.mouseUpSignal = new Phaser.Signal();
	};
	
	ChallengeButton.WIDTH = 175;
	ChallengeButton.HEIGHT = 175;
	
	PhaserComponents.Utils.extends(ChallengeButton, PhaserComponents.Display.Container);

	ChallengeButton.prototype.create = function(){
		PhaserComponents.Display.Container.prototype.create.call(this);
		this.addBg();
	};
	
	ChallengeButton.prototype.select = function(){
		this.panel.view.alpha = 1;
	};
	
	ChallengeButton.prototype.deselect = function(){
		this.panel.view.alpha = 0.4;
	};
	
	ChallengeButton.prototype.mouseUp = function(){
		this.mouseUpSignal.dispatch({"target":this});
	};
	
	ChallengeButton.prototype.addBg = function(){
		this.panel = new PhaserComponents.Display.MovieClip(this.options);
		this.panel.enableInput();
		this.panel.mouseUpSignal.add(this.mouseUp, this);
		this.group.add(this.panel.view);
		this.panel.goTo(this.options.index);
	};
	
	ChallengeButton.prototype.destroy = function(){
		this.panel.mouseUpSignal.remove(this.mouseUp, this);
		this.group.remove(this.panel);
		this.panel.destroy(true);
		PhaserComponents.Display.Container.prototype.destroy.call(this);
	};
	
	return ChallengeButton;

});



