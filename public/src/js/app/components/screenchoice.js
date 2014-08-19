
define(['app/game', 'app/components/container',

'app/components/buttons/navbutton', 'app/components/buttons/interactivesprite'],

function(Game, Container,

NavButton, InteractiveSprite){
	
	"use strict";
	
	var ScreenChoice = function(options){
		Container.call(this, options);
		options.bgasset = 'smallpanel'
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
		console.log(" ---- click on screen choice");
		this.mouseUpSignal.dispatch({"target":this});
	};
	
	ScreenChoice.prototype.addBg = function(){
		console.log("addBg screenchoice");
		this.panel = new InteractiveSprite(Game.getInstance(), this.bounds.x, this.bounds.y, this.options.bgasset);
		this.panel.name = "screen choice"
		this.panel.enableInput();
		console.log("addBg enabled " + this.panel.mouseUpSignal);
		this.panel.mouseUpSignal.add(this.mouseUp, this);
		console.log("addBg enabled " + this.panel.mouseUpSignal);
		this.group.add(this.panel);
		console.log("addBg added");
	};
	
	ScreenChoice.prototype.destroy = function(){
		this.panel.destroy(true);
	};
	
	return ScreenChoice;

});



