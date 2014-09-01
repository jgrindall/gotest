
define('app/components/slider/slider',['jquery', 'app/game', 'app/components/container',

'app/components/interactivesprite', 'phaser'],

function($, Game, Container,

InteractiveSprite, Phaser){
	
	"use strict";
	
	var Slider = function(options){
		var speed;
		this.model = options.model;
		this.stepDist = (Slider.WIDTH - Slider.HANDLEWIDTH) / options.num;
		Game.alertSignal.add(this.onAlert, this);
		this.model.changeSignal.add(this.onChanged, this);
		Container.call(this, options);
		speed = this.model.getData().speed;
		if(speed !== null){
			this.goTo(speed);
		}
	};
	
	Slider.WIDTH = 			200;
	Slider.HEIGHT = 		40;
	Slider.HANDLEWIDTH = 	40;
	Slider.HANDLEHEIGHT = 	40;
	
	Slider.prototype = Object.create(Container.prototype);
	Slider.prototype.constructor = Slider;
	
	Slider.prototype.onChanged = function(data){
		this.goTo(data.speed);
	};
	
	Slider.prototype.goTo = function(n) {
		this.handle.x = this.bounds.x + Slider.HANDLEWIDTH/2 + (n * this.stepDist);
	};
	
	Slider.prototype.onAlert = function(data) {
		if(data.show){
			this.disableAllInput();
		}
		else{
			this.enableAllInput();
		}
	};
	
	Slider.prototype.disableAllInput = function() {
		this.handle.disableInput();
		this.removeListeners();
	};
	
	Slider.prototype.enableAllInput = function() {
		this.handle.enableInput();
		this.addListeners();
	};	
	
	Slider.prototype.onUp = function() {
		this.dragging = false;
		Game.getInput().moveCallback = null;
		Game.getInput().mouse.mouseOutCallback = null;
		Game.getInput().onDown.remove(this.onUp, this);
		this.snap();
	};
	
	Slider.prototype.snap = function() {
		var num;
		num = (this.handle.x - Slider.HANDLEWIDTH/2 - this.bounds.x) / this.stepDist;
		num = Math.round(num);
		this.goTo(num);
		this.model.setData(num);
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
		var xpos, xmin, xmax;
		if(this.isOutside(x, y)){
			this.onUp();
		}
		else{
			xmin = this.bounds.x + Slider.HANDLEWIDTH/2;
			xmax = this.bounds.x + Slider.WIDTH - Slider.HANDLEWIDTH/2;
			xpos = Math.min(Math.max(x, xmin), xmax);
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
	
	Slider.prototype.addHandle = function(){
		var x, y;
		x = this.bounds.x + Slider.HANDLEHEIGHT/2;
		y = this.bounds.y + Slider.HANDLEHEIGHT/2;
		this.handle = new InteractiveSprite(Game.getInstance(), x, y, 'sliderhandle', 'sliderhandle');
		this.handle.anchor.setTo(0.5, 0.5);
		this.group.add(this.handle);
	};
	
	Slider.prototype.addBg = function(){
		this.bg = new Phaser.Sprite(Game.getInstance(),  this.bounds.x, this.bounds.y, 'sliderbg');
		this.group.add(this.bg);
	};
	
	Slider.prototype.create = function(){
		Container.prototype.create.call(this);
		this.addBg();
		this.addHandle();
		this.enableAllInput();
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


	