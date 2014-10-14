define( ['app/prog/views/dropview'],

	function(DropView){
	
	"use strict";

	var AbstractTarget = function(){
		
	};

	AbstractTarget.LINE_THICK = 8;

	AbstractTarget.prototype.build = function(parent){
		this.parent = parent;
		this.bounds = parent.bounds;
		this.middle = this.bounds.x + this.bounds.w/2;
		this.game = parent.game;
		this.gfx = new Phaser.Graphics(this.game, 0, 0);
		this.parent.addGfx(this.gfx);
		this.decorate();
		this.addBlocks();
	};

	AbstractTarget.prototype.circle = function(p){
		this.gfx.lineStyle(0, 0x000000, 0);
		this.gfx.beginFill(0xffffff, 1);
		this.gfx.drawCircle(p.x, p.y, AbstractTarget.LINE_THICK/2);
		this.gfx.endFill();
	};

	AbstractTarget.prototype.drawLine = function(p0, p1){
		this.circle(p0);
		this.circle(p1);
		this.gfx.lineStyle(AbstractTarget.LINE_THICK, 0xffffff, 1);
   		this.gfx.moveTo(p0.x, p0.y);
   		this.gfx.lineTo(p1.x, p1.y);
	};

	AbstractTarget.prototype.addTarget = function(options){
		var target = new DropView(options);
		this.parent.addTarget(target);
	};

	AbstractTarget.prototype.destroy = function(){
		this.parent.removeGfx(this.gfx);
		this.gfx.destroy();
		this.gfx = null;
		this.container = null;
		this.bounds = null;
		this.game = null;
	};

	return AbstractTarget;
});

