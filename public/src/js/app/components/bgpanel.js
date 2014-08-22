
define(['app/game', 'app/components/container',

'app/components/buttons/navbutton', 'app/components/screenchoice', 'app/bgdata',

'app/components/buttongrid'],

function(Game, Container, 

NavButton, ScreenChoice, BgData,

ButtonGrid){
	
	"use strict";
	
	var BgPanel = function(options){
		this.panels = [];
		Container.call(this, options);
		this.signal = new Phaser.Signal();
	};
	
	BgPanel.prototype = Object.create(Container.prototype);
	BgPanel.prototype.constructor = BgPanel;
	
	BgPanel.prototype.create = function(){
		Container.prototype.create.call(this);
		this.addImage();
	};
	
	BgPanel.prototype.select = function(data){
		this.signal.dispatch(data);
	};
	
	BgPanel.prototype.addImage = function(){
		this.sprite = new Phaser.Image(Game.getInstance(), this.bounds.x, this.bounds.y, this.options.bgasset);
		this.sprite.scale = {x:this.bounds.w/this.sprite.width, y:this.bounds.h/this.sprite.height};
		this.group.add(this.sprite);
	};
	
	return BgPanel;

});



