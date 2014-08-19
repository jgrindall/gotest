
define(['app/game', 'app/scenes/game/bullet'], function(Game, Bullet){
	
	"use strict";
	
	var Bullets = function(options){
		this.options = options;
		this.create();
	};
	
	Bullets.prototype.getFirstExists = function(){
		return this.group.getFirstExists(false);
	};
	
	Bullets.prototype.shoot = function (data) {
		var bullet = this.getFirstExists();
		if(bullet){
			bullet.reset(data.x, data.y);
		}
	};
	
	Bullets.prototype.create = function () {
		this.group = new Phaser.Group(Game.getInstance(), null, 'bullets', false, true, Phaser.Physics.ARCADE);
		this.group.classType = Bullet;
    	this.group.createMultiple(10, 'bullet', 0, false);
    	this.group.setAll('outOfBoundsKill', true);
    	this.group.setAll('checkWorldBounds', true);
	};
	
	Bullets.prototype.destroy = function () {
		this.group.destroy(true);
	};
	
	return Bullets;
	
});



		