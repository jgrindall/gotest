
define(['app/game'],

function(Game){
	
	"use strict";
	
	var Indicator = function(options){
		this.options = options;
		this.create();
	};

	Indicator.RADIUS = 40;
	
	Indicator.prototype.setProgress = function(num, total){
		this.drawArc(1 - num/total);
	};
	
	Indicator.prototype.drawArc = function(percent){
		var r, x, y, angle;
		angle = percent * 2 * 3.14159265;
		r = Indicator.RADIUS;
		x = r + Math.cos(angle);
		y = r + Math.sin(angle);
		this.gfx.clear();
		this.gfx.lineStyle(0, 0x990099, 0);
		this.gfx.beginFill(0x990000, 1);
		this.gfx.moveTo(r, r);
		this.gfx.lineTo(x, y);
		this.gfx.arc(r, r, r, -angle, 0);
		this.gfx.lineTo(r, r);
		this.gfx.endFill();
		
	};
	
	Indicator.prototype.create = function(){
		console.log(JSON.stringify(this.options));
		this.gfx = new Phaser.Graphics(Game.getInstance(), this.options.bounds.x, this.options.bounds.y);
	};
	
	return Indicator;
});

