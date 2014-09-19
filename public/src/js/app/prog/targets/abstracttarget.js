define( ['app/prog/views/dropview'],

	function(DropView){
	
	"use strict";

	var AbstractTarget = function(parent){
		this.parent = parent;
		this.group = parent.group;
		this.bounds = parent.bounds;
		this.middle = this.bounds.x + this.bounds.w/2;
		this.game = parent.game;
		this.targets = parent.targets;
		this.gfx = new Phaser.Graphics(this.game, 0, 0);
		this.group.add(this.gfx);
	};

	AbstractTarget.LINE_THICK = 8;

	AbstractTarget.prototype.build = function(){
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
		this.targets.push(target);
		this.group.add(target.view);
	};

	AbstractTarget.prototype.destroy = function(){
		this.group.remove(this.gfx);
		this.gfx.destroy();
		this.gfx = null;
		this.parent = null;
		this.group = null;
		this.bounds = null;
		this.game = null;
		this.targets = null;
	};

	return AbstractTarget;
});

