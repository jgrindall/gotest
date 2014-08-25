
define(['app/game', 'app/components/container', 'app/components/buttons/interactivesprite'],

function(Game, Container, InteractiveSprite){
	
	"use strict";
	
	var Slider = function(options){
		Container.call(this, options);
		this.changeSignal = new Phaser.Signal();
	};
	
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
		Game.getInput().mouse.mouseOutCallback = null;
		Game.getInput().onDown.remove(this.onUp, this);
		this.snap();
	};
	
	Slider.prototype.snap = function() {
		var num, stepDist;
		stepDist = (Slider.WIDTH - Slider.HANDLEWIDTH) / this.options.num;
		num = Math.round ( (this.handle.x - Slider.HANDLEWIDTH/2 - this.bounds.x) / stepDist );
		this.handle.x = this.bounds.x + num * stepDist + Slider.HANDLEWIDTH/2;
		this.changeSignal.dispatch({"num":num});
	};

	Slider.prototype.isOutside = function(x, y) {
		if(x < this.bounds.x  - 20 || x > this.bounds.x + Slider.WIDTH + 20){
			return true;
		}
		else if(y < this.bounds.y - 30 || y > this.bounds.y + Slider.HEIGHT + 30){
			return true;
		}
		return false;
	};
	
	Slider.prototype.move = function(pointer, x, y) {
		if(this.isOutside(x, y)){
			this.onUp();
		}
		else{
			var xpos = Math.min(Math.max(x, this.bounds.x + Slider.HANDLEWIDTH/2), this.bounds.x + Slider.WIDTH - Slider.HANDLEWIDTH/2);
			this.handle.x =  xpos;
		}
	};
	
	Slider.prototype.startDragging = function(data) {
		this.dragging = true;
		Game.getInput().onUp.add(this.onUp, this);
		Game.getInput().moveCallback = $.proxy(this.move, this);
		Game.getInput().mouse.mouseOutCallback = $.proxy(this.mouseOutCallback, this);
	};
	
	Slider.prototype.addListeners = function(){
		this.handle.mouseDownSignal.add(this.startDragging, this);
	};
	
	Slider.prototype.removeListeners = function(){
		this.handle.mouseDownSignal.remove(this.startDragging, this);
	};
	
	Slider.prototype.mouseOutCallback = function() {
		this.onUp();
	};
	
	Slider.prototype.create = function(){
		Container.prototype.create.call(this);
		this.bg = new Phaser.Sprite(Game.getInstance(),  this.bounds.x, this.bounds.y, 'sliderbg');
		this.handle = new InteractiveSprite(Game.getInstance(), this.bounds.x + Slider.HANDLEHEIGHT/2, this.bounds.y + Slider.HANDLEHEIGHT/2, 'sliderhandle');
		this.handle.enableInput();
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
		this.removeListeners();
		this.handle = null;
		this.bg = null;
	};
	
	return Slider;

});


	