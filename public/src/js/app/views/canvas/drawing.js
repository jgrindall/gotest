
define(['phasercomponents',

'app/views/canvas/turtle', 'app/views/canvas/paths',

'app/models/modelfacade',

'app/logocommands/movecommand',

'app/logocommands/turncommand',

'app/events/events', 'app/consts/playingstate',

'app/logocommands/fdcommand', 'app/consts/steplengths', 'app/assets'],

function(PhaserComponents,

Turtle, Paths,

ModelFacade,

MoveCommand,

TurnCommand,

Events, PlayingState,

FdCommand, StepLengths, Assets){
	
	"use strict";
	
	var Drawing  = function(options){
		PhaserComponents.Display.Container.call(this, options);
		this.modelFacade.get(ModelFacade.COMMTICKER).executeSignal.add(this.commandExecute, this);
		this.modelFacade.get(ModelFacade.COMMTICKER).resetSignal.add(this.onReset, this);
		this.modelFacade.get(ModelFacade.STARTPOS).changeSignal.add(this.onChangeStartPos, this);
		this.modelFacade.get(ModelFacade.COMM).changeSignal.add(this.setProgress, this);
		this.modelFacade.get(ModelFacade.SCREEN).changeSignal.add(this.onChangeScreen, this);
		this.rotateHandler = this.onRotateTurtle.bind(this);
		this.eventDispatcher.addListener(Events.ROTATE_TURTLE, this.rotateHandler);
		this.onReset();
	};

	Drawing.PI = 			3.1415;
	Drawing.PI180 = 		Drawing.PI/180;
	Drawing.RT2 = 			1.4142;
	Drawing.ONE_RT2 = 		1/Drawing.RT2;
	Drawing.ANGLES = 		[135, 90, 45, 180, 90, 0, 225, -90, -45];
	Drawing.ROTATE = 		[[0, 0, 0, -45, 0, 45, 0, 0, 0], [0, 0, 0, -90, 0, 90, 0, 0, 0]];
	Drawing.DIAG = 			[Drawing.RT2, 1, Drawing.RT2, 1, 1, 1, Drawing.RT2, 1, Drawing.RT2];
		
	PhaserComponents.Utils.extends(Drawing, PhaserComponents.Display.Container);

	Drawing.prototype.onChangeScreen = function(){
		this.angle = -90;
		this.setTurtle();
	};

	Drawing.prototype.onRotateTurtle = function(event, obj){
		var playingState = this.modelFacade.get(ModelFacade.PLAYING).get();
		if(playingState === PlayingState.NOT_PLAYING){
			this.angle = -Drawing.ANGLES[obj.data.direction];
			this.setTurtle();
		}
	};

	Drawing.prototype.onChangeStartPos = function(){
		this.setStart();
		this.turtle.reset(this.startPos);
	};

	Drawing.prototype.setProgress = function(){
		var total = this.modelFacade.get(ModelFacade.COMM).getNum();
		if(total > 0){
			this.turtle.disableMove();
		}
		else{
			this.turtle.enableMove();
		}
	};

	Drawing.prototype.onReset = function(){
		this.setStart();
		this.turtle.reset(this.startPos);
		this.angle = -90;
		this.setTurtle();
		this.paths.clear();
	};
	
	Drawing.prototype.setStart = function(){
		var x, y, pos;
		pos = this.modelFacade.get(ModelFacade.STARTPOS).get();
		if(pos){
			x = this.bounds.x + this.bounds.w * pos.x;
			y = this.bounds.y + this.bounds.h * pos.y;
			this.startPos = {'x':x, 'y':y};
		}
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
		currentStepLengthIndex = this.modelFacade.get(ModelFacade.STEPLENGTH).get();
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
		this.turtle.tweenTo(this.endPos, this.duration*1.1);
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
	
	Drawing.prototype.turtleMoved = function(pos) {
		var p = {'x':(pos.x - this.bounds.x)/this.bounds.w, 'y':(pos.y - this.bounds.y)/this.bounds.h};
		this.modelFacade.get(ModelFacade.STARTPOS).set(p);
	};

	Drawing.prototype.create = function() {
		PhaserComponents.Display.Container.prototype.create.call(this);
		this.addPaths();
		this.addTurtle();
	};
	
	Drawing.prototype.addTurtle = function() {
		this.turtle = new Turtle({'bounds':this.bounds, 'asset':Assets.TURTLE});
		this.turtle.endSignal.add(this.commandFinished, this);
		this.turtle.movedSignal.add(this.turtleMoved, this);
		this.group.add(this.turtle.view);
	};
	
	Drawing.prototype.commandFinished = function() {
		this.startPos = this.endPos;
		this.modelFacade.get(ModelFacade.COMMTICKER).nextCommand();
	};
	
	Drawing.prototype.addPaths = function() {
		this.paths = new Paths({'bounds':this.bounds});
		this.paths.endSignal.add(this.commandFinished, this);
		this.group.add(this.paths.view);
	};
	
	Drawing.prototype.destroy = function() {
		this.eventDispatcher.removeListener(Events.ROTATE_TURTLE, this.rotateHandler);
		this.modelFacade.get(ModelFacade.COMMTICKER).executeSignal.remove(this.commandExecute, this);
		this.modelFacade.get(ModelFacade.COMMTICKER).resetSignal.remove(this.onReset, this);
		this.modelFacade.get(ModelFacade.STARTPOS).changeSignal.remove(this.onChangeStartPos, this);
		this.modelFacade.get(ModelFacade.COMM).changeSignal.remove(this.setProgress, this);
		this.modelFacade.get(ModelFacade.SCREEN).changeSignal.remove(this.onChangeScreen, this);
		this.paths.endSignal.remove(this.commandFinished, this);
		this.turtle.endSignal.remove(this.commandFinished, this);
		this.turtle.movedSignal.remove(this.turtleMoved, this);
		this.group.remove(this.paths.view);
		this.group.remove(this.turtle.view);
		this.paths.destroy();
		this.turtle.destroy();
		PhaserComponents.Display.Container.prototype.destroy.call(this);
		this.rotateHandler = null;
		this.paths = null;
		this.turtle = null;
	};
	
	return Drawing;

});
	
