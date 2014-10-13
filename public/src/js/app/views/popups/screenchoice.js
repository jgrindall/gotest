
define(['phaser', 'phasercomponents', 'app/assets'

],

function(Phaser, PhaserComponents, Assets

){
	
	"use strict";
	
	var ScreenChoice = function(options){
		options.asset = Assets.GAME_SCREEN;
		options.numFrames = 4;
		PhaserComponents.Display.Container.call(this, options);
		this.mouseUpSignal = new Phaser.Signal();
	};
	
	ScreenChoice.WIDTH = 225;
	ScreenChoice.HEIGHT = 250;
	
	PhaserComponents.Utils.extends(ScreenChoice, PhaserComponents.Display.Container);

	ScreenChoice.prototype.create = function(){
		PhaserComponents.Display.Container.prototype.create.call(this);
		this.addBg();
	};
	
	ScreenChoice.prototype.select = function(){
		this.panel.view.alpha = 1;
	};
	
	ScreenChoice.prototype.deselect = function(){
		this.panel.view.alpha = 0.3;
	};
	
	ScreenChoice.prototype.mouseUp = function(){
		this.mouseUpSignal.dispatch({"target":this});
	};
	
	ScreenChoice.prototype.addBg = function(){
		this.panel = new PhaserComponents.Display.MovieClip(this.options);
		this.panel.enableInput();
		this.panel.mouseUpSignal.add(this.mouseUp, this);
		this.group.add(this.panel.view);
		this.panel.goTo(this.options.index);
	};
	
	ScreenChoice.prototype.destroy = function(){
		this.panel.mouseUpSignal.remove(this.mouseUp, this);
		this.group.remove(this.panel);
		this.panel.destroy(true);
		PhaserComponents.Display.Container.prototype.destroy.call(this);
	};
	
	return ScreenChoice;

});


