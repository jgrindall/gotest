
define(['jquery', 'app/game', 'app/components/container'],

function($, Game, Container){
	
	"use strict";

	var Scroller = function(options){
		this.x0 = null;
		this.dragging = false;
		this.minX = 0;
		this.pageNum = 0;
		this.selectSignal = new Phaser.Signal();
		this.pageSignal = new Phaser.Signal();
		Container.call(this, options);
	};
	
	Scroller.prototype = Object.create(Container.prototype);
	Scroller.prototype.constructor = Scroller;
	
	Scroller.MIN_MOVE = 10;
	
	Scroller.prototype.create = function(){
		Container.prototype.create.call(this);
		this.contentGroup = new Phaser.Group(Game.getInstance());
		this.addBg();
		this.addChildren();
	    this.addListeners();
	    this.group.add(this.contentGroup);
	};
	
	Scroller.prototype.addListeners = function() {
		Game.getInput().onDown.add(this.onDown, this);
		Game.getInput().mouse.mouseOutCallback = $.proxy(this.mouseOutCallback, this);
	};
	
	Scroller.prototype.mouseOutCallback = function() {
		this.onUp();
	};
	
	Scroller.prototype.addBg = function() {
		if(this.options.bgasset){
			this.panel = new Phaser.Sprite(Game.getInstance(), this.bounds.x, this.bounds.y, this.options.bgasset);
			this.group.add(this.panel);
		}
	};	
	
	Scroller.prototype.add = function(child) {
		this.contentGroup.add(child.group);
		var x, w, m;
		x = child.options.bounds.x;
		w = child.options.bounds.w;
		m = -1*(x + w - Game.w());
		this.minX = Math.min(this.minX, m);
		child.signal.add($.proxy(this.select, this));
	};
	
	Scroller.prototype.gotoPage = function(p) {
		this.pageNum = p;
		this.pageSignal.dispatch({"pageNum":p});
		this.tweenTo(-this.options.snapX * p);
	};
	
	Scroller.prototype.next = function() {
		this.gotoPage(this.pageNum + 1);
	};
	
	Scroller.prototype.prev = function() {
		this.gotoPage(this.pageNum - 1);
	};
	
	Scroller.prototype.tweenTo = function(x) {
		Game.getInstance().add.tween(this.contentGroup).to({'x': x}, 250, Phaser.Easing.Quadratic.Out, true, 20, false);
	};
	
	Scroller.prototype.select = function(data){
		// check if moved or not!
		if(Math.abs(this.dx) < Scroller.MIN_MOVE){
			var page = this.group.getIndex(data.grid.group);
			this.selectSignal.dispatch({"index":data.index, "page":page});
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
		var pageNum = -Math.round(this.contentGroup.x / this.options.snapX);
		this.gotoPage(pageNum);
	};

	Scroller.prototype.buttonUp = function(data) {
		Game.getInput().moveCallback = null;
		this.x0 = null;
		var targetIndex = this.group.getIndex(data.target.sprite);
		if(Math.abs(this.dx) > Scroller.MIN_MOVE){
			this.snap();
		}
	};

	Scroller.prototype.move = function(pointer, x, y) {
		var xpos;
		if(this.x0 === null){
			this.x0 = x;
		}
		this.dx = this.x0 - x;
		xpos = this.startX - this.dx;
		xpos = Math.min(Math.max(xpos, this.minX), 0);
		this.contentGroup.x = xpos;
	};
	
	Scroller.prototype.startDragging = function(data) {
		this.startX = this.contentGroup.x;
		this.dx = 0;
		this.x0 = null;
		this.dragging = true;
		Game.getInput().onUp.add(this.onUp, this);
		Game.getInput().moveCallback = $.proxy(this.move, this);
	};
	
	Scroller.prototype.destroy = function() {
		Game.getInput().onDown.remove(this.onDown, this);
		Game.getInput().onUp.remove(this.onUp, this);
		Game.getInput().mouse.mouseOutCallback = null;
		this.contentGroup.destroy(true);
		this.group.destroy(true);
		this.options = null;
		this.pageSignal = null;
		this.selectSignal = null;
		Container.prototype.destroy.call(this);
	};
	
	return Scroller;

});



