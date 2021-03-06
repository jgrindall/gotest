
define(['phaser', 'phasercomponents'],

	function(Phaser, PhaserComponents){
	
	"use strict";
	
	var Background = function(options){
		PhaserComponents.Display.View.call(this, options);
	};
	
	PhaserComponents.Utils.extends(Background, PhaserComponents.Display.View);

	Background.prototype.destroy = function(){
		this.sprite.destroy(true);
		this.sprite = null;
		this.game = null;
		PhaserComponents.Display.View.prototype.destroy.call(this);
	};
	
	Background.prototype.create = function(){
    	this.sprite = new Phaser.TileSprite(this.game, this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h, this.options.asset);
	    this.sprite.fixedToCamera = true;
	};
	
	return Background;

});




