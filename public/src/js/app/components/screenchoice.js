
define(['app/game', 'app/components/container', 'app/components/buttons/navbutton'],

function(Game, Container, NavButton){
	
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
	
	ScreenChoice.prototype.addBg = function(){
		this.panel = new Phaser.Sprite(Game.getInstance(), this.bounds.x, this.bounds.y, this.options.bgasset);
		this.group.add(this.panel);
	};
	
	return ScreenChoice;

});



