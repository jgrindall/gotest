
define(['phaser', 'phasercomponents', 'base/assets'

],

function(Phaser, PhaserComponents, Assets

){
	
	"use strict";
	
	var ChallengeButton = function(options){
		options.asset = Assets.CHALLENGES;
		options.numFrames = 16;
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
		this.panel.goTo(2*this.options.index + 1);
	};
	
	ChallengeButton.prototype.deselect = function(){
		this.panel.goTo(2*this.options.index);
	};
	
	ChallengeButton.prototype.mouseUp = function(){
		this.mouseUpSignal.dispatch({"target":this});
	};
	
	ChallengeButton.prototype.addBg = function(){
		this.panel = new PhaserComponents.Display.MovieClip(this.options);
		this.panel.enableInput();
		this.panel.mouseUpSignal.add(this.mouseUp, this);
		this.group.add(this.panel.view);
		this.deselect();
	};
	
	ChallengeButton.prototype.destroy = function(){
		this.panel.mouseUpSignal.remove(this.mouseUp, this);
		this.group.remove(this.panel);
		this.panel.destroy(true);
		PhaserComponents.Display.Container.prototype.destroy.call(this);
	};
	
	return ChallengeButton;

});


