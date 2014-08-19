
define(['app/scenes/game/character', 'app/game'], function(Character, Game){
	
	"use strict";
	
	var Enemy = function(options){
		options.asset = 'enemy';
		this.prevx = 0;
		Character.call(this, options);
		this.create();
	};

	Enemy.prototype = Object.create(Character.prototype);
	Enemy.prototype.constructor = Enemy;

	Enemy.prototype.makeSprite = function () {
		Character.prototype.makeSprite.call(this);
		this.body.bounce.x = 1;
		this.body.bounce.y = 0;
		this.sprite.animations.add('left', [0, 1, 2, 3], 10, true);
	    this.sprite.animations.add('right', [0, 1, 2, 3], 10, true);
	};
	
	Enemy.prototype.update = function() {
		var vx = this.body.velocity.x;
		if(vx > 0 && this.prevx <= 0){
	    	this.sprite.animations.play('left');
	    }
	    else if(vx < 0 && this.prevx <= 0){
	    	this.sprite.animations.play('right');
	    }
	   	this.prevx = vx;
	};
	
	Enemy.prototype.destroy = function () {
		Character.prototype.destroy.call(this, arguments);
	};
	
	return Enemy;
});
	
