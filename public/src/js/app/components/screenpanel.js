
define(['app/game', 'app/components/container'],

function(Game, Container){
	
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
	};
	
	ScreenPanel.prototype.addBg = function(){
		this.bg = new Phaser.Sprite(Game.getInstance(), this.bounds.x, this.bounds.y, this.options.bgAsset);
		this.group.add(this.bg);
	};
	
	return ScreenPanel;

});



