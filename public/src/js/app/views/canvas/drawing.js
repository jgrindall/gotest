
define([ 'phasercomponents',

'app/views/canvas/turtle', 'app/views/canvas/paths',

'app/models/modelfacade',

'app/logocommands/movecommand',

'app/logocommands/turncommand',

'app/logocommands/fdcommand', 'app/consts/steplengths', 'app/assets'],

function(PhaserComponents,

Turtle, Paths,

ModelFacade,

MoveCommand,

TurnCommand,

FdCommand, StepLengths, Assets){
	
	"use strict";
	
	var Drawing  = function(options){
		var x, y;
		x = options.bounds.x + options.bounds.w/2;
		y = options.bounds.y + options.bounds.h/2;
		this.centre = {'x':x, 'y':y};
		PhaserComponents.Display.Container.call(this, options);
		ModelFacade.getInstance().get(ModelFacade.COMMTICKER).executeSignal.add(this.commandExecute, this);
		ModelFacade.getInstance().get(ModelFacade.COMMTICKER).resetSignal.add(this.onReset, this);
		this.onReset();
	};
	
	Drawing.PI180 = 3.14159265359/180;
	Drawing.RT2 = 1.4142135624;
	Drawing.ONE_RT2 = 1/Drawing.RT2;
	Drawing.ANGLES = [135, 90, 45, 180, 0, 0, 225, -90, -45];
	Drawing.ROTATE = [[0, 0, 0, -45, 0, 45, 0, 0, 0], [0, 0, 0, -90, 0, 90, 0, 0, 0]];
	Drawing.DIAG = [Drawing.RT2, 1, Drawing.RT2, 1, 1, 1, Drawing.RT2, 1, Drawing.RT2];
		
	PhaserComponents.Utils.extends(Drawing, PhaserComponents.Display.Container);

	Drawing.prototype.onReset = function(){
		this.startPos = {'x':this.centre.x, 'y':this.centre.y};
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
	
	Drawing.prototype.getScaleFactor = function(){
		var scale = 1;
		if(this.command instanceof MoveCommand){
			if(this.command.diag === 1){
				scale = Drawing.DIAG[this.command.direction];
			}
		}
		else if (this.command instanceof FdCommand){
			if(this.command.diag){
				scale = (this.angle % 90 === 0) ? 1 : Drawing.RT2;
			}
			if(this.command.direction === 7){
				//backwards!
				scale *= -1;
			}	
		}
		return scale;
	};

	Drawing.prototype.setEndPoint = function() {
		var dx, dy, thetaRad, distIndex, scale, dist, currentStepLengthIndex, currentStepLength;
		distIndex = this.command.stepLength;
		currentStepLengthIndex = ModelFacade.getInstance().get(ModelFacade.STEPLENGTH).get();
		currentStepLength = StepLengths.ALL[currentStepLengthIndex];
		dist = StepLengths.ALL[distIndex];
		thetaRad = this.angle * Drawing.PI180;
		dx = dist * Math.cos(thetaRad);
		dy = dist * Math.sin(thetaRad);
		scale = this.getScaleFactor();
		dx *= scale;
		dy *= scale;
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
		this.angle = this.angle + Drawing.ROTATE[this.command.angle][this.command.direction];
		this.endPos = this.startPos;
		this.rotateTurtle(this.duration);
	};
	
	Drawing.prototype.create = function() {
		PhaserComponents.Display.Container.prototype.create.call(this);
		this.addPaths();
		this.addTurtle();
	};
	
	Drawing.prototype.addTurtle = function() {
		this.turtle = new Turtle({'bounds':this.bounds, 'asset':Assets.TURTLE});
		this.turtle.endSignal.add(this.commandFinished, this);
		this.group.add(this.turtle.group);
	};
	
	Drawing.prototype.commandFinished = function() {
		this.startPos = this.endPos;
		ModelFacade.getInstance().get(ModelFacade.COMMTICKER).nextCommand();
	};
	
	Drawing.prototype.addPaths = function() {
		this.paths = new Paths({'bounds':this.bounds});
		this.paths.endSignal.add(this.commandFinished, this);
		this.group.add(this.paths.group);
	};
	
	Drawing.prototype.destroy = function() {
		PhaserComponents.Display.Container.prototype.destroy.call(this);
		this.paths.endSignal.remove(this.commandFinished, this);
		this.turtle.endSignal.remove(this.commandFinished, this);
		this.paths.destroy();
		this.turtle.destroy();
	};
	
	return Drawing;

});
	
