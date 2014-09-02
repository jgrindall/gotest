
define('app/components/scroller/scroller',['app/game', 'app/components/container'],

function(Game, Container){
	
	"use strict";

	var Scroller = function(options){
		this.x0 = null;
		this.children = [];
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
		this.addChildren();
	    this.addListeners();
	    this.group.add(this.contentGroup);
	};
	
	Scroller.prototype.addListeners = function() {
		Game.getInput().onDown.add(this.onDown, this);
	};
	
	Scroller.prototype.mouseOutCallback = function() {
		this.onUp();
	};
	
	Scroller.prototype.add = function(child) {
		this.contentGroup.add(child.group);
		this.children.push(child);
		var x, w, m;
		x = child.options.bounds.x;
		w = child.options.bounds.w;
		m = -1*(x + w - Game.w());
		this.minX = Math.min(this.minX, m);
		if(child.clickSignal){
			child.clickSignal.add(this.select, this);
		}
	};
	
	Scroller.prototype.getCurrentPage = function() {
		return this.children[this.pageNum];
	};
	
	Scroller.prototype.setSelected = function(i) {
		this.getCurrentPage().model.setSelected(i);
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
		var page = this.contentGroup.getIndex(data.grid.group);
		if(Math.abs(this.dx) < Scroller.MIN_MOVE){
			this.selectSignal.dispatch({"index":data.index, "page":page});
			data.grid.showSelected(data.index);
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
		Game.getInput().mouse.mouseOutCallback = this.mouseOutCallback.bind(this);
		Game.getInput().moveCallback = this.move.bind(this);
	};
	
	Scroller.prototype.removeListeners = function() {
		Game.getInput().onDown.remove(this.onDown, this);
		Game.getInput().onUp.remove(this.onUp, this);
		Game.getInput().moveCallback = null;
		Game.getInput().mouse.mouseOutCallback = null;
	};
	
	Scroller.prototype.destroy = function() {
		var that = this;
		this.children.forEach(function(child){
			if(child.clickSignal){
				child.clickSignal.remove(that.select, that);
			}
			child.destroy();
		});
		this.removeListeners();
		this.pageSignal.dispose();
		this.selectSignal.dispose();
		this.pageSignal = null;
		this.selectSignal = null;
		Container.prototype.destroy.call(this);
	};
	
	return Scroller;

});



