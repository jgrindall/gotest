
define(['app/game', 'app/components/container', 'phaser'

],

function(Game, Container, Phaser

){
	
	"use strict";
	
	var BgPanel = function(options){
		Container.call(this, options);
	};
	
	BgPanel.prototype = Object.create(Container.prototype);
	BgPanel.prototype.constructor = BgPanel;
	
	BgPanel.prototype.create = function(){
		Container.prototype.create.call(this);
		this.addImage();
	};
	
	BgPanel.prototype.addImage = function(){
		this.sprite = new Phaser.Image(Game.getInstance(), this.bounds.x, this.bounds.y, this.options.bgasset);
		this.sprite.scale = {x:this.bounds.w/this.sprite.width, y:this.bounds.h/this.sprite.height};
		this.group.add(this.sprite);
	};
	
	return BgPanel;

});



