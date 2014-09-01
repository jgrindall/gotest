
define('app/components/movieclip',['app/game'], function(Game){
	
	"use strict";
	
	var MovieClip = function(options){
		this.options = options;
		this.create();
	};
	
	MovieClip.prototype.goTo = function(i){
		this.sprite.animations.play('frame'+i);
	};

	MovieClip.prototype.create = function(){
		var i;
		this.sprite = new Phaser.Sprite(Game.getInstance(), this.options.bounds.x, this.options.bounds.y, this.options.asset);
		for(i = 0; i<= this.options.num - 1; i++){
			this.sprite.animations.add('frame'+i, [i], 500, true);
		}
		this.goTo(this.options.defaultFrame);
	};
	
	MovieClip.prototype.destroy = function(){
		this.options = null;
		this.sprite.destroy(true);
	};

	return MovieClip;

});

