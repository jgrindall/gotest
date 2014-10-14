
define(['phasercomponents',

	'app/assets', 'app/models/modelconsts', 'app/views/components/vscrollbar'

],

function(PhaserComponents, 


 Assets, ModelConsts, VScrollBar){
	
	"use strict";
	
	var VScroller  = function(options){
		PhaserComponents.Display.Container.call(this, options);
	};
	
	PhaserComponents.Utils.extends(VScroller, PhaserComponents.Display.Container);
	
	VScroller.prototype.create = function(){
		PhaserComponents.Display.Container.prototype.create.call(this);
		this.addMask();
		this.addScrollBar();
	};

	VScroller.prototype.addListeners = function(){
		this.scrollBar.mouseDownSignal.add(this.startDragging, this);
	};

	VScroller.prototype.removeListeners = function(){
		this.scrollBar.mouseDownSignal.remove(this.startDragging, this);
	};

	VScroller.prototype.addScrollBar = function(){
		var options ={};
		options.bounds = {'x':this.bounds.x + this.bounds.w - VScrollBar.WIDTH, 'y':this.bounds.y, 'w':VScrollBar.WIDTH, 'h':VScrollBar.HEIGHT};
		options.asset = Assets.VSCROLLBAR;
		this.scrollBar = new VScrollBar(options);
    	this.group.add(this.scrollBar.view);
	};

	VScroller.prototype.move = function(pointer, x, y) {
		var localPoint, dy, y;
		localPoint = this.game.input.getLocalPosition(this.group, this.game.input.activePointer);
		dy = localPoint.y - this.mouse0;
		y = this.y0 + dy;
		y = this.bound(y);
		this.goTo(y);
	};

	VScroller.prototype.bound = function(y){
		var min, max, H, h, Hminush;
		H = this.getContentHeight();
		h = this.getScrollHeight();
		Hminush = H - h;
		min = 0;
		max = (h/H)*Hminush;
		return Math.max(Math.min(y, max), min);
	};

	VScroller.prototype.goTo = function(y){
		if(this.contents){
			var H, h, Hminush, cy;
			H = this.getContentHeight();
			h = this.getScrollHeight();
			Hminush = H - h;
			cy = -y*H/h;
			this.scrollBar.moveTo(y);
			this.contents.view.y = cy;
		}
	};

	VScroller.prototype.onUp = function() {
		this.removeMoveListeners();
		if(this.options.sfx){
			this.eventDispatcher.trigger({"type":AppEvents.PLAY_SOUND, "data":this.options.sfx});
		}
	};

	VScroller.prototype.removeMoveListeners = function(){
		this.game.input.onUp.remove(this.onUp, this);
		this.game.input.moveCallback = null;
	};

	VScroller.prototype.getContentHeight = function() {
		return this.contents.getContentHeight();
	};

	VScroller.prototype.getScrollHeight = function() {
		return this.bounds.h;
	};

	VScroller.prototype.update = function() {
		var H, h, barH;
		H = this.getContentHeight();
		h = this.getScrollHeight();
		this.removeListeners();
		this.removeMoveListeners();
		this.scale();
		if(H > h + 2){
			this.addListeners();
			this.scrollBar.show();
		}
		else{
			this.scrollBar.hide();
		}
	};

	VScroller.prototype.scale = function() {
		if(this.contents){
			var H, h, barH;
			H = this.getContentHeight();
			h = this.getScrollHeight();
			barH = h*h/H;
			this.scrollBar.resize(h*h/H);
		}
	};
	
	VScroller.prototype.startDragging = function() {
		var localPoint = this.game.input.getLocalPosition(this.group, this.game.input.activePointer);
		this.mouse0 = localPoint.y;
		this.y0 = this.scrollBar.scrollPos;
		this.addMoveListeners();
	};
	
	VScroller.prototype.addMoveListeners = function(){
		this.game.input.onUp.add(this.onUp, this);
		this.game.input.moveCallback = this.move.bind(this);
	};

	VScroller.prototype.setContents = function(contents){
		this.removeContents();
		this.contents = contents;
		this.group.add(this.contents.view);
		this.contents.view.mask = this.mask;
		this.update();
	};

	VScroller.prototype.addMask = function(){
		this.mask = new Phaser.Graphics(this.game, 0, 0);
		this.mask.beginFill(0xff0000);
    	this.mask.drawRect(this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
    	this.mask.endFill();
    	this.group.add(this.mask);
	};

	VScroller.prototype.removeContents = function(){
		if(this.contents){
			this.contents.view.mask = null;
			this.group.remove(this.contents.view);
			this.contents.destroy();
			this.contents = null;
		}
	};

	VScroller.prototype.destroy = function(){
		this.removeContents();
		this.removeListeners();
		this.removeMoveListeners();
		this.group.remove(this.mask);
		this.group.remove(this.scrollBar);
		this.contents = null;
		this.mask = null;
		PhaserComponents.Display.Container.prototype.destroy.call(this);
	};

	return VScroller;
});
	

