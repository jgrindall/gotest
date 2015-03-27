
define(['phaser', 'phasercomponents', 'base/assets'

],

function(Phaser, PhaserComponents, Assets

){
	
	"use strict";
	
	var TurtleChoice = function(options){
		options.asset = Assets.TURTLE_CHOICE;
		options.numFrames = 20;
		PhaserComponents.Display.Container.call(this, options);
		this.mouseUpSignal = new Phaser.Signal();
	};
	
	TurtleChoice.WIDTH = 	50;
	TurtleChoice.HEIGHT = 	50;
	
	PhaserComponents.Utils.extends(TurtleChoice, PhaserComponents.Display.Container);

	TurtleChoice.prototype.create = function(){
		PhaserComponents.Display.Container.prototype.create.call(this);
		this.addBg();
	};
	
	TurtleChoice.prototype.select = function(){
		this.panel.view.alpha = 1;
		this.panel.goTo(2*this.options.index + 1);
	};
	
	TurtleChoice.prototype.deselect = function(){
		this.panel.view.alpha = 0.6;
		this.panel.goTo(2*this.options.index);
	};
	
	TurtleChoice.prototype.mouseUp = function(){
		this.mouseUpSignal.dispatch({"target":this});
	};
	
	TurtleChoice.prototype.addBg = function(){
		this.panel = new PhaserComponents.Display.MovieClip(this.options);
		this.panel.enableInput();
		this.panel.mouseUpSignal.add(this.mouseUp, this);
		this.group.add(this.panel.view);
		this.deselect();
	};
	
	TurtleChoice.prototype.destroy = function(){
		this.panel.mouseUpSignal.remove(this.mouseUp, this);
		this.group.remove(this.panel);
		this.panel.destroy(true);
		PhaserComponents.Display.Container.prototype.destroy.call(this);
	};
	
	return TurtleChoice;

});



