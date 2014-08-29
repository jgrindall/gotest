
define(['app/game'],

function(Game){
	
	"use strict";
	
	var LineDrawer  = function(context2d){
		this.context2d = context2d;
		this.endSignal = new Phaser.Signal();
	};
	
	LineDrawer.STEPS = 4;
	
	LineDrawer.prototype.drawLine = function(p0, p1, command, duration, width) {
		console.log("drawLine ", p0.x, p0.y, p1.x, p1.y, duration);
		this.step = 0;
		this.command = command;
		this.duration = duration;
		this.width = width;
		this.p0 = p0;
		this.pos = $.extend({}, p0);
		this.p1 = p1;
		if(duration === 0){
			this.segment(p1);
			this.endLine();
		}
		else{
			this.interval = setInterval($.proxy(this.tick, this), duration/LineDrawer.STEPS);
		}
	};
	
	LineDrawer.prototype.stop = function() {
		if(this.interval){
			clearInterval(this.interval);
		}
	};
	
	LineDrawer.prototype.tick = function() {
		var fraction, p, x, y;
		this.step++;
		if(this.step === LineDrawer.STEPS + 1){
			this.endLine();
		}
		else{
			fraction = this.step / LineDrawer.STEPS;
			x = this.p0.x + fraction * (this.p1.x - this.p0.x);
			y = this.p0.y + fraction * (this.p1.y - this.p0.y);
			p = {'x':x, 'y':y};
			this.segment(p);
			this.pos = p;
		}
	};
	
	LineDrawer.prototype.endLine = function() {
		this.stop();
		this.endSignal.dispatch({});
	};
	
	LineDrawer.prototype.segment = function(p) {
		var clr = 0x000000;
		this.context2d.lineStyle(10, clr, 1);
   		this.context2d.moveTo(this.pos.x, this.pos.y);
   		this.context2d.lineTo(p.x, p.y);
	};
	
	LineDrawer.prototype.circle = function() {
		this.context2d.lineStyle(this.width, clr, 1);
   		this.context2d.lineStyle(0, 0, 0);
   		this.context2d.beginFill(clr, 1);
		this.context2d.drawCircle(p.x, p.y, Paths.WIDTH/2);
		this.context2d.endFill();
	};
	
	LineDrawer.prototype.destroy = function() {
		this.stop();
		this.endSignal.dispose();
		this.endSignal = null;
	};
	
	return LineDrawer;

});
	
		
	
	