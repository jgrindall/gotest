
define(['phaser', 'phasercomponents', 'app/models/modelfacade'],

function(Phaser, PhaserComponents, ModelFacade){
	
	"use strict";
	
	var Turtle  = function(options){
		this.firstShow = true;
		PhaserComponents.Display.Container.call(this, options);
		ModelFacade.getInstance().get(ModelFacade.TURTLE).changeSignal.add(this.turtleChanged, this);
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
	
	Turtle.prototype.turtleChanged = function(value){
		this.turtle.goTo(value);
	};

	Turtle.prototype.removeSprite = function() {
		this.group.remove(this.turtle.view);
		this.turtle.destroy(true);
		this.turtle = null;
	};
	
	Turtle.prototype.addImage = function() {
		var bounds;
		bounds = {'x':0, 'y':0};
		if(this.turtle){
			this.removeSprite();
		}
		this.turtle = new PhaserComponents.Display.MovieClip({"bounds":bounds, "numFrames":2, "asset":this.options.asset});
		this.group.add(this.turtle.view);
		this.turtle.view.anchor.setTo(0.5, 0.5);
		if(this.firstShow){
			this.firstShow = false;
			this.game.add.tween(this.turtle.view).to( {'angle':this.turtle.view.angle+359}, 1000, Phaser.Easing.Linear.None, true, 2000, false);
		}
	};
	
	Turtle.prototype.setTo = function(theta) {
		var target = theta + 90;
		this.turtle.view.angle = target;
	};
	
	Turtle.prototype.rotateTo = function(theta, time) {
		var target = theta + 90;
		this.stopTurnTween();
		target = Turtle.getAngle(target, this.turtle.view.angle);
		if(time === 0){
			this.turtle.view.angle = target;
			this.endSignal.dispatch({});
		}
		else{
			this.turnTween = this.game.add.tween(this.turtle.view).to( {'angle':target}, time, Phaser.Easing.Linear.None, true, 0, false);
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
			this.moveTween = this.game.add.tween(this.turtle.view).to( {'x':p.x, 'y':p.y}, time*0.95, Phaser.Easing.Linear.None, true, 0, false);
		}
	};
	
	Turtle.prototype.move = function(p) {
		this.turtle.view.x = p.x;
		this.turtle.view.y = p.y;
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
		this.turtle.view.mask = this.mask;
	};
	
	Turtle.prototype.destroy = function() {
		ModelFacade.getInstance().get(ModelFacade.TURTLE).changeSignal.remove(this.turtleChanged, this);
		this.stopTweens();
		this.endSignal.dispose();
		this.endSignal = null;
		this.removeSprite();
		PhaserComponents.Display.Container.prototype.destroy.call(this);
	};
	
	return Turtle;

});
	
