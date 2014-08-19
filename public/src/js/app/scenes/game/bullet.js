define(['app/game'], function(Game){
	
	"use strict";
	
	var Bullet = function(x, y){
		Phaser.Sprite.call(this, Game.getInstance(), x, y, 'bullet');
		Game.pauseSignal.add(this.pauseChanged, this);
		this.vx = Bullet.VELX;
	};
	
	Bullet.VELX = -250;
	
	Bullet.prototype = Object.create(Phaser.Sprite.prototype);
	Bullet.prototype.constructor = Bullet;
	
	Bullet.prototype.create = function(){
		Phaser.Sprite.prototype.create.call(this);
		Game.getInstance().physics.enable(this, Phaser.Physics.ARCADE);
		this.enableBody = true;
		this.body.gravity.y = 0;
		this.body.allowGravity = false;
		this.body.velocity.y = 0;
		this.exists = true;
		this.body.velocity.x = this.vx;
	};
	
	Bullet.prototype.pauseChanged = function(){
		var paused = Game.physicsPaused;
		if(paused){
			this.pause();
		}
		else{
			this.unPause();
		}
	};
	
	Bullet.prototype.pause = function () {
		this.vx = 0;
	};
	
	Bullet.prototype.unPause = function () {
		this.vx = Bullet.VELX;
	};
	
	Bullet.prototype.destroy = function(){
		Game.pauseSignal.removeAll(this);
		Phaser.Sprite.prototype.destroy.call(this);
	};
	
	Bullet.prototype.update = function(){
		this.body.velocity.x = this.vx;
		Phaser.Sprite.prototype.update.call(this);
	};
	
	return Bullet;
	
});


	
