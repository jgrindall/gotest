
define(['phaser', 'phasercomponents',

	'app/assets',

	'app/events/events', 'app/models/modelconsts'],

function(Phaser, PhaserComponents, 

	Assets,

	Events, ModelConsts){
	
	"use strict";
	
	var Turtle  = function(options){
		PhaserComponents.Display.Container.call(this, options);
		this.theta = 0;
		this.endSignal = new Phaser.Signal();
		this.movedSignal = new Phaser.Signal();
		this.enableMove();
	};

	Turtle.EDITOR_KEY = 'turtleEditorImage';
	Turtle.DEFAULT_FRAMES = 4;
	
	PhaserComponents.Utils.extends(Turtle, PhaserComponents.Display.Container);

	Turtle.prototype.removeMover = function() {
		if(this.mover){
			this.mover.animations = null;
			this.mover.inputEnabled = false;
			this.mover.events.onInputUp.remove(this.onMoverUp, this);
			this.group.remove(this.mover);
			this.mover.destroy(true);
			this.mover = null;
		}
	};

	Turtle.prototype.onMoverUp = function() {
		var pointer, localPoint;
		pointer = this.game.input.activePointer;
		localPoint = this.game.input.getLocalPosition(this.mover, pointer);
		if(localPoint.x > 14 && localPoint.x < 35 && localPoint.y > -35 && localPoint.y < -15){
			this.eventDispatcher.trigger({"type":Events.EDIT_TURTLE});
		}
	};

	Turtle.prototype.addMover = function() {
		this.removeMover();
		this.mover = new Phaser.Sprite(this.game, 0, 0, Assets.MOVER);
		this.mover.animations.add('play', [0, 1, 2, 3, 4], 12, true);
		this.mover.animations.play('play');
		this.mover.inputEnabled = true;
		this.mover.input.useHandCursor = true;
		this.mover.events.onInputUp.add(this.onMoverUp, this);
		this.group.add(this.mover);
		this.mover.anchor.setTo(0.5, 0.5);
		this.game.add.tween(this.mover).to( {'angle':360}, 2000, Phaser.Easing.Back.InOut, true, 1000, false);
	};

	Turtle.prototype.create = function() {
		PhaserComponents.Display.Container.prototype.create.call(this);
		this.addMask();
		this.addMover();
		this.addTurtle();
		this.mover.mask = this.mask;
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

	Turtle.prototype.showMove = function(){
		this.mover.visible = true;
	};
	
	Turtle.prototype.hideMove = function(){
		this.mover.visible = false;
	};
	
	Turtle.prototype.enableMove = function(){
		if(this.turtle){
			this.turtle.enableInput();
		}
	};

	Turtle.prototype.disableMove = function(){
		if(this.turtle){
			this.turtle.disableInput();
		}
	};

	Turtle.prototype.downHandler = function(){
		this.addMoveListeners();
	};

	Turtle.prototype.onMove = function(pointer){
		var p, localPoint;
		p = 20;
		localPoint = this.game.input.getLocalPosition(this.group, pointer);
		localPoint.x = Math.min(Math.max(p, localPoint.x), this.bounds.w - p);
		localPoint.y = Math.min(Math.max(p, localPoint.y), this.bounds.h - p);
		if(this.turtle){
			this.move(localPoint);
		}
	};

	Turtle.prototype.drop = function(){
		this.movedSignal.dispatch({'x':this.turtle.sprite.x, 'y':this.turtle.sprite.y});
	};

	Turtle.prototype.onUp = function(){
		this.drop();
		this.removeMoveListeners();
	};

	Turtle.prototype.addMoveListeners = function(){
		this.game.input.moveCallback = this.onMove.bind(this);
		this.game.input.onUp.add(this.onUp, this);
	};

	Turtle.prototype.removeMoveListeners = function(){
		this.game.input.moveCallback = null;
		this.game.input.onUp.remove(this.onUp, this);
	};

	Turtle.prototype.removeTurtle = function() {
		if(this.turtle){
			this.turtle.mouseDownSignal.remove(this.downHandler, this);
			this.turtle.animations.destroy();
			this.group.remove(this.turtle.view);
			this.turtle.destroy(true);
			this.turtle = null;
			this.disableMove();
		}
	};
	
	Turtle.prototype.getFrames = function(numFrames) {
		var r = [];
		for(i = 0; i < numFrames; i++){
			r.push(i);
		}
		return r;
	};

	Turtle.prototype.addTurtleUsingKey = function(key, numFrames) {
		var bounds, w, h, scale;
		bounds = {'x':0, 'y':0};
		this.removeTurtle();
		this.turtle = new PhaserComponents.Display.InteractiveSprite({"bounds":bounds, "numFrames":numFrames, "asset":key});
		this.turtle.animations.add('move', this.getFrames(numFrames), 20, true);
		this.group.add(this.turtle.view);
		this.turtle.view.anchor.setTo(0.5, 0.5);
		this.turtle.view.mask = this.mask;
		w = this.turtle.view.width;
		h = this.turtle.view.height;
		scale = Math.max(w, h)/50;
		if(scale > 1){
			this.turtle.view.scale = {'x':1/scale, 'y':1/scale};
		}
		this.turtle.mouseDownSignal.add(this.downHandler, this);
		this.enableMove();
	};

	Turtle.prototype.addTurtle = function() {
		var index = this.modelFacade.get(ModelConsts.TURTLE).get() || 0;
		this.addTurtleUsingKey(Assets.TURTLES[index], 1);
	};
	
	Turtle.prototype.setTo = function(theta) {
		var target = theta + 90;
		if(this.turtle){
			this.turtle.view.angle = target;
		}
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
			this.playAnim();
			this.moveTween = this.game.add.tween(this.turtle.view).to( {'x':p.x, 'y':p.y}, time*0.95, Phaser.Easing.Linear.None, true, 0, false);
		}
	};
	
	Turtle.prototype.stopAnim = function() {
		this.turtle.animations.stop('move');
	};

	Turtle.prototype.playAnim = function() {
		this.turtle.animations.play('move');
	};

	Turtle.prototype.move = function(p) {
		this.turtle.moveTo(p.x, p.y);
		this.mover.x = p.x;
		this.mover.y = p.y;
	};
	
	Turtle.prototype.addMask = function() {
		this.mask = new Phaser.Graphics(this.game, 0, 0);
		this.mask.beginFill(0xff0000);
    	this.mask.drawRect(this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
    	this.mask.endFill();
    	this.group.add(this.mask);
	};
	
	Turtle.prototype.destroy = function() {
		this.stopTweens();
		this.endSignal.dispose();
		this.movedSignal.dispose();
		this.endSignal = null;
		this.movedSignal = null;
		this.removeTurtle();
		this.removeSprite();
		this.removeMover();
		PhaserComponents.Display.Container.prototype.destroy.call(this);
	};
	
	return Turtle;

});
	
