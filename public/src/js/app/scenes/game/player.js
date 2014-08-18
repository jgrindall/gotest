
define(['app/scenes/game/character', 'app/scenes/game/objectstate', 'app/game'], function(Character, ObjectState, Game){
	
	"use strict";
	
	var Player = function(options){
		options.asset = 'hero';
		this.dead = false;
		this.deadSignal = new Phaser.Signal();
		Character.call(this, options);
	};

	Player.prototype = Object.create(Character.prototype);
	Player.prototype.constructor = Player;
	
	Player.VELX = 200;
	Player.VELY = 700;
	Player.FORCE_DELAY = 20;
	
	Player.prototype.makeSprite = function () {
		Character.prototype.makeSprite.call(this);
		this.body.bounce.y = 0.2;
	    this.sprite.animations.add('left', [0, 1, 2, 3], 10, true);
	    this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);
	    this.state = new ObjectState(this.body);
	};
	
	Player.prototype.kill = function() {
		this.sprite.enableBody = false;
		//this.sprite.animations.play('kill');
		this.dead = true;
		this.sprite.body.velocity.y = -10;
		this.sprite.body.velocity.x = 0;
		Game.getInstance().camera.unfollow();
	};
	
	Player.prototype.isStill = function() {
		return this.state.isStill();
	};
	
	Player.prototype.setForce = function(s) {
		this.state.setState(s);
		this.forceTime = 0;
		this.forced = true;
	};
	
	Player.prototype.controlDown = function(data) {
		if(this.state.getState() != null){
			return;
		}
		if(data.index === 0){
			this.setForce(ObjectState.LEFT);
		}
		else if(data.index === 1){
			this.setForce(ObjectState.RIGHT);
		}
		else if(data.index === 2){
			this.setForce(ObjectState.UPLEFT);
		}
		else if(data.index === 3){
			this.setForce(ObjectState.UPRIGHT);
		}
	};
	
	Player.prototype.controlUp = function(data) {
		
	};
	
	Player.prototype.updateDead = function() {
		var dy = Game.getInstance().camera.y + Game.h() - this.sprite.y;
		console.log("dy "+dy);
		if(dy < 0){
			this.deadSignal.dispatch();
		}
	};
	
	Player.prototype.updateNormal = function() {
		var left, right, up;
		this.sprite.body.velocity.x = 0;
		left = this.state.isLeft();
		right = this.state.isRight();
		up = this.state.isUp();
		if(left){
			this.sprite.body.velocity.x = -Player.VELX;
			this.sprite.animations.play('left');
		}
		else if(right){
			this.sprite.body.velocity.x = Player.VELX;
			this.sprite.animations.play('right');
		}
		else{
			this.sprite.animations.stop();
			this.sprite.frame = 4;
		}
		if(up){
			this.sprite.body.velocity.y = -Player.VELY;
			this.state.remove("U");
		}
		if(this.forced){
			this.forceTime++;
			if(this.forceTime === Player.FORCE_DELAY){
				this.state.setState(null);
				this.forced = false;
			}
		}
	};
	
	Player.prototype.update = function() {
		if(Game.physicsPaused){
			return;
		}
		else if(this.dead){
			this.updateDead();
		}
		else{
			this.updateNormal();
		}
	};
	
	Player.prototype.destroy = function () {
		Character.prototype.destroy.call(this, arguments);
	};
	
	return Player;
});
	
