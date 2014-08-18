
define(['app/game'],function(Game){
	
	"use strict";
	
	var Scroller = function(options){
		this.options = options;
		this.x0 = null;
		this.dragging = false;
		this.minX = 0;
		this.selectSignal = new Phaser.Signal();
	};
	
	Scroller.MIN_MOVE = 10;
	
	Scroller.prototype.create = function(){
		this.group = new Phaser.Group(Game.getInstance());
		this.addChildren();
	    Game.getInput().onDown.add($.proxy(this.onDown, this));
		Game.getInput().mouse.mouseOutCallback = $.proxy(this.mouseOutCallback, this);
	};
	
	Scroller.prototype.mouseOutCallback = function() {
		this.onUp();
	};
	
	Scroller.prototype.add = function(child) {
		this.group.add(child.group);
		var x, w, worldWidth;
		x = child.options.bounds.x;
		w = child.options.bounds.w;
		worldWidth = Game.w();
		this.minX = Math.min(this.minX, -1*(x + w - worldWidth));
		child.signal.add($.proxy(this.select, this));
	};
	
	Scroller.prototype.select = function(data){
		if(Math.abs(this.dx) < Scroller.MIN_MOVE){
			var page = this.group.getIndex(data.grid.group);
			this.selectSignal.dispatch({"key":this.key, "level":data.index, "page":page});
		}
	};
	
	Scroller.prototype.addChildren = function(){
		this.options.dataProvider.addAll(this);
	};
	
	Scroller.prototype.onDown = function() {
		this.startDragging();
	};
	
	Scroller.prototype.onUp = function() {
		this.dragging = false;
		Game.getInput().moveCallback = null;
		this.snap();
	};
	
	Scroller.prototype.snap = function() {
		var x = this.options.snapX * Math.round(this.group.x / this.options.snapX);
		Game.getInstance().add.tween(this.group).to({'x': x}, 250, Phaser.Easing.Quadratic.Out, true, 20, false);
	};

	Scroller.prototype.buttonUp = function(data) {
		Game.getInput().moveCallback = null;
		this.x0 = null;
		var targetIndex = this.group.getIndex(data.target.sprite);
		if(Math.abs(this.dx) > Scroller.MIN_MOVE){
			this.snap();
		}
		else{
			// button up?
		}
	};

	Scroller.prototype.move = function(pointer, x, y) {
		var xpos, minX;
		if(this.x0 === null){
			this.x0 = x;
		}
		this.dx = this.x0 - x;
		xpos = this.startX - this.dx;
		xpos = Math.min(Math.max(xpos, this.minX), 0);
		this.group.x = xpos;
	};
	
	Scroller.prototype.startDragging = function(data) {
		this.startX = this.group.x;
		this.dx = 0;
		this.x0 = null;
		this.dragging = true;
		Game.getInput().onUp.add($.proxy(this.onUp, this));
		Game.getInput().moveCallback = $.proxy(this.move, this);
	};
	
	Scroller.prototype.destroy = function() {
		Game.getInput().onDown.removeAll(this);
		Game.getInput().mouse.mouseOutCallback = null;
		this.group.destroy(true);
		this.options = null;
		this.selectSignal = null;
	};
	
	return Scroller;

});



