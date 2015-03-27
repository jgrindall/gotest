
define(['phaser', 'phasercomponents',

'base/views/canvas/linedrawer'],

function(Phaser,PhaserComponents,

LineDrawer){
	
	"use strict";
	
	var Paths  = function(options){
		PhaserComponents.Display.Container.call(this, options);
		this.endSignal = new Phaser.Signal();
	};
	
	Paths.WIDTH = 8;
	
	PhaserComponents.Utils.extends(Paths, PhaserComponents.Display.Container);

	Paths.prototype.removeGfx = function() {
		if(this.gfx){
			this.gfx.destroy();
			this.group.remove(this.gfx);
			this.gfx = null;
		}
		if(this.lineDrawer){
			this.lineDrawer.destroy();
			this.lineDrawer = null;
		}
		if(this.mask){
			this.mask.destroy();
			this.group.remove(this.mask);
			this.mask = null;
		}
	};
	
	Paths.prototype.clear = function() {
		if(this.lineDrawer){
			this.lineDrawer.stop();
		}
		if(this.gfx){
			this.gfx.clear();
		}
	};
	
	Paths.prototype.drawLine = function(p0, p1, command, duration) {
		this.lineDrawer.drawLine(p0, p1, command, duration);
	};
	
	Paths.prototype.addGfx = function() {
		this.gfx = new Phaser.Graphics(this.game, 0, 0);
		this.lineDrawer = new LineDrawer(this.gfx);
		this.lineDrawer.endSignal.add(this.onDrawerEnd, this);
		this.group.add(this.gfx);
	};
	
	Paths.prototype.onDrawerEnd = function() {
		this.endSignal.dispatch({});
	};
	
	Paths.prototype.addMask = function() {
		this.mask = new Phaser.Graphics(this.game, 0, 0);
		this.mask.beginFill(0xff0000);
    	this.mask.drawRect(this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
    	this.mask.endFill();
    	this.group.add(this.mask);
	};
	
	Paths.prototype.create = function() {
		PhaserComponents.Display.Container.prototype.create.call(this);
		this.addGfx();
		this.addMask();
		this.gfx.mask = this.mask;
	};
	
	Paths.prototype.destroy = function() {
		this.lineDrawer.endSignal.remove(this.onDrawerEnd, this);
		this.endSignal.dispose();
		this.endSignal = null;
		this.removeGfx();
		PhaserComponents.Display.Container.prototype.destroy.call(this);
	};
	
	return Paths;

});
	
