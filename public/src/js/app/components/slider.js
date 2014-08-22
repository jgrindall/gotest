
define(['app/game', 'app/components/container'], function(Game, Container){
	
	"use strict";
	
	var Slider = function(options){
		Container.call(this, options);
		this.changeSignal = new Phaser.Signal();
	};
	
	Slider.NUM = 5;
	Slider.WIDTH = 200;
	Slider.HEIGHT = 40;
	Slider.HANDLEWIDTH = 40;
	Slider.HANDLEHEIGHT = 40;
	
	Slider.prototype = Object.create(Container.prototype);
	Slider.prototype.constructor = Slider;
	
	Slider.prototype.goToPercent = function(p){
		
	};
	
	Slider.prototype.onUp = function() {
		this.dragging = false;
		Game.getInput().moveCallback = null;
		this.snap();
	};
	
	Slider.prototype.snap = function() {
		var num, stepDist;
		stepDist = Slider.WIDTH / Slider.NUM;
		num = Math.round ( (this.handle.x - this.bounds.x) / stepDist );
		this.handle.x = this.bounds.x + num * stepDist;
		this.changeSignal.dispatch({"num":num});
	};

	Slider.prototype.move = function(pointer, x, y) {
		var xpos = Math.min(Math.max(x, this.bounds.x), this.bounds.x + Slider.WIDTH);
		this.handle.x =  xpos;
	};
	
	Slider.prototype.startDragging = function(data) {
		this.dragging = true;
		Game.getInput().onUp.add($.proxy(this.onUp, this));
		Game.getInput().moveCallback = $.proxy(this.move, this);
		Game.getInput().mouse.mouseOutCallback = $.proxy(this.mouseOutCallback, this);
	};
	
	Slider.prototype.addListeners = function(){
		Game.getInput().onDown.add($.proxy(this.onDown, this));
	};
	
	Slider.prototype.mouseOutCallback = function() {
		this.onUp();
	};
	
	Slider.prototype.create = function(){
		Container.prototype.create.call(this);
		this.bg = new Phaser.Sprite(Game.getInstance(),  this.bounds.x, this.bounds.y, 'sliderbg');
		this.handle = new Phaser.Sprite(Game.getInstance(), this.bounds.x, this.bounds.y + Slider.HANDLEHEIGHT/2, 'sliderhandle');
		this.handle.anchor.setTo(0.5, 0.5);
		this.group.add(this.bg);
		this.group.add(this.handle);
		this.addListeners();
	};
	
	Slider.prototype.destroy = function(){
		this.bg.destroy(true);
		this.changeSignal.dispose();
		this.changeSignal = null;
		this.handle.destroy();
		this.handle = null;
		// TODO clean up listeners
		this.bg = null;
	};
	
	Slider.prototype.onDown = function() {
		var hits = true;
		if(hits){
			this.startDragging();
		}
	};
	
	return Slider;

});


	