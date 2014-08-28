
define(['app/game', 'app/components/container',

'app/scenes/activity/canvas/map', 'app/scenes/activity/canvas/turtle', 'app/scenes/activity/canvas/paths',

'app/scenes/activity/models/commtickermodel', 'app/scenes/activity/models/colormodel',

'app/scenes/activity/commands/commandtypes',

'app/scenes/activity/commands/movecommand',

'app/scenes/activity/commands/turncommand',

'app/scenes/activity/commands/fdcommand',

'app/scenes/activity/models/scalemodel'],

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
		Container.call(this, options);
		commTickerModel.executeSignal.add(this.commandExecute, this);
		commTickerModel.resetSignal.add(this.onReset, this);
		this.onReset();
	};
	
	Drawing.DIST = 80;
	Drawing.PI180 = 3.14159265359/180;
	Drawing.ONE_RT2 = 1/1.4142135624;
	Drawing.START_POS = {x:300, y:300};  //TODO - middle?
	Drawing.ANGLES = [135, 90, 45, 180, 0, 0, 225, -90, -45];
	Drawing.ROTATE_45 = [0, 0, 0, -45, 0, 45, 0, 0, 0];
	Drawing.ROTATE_90 = [0, 0, 0, 90, 0, -90, 0, 0, 0];
	Drawing.SCALES = [Drawing.ONE_RT2, 1, Drawing.ONE_RT2, 1, 1, 1, Drawing.ONE_RT2, 1, Drawing.ONE_RT2]; 
		
	Drawing.prototype = Object.create(Container.prototype);
	Drawing.prototype.constructor = Drawing;
	
	Drawing.prototype.onUndo = function(){
		
	};
	
	Drawing.prototype.onReset = function(){
		this.currentPos = $.extend({}, Drawing.START_POS);
		this.startPos = $.extend({}, Drawing.START_POS);
		this.turtle.reset(this.startPos);
		this.angle = -90;
		this.turtle.rotate(this.angle);
		this.paths.clear();
	};
	
	Drawing.prototype.commandExecute = function(data){
		this.execute(data.command, data.fraction, data.totalTime);
	};
	
	Drawing.prototype.setAngle = function(command) {
		this.angle = -Drawing.ANGLES[command.direction];
	};
	
	Drawing.prototype.setEndPoint = function(command) {
		var dx, dy, thetaRad;
		thetaRad = this.angle * Drawing.PI180;
		dx = Drawing.DIST * Math.cos(thetaRad);
		dy = Drawing.DIST * Math.sin(thetaRad);
		if(scaleModel.getData().scale){
			dx *= Drawing.SCALES[command.direction];
			dy *= Drawing.SCALES[command.direction];
		}
		if( (command instanceof FdCommand) && command.direction === 7){
			dx *= -1;
			dy *= -1;
		}
		this.endPos = {'x':this.startPos.x + dx, 'y':this.startPos.y + dy};
	};
	
	Drawing.prototype.executeFd = function(command, fraction, totalTime) {
		if(fraction === 0){
			this.startPos = {'x':this.currentPos.x, 'y':this.currentPos.y};
			this.setEndPoint(command);
			this.moveTurtleToEnd(totalTime);
		}
		this.createLine(command.color, fraction);
	};
	
	Drawing.prototype.moveTurtleToEnd = function(totalTime) {
		this.turtle.tweenTo(this.endPos, totalTime);
	};
	
	Drawing.prototype.rotateTurtle = function(time) {
		if(time === undefined){
			time = 100;
		}
		this.turtle.rotate(this.angle, time);
	};
	
	Drawing.prototype.createLine = function(clr, fraction) {
		var px, py, pos;
		px =  this.startPos.x + fraction * (this.endPos.x - this.startPos.x);
   		py =  this.startPos.y + fraction * (this.endPos.y - this.startPos.y);
		pos = {'x':px, 'y':py};
		this.paths.line(this.currentPos, pos, clr);
		this.turtle.move(pos);
		this.currentPos = {'x':pos.x, 'y':pos.y};
	};
	
	Drawing.prototype.executeMove = function(command, fraction, totalTime) {
		if(fraction === 0){
			this.startPos = {'x':this.currentPos.x, 'y':this.currentPos.y};
			this.setAngle(command);
			this.setEndPoint(command);
			this.rotateTurtle();
			this.moveTurtleToEnd(totalTime);
		}
		this.createLine(command.color, fraction);
		
	};
	
	Drawing.prototype.executeTurn = function(command, fraction, totalTime) {
		if(fraction === 0){
			this.angle = this.angle + Drawing.ROTATE_45[command.direction];
			this.rotateTurtle(totalTime/2);
		}
	};
	
	Drawing.prototype.execute = function(command, fraction, totalTime) {
		if(command instanceof MoveCommand){
			this.executeMove(command, fraction, totalTime);
		}
		else if(command instanceof TurnCommand){
			this.executeTurn(command, fraction, totalTime);
		}
		else if(command instanceof FdCommand){
			this.executeFd(command, fraction, totalTime);
		}
	};
	
	Drawing.prototype.create = function() {
		Container.prototype.create.call(this);
		this.addPaths();
		this.addTurtle();
	};
	
	Drawing.prototype.addTurtle = function() {
		this.turtle = new Turtle({'bounds':this.bounds});
		this.group.add(this.turtle.group);
	};
	
	Drawing.prototype.addPaths = function() {
		this.paths = new Paths({'bounds':this.bounds});
		this.group.add(this.paths.group);
	};
	
	Drawing.prototype.destroy = function() {
		Container.prototype.destroy.call(this);
		this.paths.destroy();
		this.turtle.destroy();
	};
	
	return Drawing;

});
	
