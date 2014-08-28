
define(['app/game', 'app/components/container', 'app/consts/colors'],

function(Game, Container, Colors){
	
	"use strict";
	
	var Paths  = function(options){
		Container.call(this, options);
		this.lines = [];
		this.color = 0;
	};
	
	Paths.WIDTH = 10;
	
	Paths.prototype = Object.create(Container.prototype);
	Paths.prototype.constructor = Paths;
	
	Paths.prototype.setColor = function(i) {
		this.color = i;
	};
	
	Paths.prototype.removeGfx = function() {
		if(this.gfx){
			this.gfx.destroy();
			this.group.remove(this, this.gfx);
			this.gfx = null;
		}
	};
	
	Paths.prototype.clear = function() {
		this.addGfx();
	};
	
	Paths.prototype.circle = function(p, clr) {
		this.gfx.lineStyle(Paths.WIDTH, clr, 1);
   		this.gfx.lineStyle(0, 0, 0);
   		this.gfx.beginFill(clr, 1);
		this.gfx.drawCircle(p.x, p.y, Paths.WIDTH/2);
		this.gfx.endFill();
	};
	
	Paths.prototype.line = function(p0, p1, clrIndex) {
		var clr = Colors.ALL[clrIndex];
		this.circle(p0, clr);
		this.gfx.lineStyle(Paths.WIDTH, clr, 1);
   		this.gfx.moveTo(p0.x, p0.y);
   		this.gfx.lineTo(p1.x, p1.y);
   		this.circle(p1, clr);
	};
	
	Paths.prototype.addGfx = function() {
		this.removeGfx();
		this.gfx = new Phaser.Graphics(Game.getInstance(), 0, 0);
		this.group.add(this.gfx);
	};
	
	Paths.prototype.clear = function(){
		this.removeGfx();
		this.addGfx();
	};
	
	Paths.prototype.addMask = function() {
		this.mask = new Phaser.Graphics(Game.getInstance(), 0, 0);
		this.mask.beginFill(0xff0000);
    	this.mask.drawRect(this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
    	this.mask.endFill();
    	this.group.add(this.mask);
	};
	
	Paths.prototype.create = function() {
		Container.prototype.create.call(this);
		this.addGfx();
		this.addMask();
		this.gfx.mask = this.mask;
	};
	
	Paths.prototype.destroy = function() {
		Container.prototype.destroy.call(this);
		this.removeGfx();
	};
	
	return Paths;

});
	
