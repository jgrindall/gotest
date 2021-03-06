
define(['phaser', 'base/consts/colors', 'base/consts/penwidths'],

function(Phaser, Colors, PenWidths){
	
	"use strict";
	
	var LineDrawer  = function(context2d){
		this.context2d = context2d;
		this.tickHandler = this.tick.bind(this);
		this.endSignal = new Phaser.Signal();
	};
	
	LineDrawer.STEPS = 4;
	
	LineDrawer.prototype.drawLine = function(p0, p1, command, duration, draw) {
		var intervalMillisecs;
		this.draw = draw;
		this.step = 0;
		this.command = command;
		this.duration = duration;
		this.p0 = p0;
		this.pos = {'x':p0.x, 'y':p0.y};
		this.p1 = p1;
		this.circle(p0);
		if(duration === 0){
			this.segment(p1);
			this.endLine();
		}
		else{
			intervalMillisecs = duration/LineDrawer.STEPS;
			this.interval = setInterval(this.tickHandler, intervalMillisecs);
		}
	};
	
	LineDrawer.prototype.stop = function() {
		if(this.interval){
			clearInterval(this.interval);
		}
	};
	
	LineDrawer.prototype.tick = function() {
		this.step++;
		if(this.step === LineDrawer.STEPS + 1){
			this.endLine();
		}
		else{
			this.tickLine();
			
		}
	};
	
	LineDrawer.prototype.tickLine = function() {
		var fraction, p, x, y;
		fraction = this.step / LineDrawer.STEPS;
		x = this.p0.x + fraction * (this.p1.x - this.p0.x);
		y = this.p0.y + fraction * (this.p1.y - this.p0.y);
		p = {'x':x, 'y':y};
		this.segment(p);
		this.pos = p;
	};
	
	LineDrawer.prototype.getColor = function() {
		var clr;
		if(this.command.color === null || this.command.color === undefined){
			clr = null;
		}
		else{
			clr = Colors.ALL[this.command.color];
		}
		return clr;
	};

	LineDrawer.prototype.getWidth = function() {
		return PenWidths.ALL[this.command.width];
	};
	
	LineDrawer.prototype.complete = function() {
		this.pos = {'x':this.p0.x, 'y':this.p0.y};
		this.segment(this.p1);
	};

	LineDrawer.prototype.endLine = function() {
		this.circle(this.p1);
		this.complete();
		this.stop();
		this.endSignal.dispatch({});
	};
	
	LineDrawer.prototype.segment = function(p) {
		var clr, width;
		clr = this.getColor();
		width = this.getWidth();
		if(clr !== null && this.draw){
			this.context2d.lineStyle(width, clr, 1);
   			this.context2d.moveTo(this.pos.x, this.pos.y);
   			this.context2d.lineTo(p.x, p.y);
   		}
	};
	
	LineDrawer.prototype.circle = function() {
		return;
		/*
   		var clr, width;
		clr = this.getColor();
		if(clr !== null){
			width = this.getWidth();
	   		this.context2d.lineStyle(0, 0, 0);
	   		this.context2d.beginFill(clr, 1);
			this.context2d.drawCircle(p.x, p.y, width/2);
			this.context2d.endFill();
		}
		*/
	};
	
	LineDrawer.prototype.destroy = function() {
		this.stop();
		this.endSignal.dispose();
		this.endSignal = null;
	};
	
	return LineDrawer;

});
	
		
	
	