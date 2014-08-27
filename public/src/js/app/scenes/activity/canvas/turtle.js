
define(['app/game', 'app/components/container'],

function(Game, Container){
	
	"use strict";
	
	var Turtle  = function(options){
		Container.call(this, options);
		this.theta = 0;
	};
	
	Turtle.getAngle = function(t, a){
		while(t - a > 180){
			t -= 360;
		}
		while(t - a < -180){
			t += 360;
		}
		return t;
	};
	
	Turtle.prototype = Object.create(Container.prototype);
	Turtle.prototype.constructor = Turtle;
	
	Turtle.prototype.addImage = function() {
		this.sprite = new Phaser.Image(Game.getInstance(), 300, 300, 'turtle');
		this.group.add(this.sprite);
		this.sprite.anchor.setTo(0.5, 0.5);
	};
	
	Turtle.prototype.incrementRotate = function(theta, time) {
		var target = this.sprite.angle + theta;
		Game.getInstance().add.tween(this.sprite).to( {'angle':target}, time, Phaser.Easing.Linear.None, true, 0, false);
	};
	
	Turtle.prototype.rotate = function(theta) {
		var target = theta + 90;
		target = Turtle.getAngle(target, this.sprite.angle);
		Game.getInstance().add.tween(this.sprite).to( {'angle':target}, 100, Phaser.Easing.Linear.None, true, 0, false);
	};
	
	Turtle.prototype.reset = function(p){
		this.stopTween();
		this.rotate(0);
		this.move(p);
	};
	
	Turtle.prototype.stopTween = function() {
		if(this.tween){
			this.tween.stop();
			this.tween = null;
		}
	};
	
	Turtle.prototype.tweenTo = function(p, time) {
		this.stopTween();
		if(time === 0){
			this.move(p);	
		}
		else{
			this.tween = Game.getInstance().add.tween(this.sprite).to( {'x':p.x, 'y':p.y}, time*0.95, Phaser.Easing.Linear.None, true, 0, false);
		}
	};
	
	Turtle.prototype.move = function(p) {
		this.sprite.x = p.x;
		this.sprite.y = p.y;
	};
	
	Turtle.prototype.create = function() {
		Container.prototype.create.call(this);
		this.addImage();
	};
	
	Turtle.prototype.destroy = function() {
		Container.prototype.destroy.call(this);
		this.sprite.destroy(true);
	};
	
	return Turtle;

});
	
