
define('app/components/background',['phaser', 'phasercomponents'],

	function(Phaser, PhaserComponents){
	
	"use strict";
	
	var Background = function(options){
		PhaserComponents.View.call(this);
		this.options = options;
		this.create();
	};
	
	Background.prototype = Object.create(PhaserComponents.View.prototype);
	Background.prototype.constructor = Background;

	Background.prototype.destroy = function(){
		this.sprite.destroy(true);
		this.sprite = null;
		this.game = null;
		PhaserComponents.View.prototype.destroy.call(this);
	};
	
	Background.prototype.create = function(){
    	this.sprite = new Phaser.TileSprite(this.game, this.options.bounds.x, this.options.bounds.y, this.options.bounds.w, this.options.bounds.h, this.options.asset);
	    this.sprite.fixedToCamera = true;
	};
	
	return Background;

});




