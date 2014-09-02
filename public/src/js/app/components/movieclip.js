
define('app/components/movieclip', ['phaser'], function(Phaser){
	
	"use strict";
	
	var MovieClip = function(game, options){
		this.options = options;
		this.game = game;
		this.create();
	};
	
	MovieClip.prototype.goTo = function(i){
		this.sprite.animations.play('frame'+i);
	};

	MovieClip.prototype.create = function(){
		var i;
		this.sprite = new Phaser.Sprite(this.game, this.options.bounds.x, this.options.bounds.y, this.options.asset);
		for(i = 0; i<= this.options.num - 1; i++){
			this.sprite.animations.add('frame'+i, [i], 0, true);
		}
		this.goTo(this.options.defaultFrame);
	};
	
	MovieClip.prototype.destroy = function(){
		this.options = null;
		this.sprite.destroy(true);
	};

	return MovieClip;

});

