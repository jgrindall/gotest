
define('app/components/slider/slider',['phaser', 'app/game', 'app/components/container',

'app/components/interactivesprite'],

function(Phaser, Game, Container,

InteractiveSprite){
	
	"use strict";
	
	var Slider = function(options){
		var index;
		this.num = Math.floor(Math.random() * 1000);
		this.model = options.model;
		this.stepDist = (Slider.WIDTH - Slider.HANDLEWIDTH) / options.num;
		this.model.changeSignal.add(this.onChanged, this);
		Container.call(this, options);
		index = this.model.getData().index;
		if(index !== null){
			this.goTo(index);
		}
	};
	
	Slider.WIDTH = 			200;
	Slider.HEIGHT = 		40;
	Slider.HANDLEWIDTH = 	40;
	Slider.HANDLEHEIGHT = 	40;
	
	Slider.prototype = Object.create(Container.prototype);
	Slider.prototype.constructor = Slider;
	
	Slider.prototype.onChanged = function(data){
		this.goTo(data.index);
	};
	
	Slider.prototype.goTo = function(n) {
		this.handle.x = this.bounds.x + Slider.HANDLEWIDTH/2 + (n * this.stepDist);
	};
	
	Slider.prototype.disableInput = function() {
		this.handle.disableInput();
		this.removeListeners();
	};
	
	Slider.prototype.enableInput = function() {
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
		Game.getInput().moveCallback = this.move.bind(this);
		Game.getInput().mouse.mouseOutCallback = this.mouseOutCallback.bind(this);
	};
	
	Slider.prototype.addListeners = function(){
		this.handle.mouseDownSignal.add(this.startDragging, this);
	};
	
	Slider.prototype.removeListeners = function(){
		this.handle.mouseDownSignal.remove(this.startDragging, this);
		Game.getInput().onDown.remove(this.onUp, this);
	};
	
	Slider.prototype.mouseOutCallback = function() {
		this.onUp();
	};
	
	Slider.prototype.addHandle = function(){
		var x, y;
		x = this.bounds.x + Slider.HANDLEHEIGHT/2;
		y = this.bounds.y + Slider.HANDLEHEIGHT/2;
		this.handle = new InteractiveSprite(Game.getInstance(), x, y, 'sliderhandle');
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
		this.enableInput();
	};
	
	Slider.prototype.destroy = function(){
		this.removeListeners();
		this.bg.destroy(true);
		this.model.changeSignal.remove(this.onChanged, this);
		Game.getInput().onUp.remove(this.onUp, this);
		Game.getInput().moveCallback = null;
		Game.getInput().mouse.mouseOutCallback = null;
		this.handle.destroy();
		this.handle = null;
		this.bg = null;
	};
	
	return Slider;

});


	