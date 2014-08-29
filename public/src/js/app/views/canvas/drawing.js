
define(['app/game', 'app/components/container',

'app/activity//canvas/map', 'app/activity//canvas/turtle', 'app/activity//canvas/paths',

'app/activity//models/commtickermodel', 'app/activity//models/colormodel',

'app/activity//commands/commandtypes',

'app/activity//commands/movecommand',

'app/activity//commands/turncommand',

'app/activity//commands/fdcommand',

'app/activity//models/scalemodel'],

function(Game, Container,

Map, Turtle, Paths,

commTickerModel, colorModel,

CommandTypes,

MoveCommand,

TurnCommand,

FdCommand,

scaleModel){
	
	"use strict";
	
	var Drawing  = function(options){
		this.centre = {'x':options.bounds.x + options.bounds.w/2, 'y':options.bounds.y + options.bounds.h/2};
		Container.call(this, options);
		commTickerModel.executeSignal.add(this.commandExecute, this);
		commTickerModel.resetSignal.add(this.onReset, this);
		this.onReset();
	};
	
	Drawing.DIST = 80;
	Drawing.PI180 = 3.14159265359/180;
	Drawing.ONE_RT2 = 1/1.4142135624;
	Drawing.ANGLES = [135, 90, 45, 180, 0, 0, 225, -90, -45];
	Drawing.ROTATE_45 = [0, 0, 0, -45, 0, 45, 0, 0, 0];
	Drawing.ROTATE_90 = [0, 0, 0, 90, 0, -90, 0, 0, 0];
	Drawing.SCALES = [Drawing.ONE_RT2, 1, Drawing.ONE_RT2, 1, 1, 1, Drawing.ONE_RT2, 1, Drawing.ONE_RT2]; 
		
	Drawing.prototype = Object.create(Container.prototype);
	Drawing.prototype.constructor = Drawing;
	
	Drawing.prototype.onUndo = function(){
		
	};
	
	Drawing.prototype.onReset = function(){
		this.startPos = $.extend({}, this.centre);
		this.turtle.reset(this.startPos);
		this.angle = -90;
		this.setTurtle();
		this.paths.clear();
	};
	
	Drawing.prototype.commandExecute = function(data){
		this.command = data.command;
		this.duration = data.duration;
		if(this.command instanceof MoveCommand){
			this.executeMove();
		}
		else if(this.command instanceof TurnCommand){
			this.executeTurn();
		}
		else if(this.command instanceof FdCommand){
			this.executeFd();
		}
	};
	
	Drawing.prototype.setAngle = function() {
		this.angle = -Drawing.ANGLES[this.command.direction];
	};
	
	Drawing.prototype.isBackwards = function() {
		return (this.command instanceof FdCommand && this.command.direction === 7);
	};
	
	Drawing.prototype.setEndPoint = function() {
		var dx, dy, thetaRad;
		thetaRad = this.angle * Drawing.PI180;
		dx = Drawing.DIST * Math.cos(thetaRad);
		dy = Drawing.DIST * Math.sin(thetaRad);
		if(scaleModel.getData().scale){
			dx *= Drawing.SCALES[this.command.direction];
			dy *= Drawing.SCALES[this.command.direction];
		}
		if(this.isBackwards()){
			dx *= -1;
			dy *= -1;
		}
		this.endPos = {'x':this.startPos.x + dx, 'y':this.startPos.y + dy};
	};
	
	Drawing.prototype.moveTurtle = function() {
		this.turtle.tweenTo(this.endPos, this.duration);
	};
	
	Drawing.prototype.rotateTurtle = function(duration) {
		this.turtle.rotateTo(this.angle, duration);
	};
	
	Drawing.prototype.setTurtle = function() {
		this.turtle.setTo(this.angle);
	};
	
	Drawing.prototype.createLine = function() {
		this.paths.drawLine(this.startPos, this.endPos, this.command, this.duration);
	};
	
	Drawing.prototype.executeMove = function() {
		this.setAngle();
		this.setTurtle();
		this.setEndPoint();
		this.moveTurtle();
		this.createLine();
	};
	
	Drawing.prototype.executeFd = function() {
		this.setEndPoint();
		this.moveTurtle();
		this.createLine();
	};
	
	Drawing.prototype.executeTurn = function() {
		this.angle = this.angle + Drawing.ROTATE_45[this.command.direction];
		this.rotateTurtle(this.duration);
	};
	
	Drawing.prototype.create = function() {
		Container.prototype.create.call(this);
		this.addPaths();
		this.addTurtle();
	};
	
	Drawing.prototype.addTurtle = function() {
		this.turtle = new Turtle({'bounds':this.bounds});
		this.turtle.endSignal.add(this.commandFinished, this);
		this.group.add(this.turtle.group);
	};
	
	Drawing.prototype.commandFinished = function() {
		this.startPos = this.endPos;
		commTickerModel.nextCommand();
	};
	
	Drawing.prototype.addPaths = function() {
		this.paths = new Paths({'bounds':this.bounds});
		this.paths.endSignal.add(this.commandFinished, this);
		this.group.add(this.paths.group);
	};
	
	Drawing.prototype.destroy = function() {
		Container.prototype.destroy.call(this);
		this.paths.endSignal.remove(this.commandFinished, this);
		this.turtle.endSignal.remove(this.commandFinished, this);
		this.paths.destroy();
		this.turtle.destroy();
	};
	
	return Drawing;

});
	
