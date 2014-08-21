
define(['app/game', 'app/components/container',

'app/scenes/activity/map', 'app/scenes/activity/turtle', 'app/scenes/activity/paths',

'app/scenes/activity/commmodel', 'app/scenes/activity/colormodel'],

function(Game, Container,

Map, Turtle, Paths,

commModel, colorModel){
	
	"use strict";
	
	var Drawing  = function(options){
		Container.call(this, options);
		commModel.executeSignal.add(this.commandExecute, this);
		commModel.resetSignal.add(this.reset, this);
		colorModel.changeSignal.add(this.colorChange, this);
		this.reset();
	};
	
	Drawing.DIST = 100;
	Drawing.PI180 = 3.14159/180;
	Drawing.START_POS = {x:300, y:300};
	
	Drawing.prototype = Object.create(Container.prototype);
	Drawing.prototype.constructor = Drawing;
	
	Drawing.prototype.colorChange = function(data){
		this.paths.setColor(data.color);
	};
	
	Drawing.prototype.reset = function(){
		this.currentPos = $.extend({}, Drawing.START_POS);
		this.startPos = $.extend({}, Drawing.START_POS);
		this.turtle.move(this.startPos, 0);
		this.angle = 0;
		this.paths.clear();
	};
	
	Drawing.prototype.commandExecute = function(data){
		var command, fraction;
		command = data.command;
		fraction = data.fraction;
		this.execute(command, fraction);
	};
	
	Drawing.prototype.setHeading = function(command) {
		var dx, dy, angles, thetaRad;
		angles = [135, 90, 45, 180, 0, 0, 225, -90, -45];
		this.angle = -angles[command.index];
		thetaRad = this.angle * Drawing.PI180;
		dx = Drawing.DIST * command.num * Math.cos(thetaRad);
		dy = Drawing.DIST * command.num * Math.sin(thetaRad);
		this.endPos = {'x':this.startPos.x + dx, 'y':this.startPos.y + dy};
	};
	
	Drawing.prototype.execute = function(command, fraction) {
		console.log("command "+command.index+" / /"+command.num+" / "+fraction);
		var px, py, endPos;
		if(fraction === 0){
			this.startPos = {'x':this.currentPos.x, 'y':this.currentPos.y};
			this.setHeading(command);
		}
		px =  this.startPos.x + fraction * (this.endPos.x - this.startPos.x);
   		py =  this.startPos.y + fraction * (this.endPos.y - this.startPos.y);
		endPos = {'x':px, 'y':py};
		this.paths.line(this.currentPos, endPos);
		this.turtle.move(endPos, this.angle);
		this.currentPos = {'x':endPos.x, 'y':endPos.y};
	};
	
	Drawing.prototype.create = function() {
		Container.prototype.create.call(this);
		this.addPaths();
		this.addTurtle();
	};
	
	Drawing.prototype.addTurtle = function() {
		var bounds = {'x':50, 'y':50, 'w':600, 'h':50};
		this.turtle = new Turtle({'bounds':bounds});
		this.group.add(this.turtle.group);
	};
	
	Drawing.prototype.addPaths = function() {
		var bounds = {'x':50, 'y':50, 'w':600, 'h':50};
		this.paths = new Paths({'bounds':bounds});
		this.group.add(this.paths.group);
	};
	
	Drawing.prototype.destroy = function() {
		Container.prototype.destroy.call(this);
		this.paths.destroy();
		this.turtle.destroy();
	};
	
	return Drawing;

});
	
