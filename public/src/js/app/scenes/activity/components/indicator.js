
define(['app/game'],

function(Game){
	
	"use strict";
	
	var Indicator = function(options){
		this.options = options;
		this.create();
	};

	Indicator.RADIUS = 100;
	
	Indicator.prototype.drawArc = function(percent){
		var x, y, r, angle;
		angle = percent * 2 * 3.14159265;
		r = Indicator.RADIUS;
		this.gfx.clear();
		this.gfx.lineStyle(10, 0x990099, 1);
		this.gfx.beginFill(0x990000, 1);
		this.gfx.arc(r, r, r, 0, -angle);
		this.gfx.endFill();
		
	};
	
	Indicator.prototype.create = function(){
		console.log(JSON.stringify(this.options));
		this.gfx = new Phaser.Graphics(Game.getInstance(), this.options.bounds.x, this.options.bounds.y);
		this.drawArc(0.7);
	};
	
	return Indicator;
});

