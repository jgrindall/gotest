
define(['phaser', 'phasercomponents', 'app/assets'

],

function(Phaser, PhaserComponents, Assets

){
	
	"use strict";
	
	var TurtleChoice = function(options){
		options.asset = Assets.TURTLE_CHOICE;
		options.numFrames = 7;
		PhaserComponents.Display.Container.call(this, options);
		this.mouseUpSignal = new Phaser.Signal();
	};
	
	TurtleChoice.WIDTH = 	45;
	TurtleChoice.HEIGHT = 	45;
	
	PhaserComponents.Utils.extends(TurtleChoice, PhaserComponents.Display.Container);

	TurtleChoice.prototype.create = function(){
		PhaserComponents.Display.Container.prototype.create.call(this);
		this.addBg();
	};
	
	TurtleChoice.prototype.select = function(){
		this.panel.view.alpha = 1;
	};
	
	TurtleChoice.prototype.deselect = function(){
		this.panel.view.alpha = 0.3;
	};
	
	TurtleChoice.prototype.mouseUp = function(){
		this.mouseUpSignal.dispatch({"target":this});
	};
	
	TurtleChoice.prototype.addBg = function(){
		this.panel = new PhaserComponents.Display.MovieClip(this.options);
		this.panel.enableInput();
		this.panel.mouseUpSignal.add(this.mouseUp, this);
		this.group.add(this.panel.view);
		this.panel.goTo(this.options.index);
	};
	
	TurtleChoice.prototype.destroy = function(){
		this.panel.mouseUpSignal.remove(this.mouseUp, this);
		this.group.remove(this.panel);
		this.panel.destroy(true);
		PhaserComponents.Display.Container.prototype.destroy.call(this);
	};
	
	return TurtleChoice;

});



