
define(['app/game', 'app/components/container', 'app/components/buttons/navbutton'],

function(Game, Container, NavButton){
	
	"use strict";
	
	var ScreenPanel = function(options){
		Container.call(this, options);
		this.signal = new Phaser.Signal();
		this.create();
	};
	
	ScreenPanel.prototype = Object.create(Container.prototype);
	ScreenPanel.prototype.constructor = ScreenPanel;
	
	ScreenPanel.prototype.create = function(){
		Container.prototype.create.call(this);
		this.addBg();
		this.addPanel();
	};
	
	ScreenPanel.prototype.addPanel = function(){
		this.bg = new Phaser.Sprite(Game.getInstance(), this.bounds.x, this.bounds.y, this.options.bgAsset);
		this.group.add(this.bg);
	};
	
	ScreenPanel.prototype.addBg = function(){
		this.button = new NavButton({"bounds":{'x':100, 'y':100}});
		this.group.add(this.button.sprite);
	};
	
	return ScreenPanel;

});



