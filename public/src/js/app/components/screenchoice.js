
define('app/components/screenchoice',['phaser', , 'phasercomponents'

],

function(Phaser, Game, PhaserComponents

){
	
	"use strict";
	
	var ScreenChoice = function(options){
		options.bgasset = 'smallpanel';
		PhaserComponents.Container.call(this, options);
		this.mouseUpSignal = new Phaser.Signal();
	};
	
	ScreenChoice.WIDTH = 225;
	ScreenChoice.HEIGHT = 250;
	
	ScreenChoice.prototype = Object.create(PhaserComponents.Container.prototype);
	ScreenChoice.prototype.constructor = ScreenChoice;
	
	ScreenChoice.prototype.create = function(){
		PhaserComponents.Container.prototype.create.call(this);
		this.addBg();
	};
	
	ScreenChoice.prototype.select = function(){
		this.panel.alpha = 1;
	};
	
	ScreenChoice.prototype.deselect = function(){
		this.panel.alpha = 0.4;
	};
	
	ScreenChoice.prototype.mouseUp = function(){
		this.mouseUpSignal.dispatch({"target":this});
	};
	
	ScreenChoice.prototype.addBg = function(){
		this.panel = new PhaserComponents.InteractiveSprite(Game.getInstance(), this.bounds.x, this.bounds.y, this.options.bgasset, this.options.index);
		this.panel.enableInput();
		this.panel.mouseUpSignal.add(this.mouseUp, this);
		this.group.add(this.panel);
	};
	
	ScreenChoice.prototype.destroy = function(){
		this.panel.mouseUpSignal.remove(this.mouseUp, this);
		this.panel.destroy(true);
		PhaserComponents.Container.prototype.destroy.call(this);
	};
	
	return ScreenChoice;

});



