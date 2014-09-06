
define('app/views/canvas/turtle',['phaser', 'phasercomponents'],

function(Phaser,PhaserComponents){
	
	"use strict";
	
	var Turtle  = function(options){
		PhaserComponents.Display.Container.call(this, options);
		this.theta = 0;
		this.endSignal = new Phaser.Signal();
	};
	
	Turtle.getAngle = function(t, a){
		// to stop it going from 359 to 0 via 180 for example!
		while(t - a > 180){
			t -= 360;
		}
		while(t - a < -180){
			t += 360;
		}
		return t;
	};
	
	PhaserComponents.Utils.extends(Turtle, PhaserComponents.Display.Container);

	Turtle.prototype.addImage = function() {
		this.sprite = new Phaser.Image(this.game, 300, 300, 'turtle');
		this.group.add(this.sprite);
		this.sprite.anchor.setTo(0.5, 0.5);
	};
	
	Turtle.prototype.setTo = function(theta) {
		var target = theta + 90;
		this.sprite.angle = target;
	};
	
	Turtle.prototype.rotateTo = function(theta, time) {
		var target = theta + 90;
		this.stopTurnTween();
		target = Turtle.getAngle(target, this.sprite.angle);
		if(time === 0){
			this.sprite.angle = target;
			this.endSignal.dispatch({});
		}
		else{
			this.turnTween = this.game.add.tween(this.sprite).to( {'angle':target}, time, Phaser.Easing.Linear.None, true, 0, false);
			this.turnTween.onComplete.add(this.turnComplete, this);
		}
	};
	
	Turtle.prototype.turnComplete = function(){
		this.endSignal.dispatch({});
		this.turnTween.onComplete.remove(this.turnComplete, this);
	};
	
	Turtle.prototype.reset = function(p){
		this.stopTweens();
		this.move(p);
		this.setTo(-90);
	};
	
	Turtle.prototype.stopMoveTween = function() {
		if(this.moveTween){
			this.moveTween.stop();
			this.moveTween = null;
		}
	};
	
	Turtle.prototype.stopTurnTween = function() {
		if(this.turnTween){
			this.turnTween.stop();
			this.turnTween.onComplete.remove(this.turnComplete, this);
			this.turnTween = null;
		}
	};
	
	Turtle.prototype.stopTweens = function() {
		this.stopMoveTween();
		this.stopTurnTween();
	};
	
	Turtle.prototype.tweenTo = function(p, time) {
		this.stopMoveTween();
		if(time === 0){
			this.move(p);
		}
		else{
			this.moveTween = this.game.add.tween(this.sprite).to( {'x':p.x, 'y':p.y}, time*0.95, Phaser.Easing.Linear.None, true, 0, false);
		}
	};
	
	Turtle.prototype.move = function(p) {
		this.sprite.x = p.x;
		this.sprite.y = p.y;
	};
	
	Turtle.prototype.addMask = function() {
		this.mask = new Phaser.Graphics(this.game, 0, 0);
		this.mask.beginFill(0xff0000);
    		this.mask.drawRect(this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
    		this.mask.endFill();
    		this.group.add(this.mask);
	};
	
	Turtle.prototype.create = function() {
		PhaserComponents.Display.Container.prototype.create.call(this);
		this.addMask();
		this.addImage();
		this.sprite.mask = this.mask;
	};
	
	Turtle.prototype.destroy = function() {
		this.stopTweens();
		this.endSignal.dispose();
		this.endSignal = null;
		PhaserComponents.Display.Container.prototype.destroy.call(this);
		this.sprite.destroy(true);
	};
	
	return Turtle;

});
	
