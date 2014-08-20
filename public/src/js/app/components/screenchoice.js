
define(['app/game', 'app/components/container',

'app/components/buttons/navbutton', 'app/components/buttons/interactivesprite'],

function(Game, Container,

NavButton, InteractiveSprite){
	
	"use strict";
	
	var ScreenChoice = function(options){
		Container.call(this, options);
		options.bgasset = 'smallpanel';
		this.mouseUpSignal = new Phaser.Signal();
		this.create();
	};
	
	ScreenChoice.WIDTH = 200;
	ScreenChoice.HEIGHT = 300;
	
	ScreenChoice.prototype = Object.create(Container.prototype);
	ScreenChoice.prototype.constructor = ScreenChoice;
	
	ScreenChoice.prototype.create = function(){
		Container.prototype.create.call(this);
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
		this.panel = new InteractiveSprite(Game.getInstance(), this.bounds.x, this.bounds.y, this.options.bgasset);
		this.panel.name = "screen choice";
		this.panel.enableInput();
		this.panel.mouseUpSignal.add(this.mouseUp, this);
		this.group.add(this.panel);
	};
	
	ScreenChoice.prototype.destroy = function(){
		this.panel.destroy(true);
	};
	
	return ScreenChoice;

});


