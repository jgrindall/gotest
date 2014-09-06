
define('app/components/bgpanel',[ 'phasercomponents', 'phaser'

],

function(PhaserComponents, Phaser

){
	
	"use strict";
	
	var BgPanel = function(options){
		PhaserComponents.Display.Container.call(this, options);
	};
	
	BgPanel.prototype = Object.create(PhaserComponents.Display.Container.prototype);
	BgPanel.prototype.constructor = BgPanel;
	
	BgPanel.prototype.create = function(){
		PhaserComponents.Display.Container.prototype.create.call(this);
		this.addImage();
	};
	
	BgPanel.prototype.addImage = function(){
		this.sprite = new Phaser.Image(this.game, this.bounds.x, this.bounds.y, this.options.bgasset);
		this.sprite.scale = {x:this.bounds.w/this.sprite.width, y:this.bounds.h/this.sprite.height};
		this.group.add(this.sprite);
	};
	
	return BgPanel;

});



