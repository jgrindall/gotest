
define(['phasercomponents',

'base/views/canvas/turtle', 'base/views/canvas/paths',

'base/models/modelconsts',

'base/logocommands/movecommand', 'base/logocommands/commandtypes',

'base/logocommands/turncommand', 'base/logocommands/transportcommand',

'base/events/events', 'base/consts/playingstate',

'base/logocommands/fdcommand', 'base/consts/steplengths'],

function(PhaserComponents,

Turtle, Paths,

ModelConsts,

MoveCommand, CommandTypes,

TurnCommand, TransportCommand,

Events, PlayingState,

FdCommand, StepLengths){
	
	"use strict";
	
	var Drawing  = function(options){
		PhaserComponents.Display.Container.call(this, options);
		this.modelFacade.get(ModelConsts.COMMTICKER).executeSignal.add(this.commandExecute, this);
		this.modelFacade.get(ModelConsts.COMMTICKER).resetSignal.add(this.onReset, this);
		this.modelFacade.get(ModelConsts.SCREEN).changeSignal.add(this.onChangeScreen, this);
		this.modelFacade.get(ModelConsts.TURTLE).changeSignal.add(this.turtleChanged, this);
		this.modelFacade.get(ModelConsts.START_POS).changeSignal.add(this.startChanged, this);
		this.modelFacade.get(ModelConsts.TURTLE_PNG).changeSignal.add(this.turtlePngChanged, this);
		this.modelFacade.get(ModelConsts.PLAYING).changeSignal.add(this.playingChanged, this);
		this.modelFacade.get(ModelConsts.CHALLENGE).changeSignal.add(this.challengeChanged, this);
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

	Drawing.prototype.turtleChanged = function(value){
		if(value !== null){
			this.turtle.addTurtle();
			this.turtle.reset(this.startPos);
		}
	};

	Drawing.prototype.startChanged = function(){
		this.setStart();
	};

	Drawing.prototype.challengeChanged = function(data){
		console.log("challengeChanged chall is ", data);
		if(data === null){
			this.turtle.enableMove();
		}
		else{
			this.turtle.disableMove();
			this.turtle.hideMove();
		}
	};

	Drawing.prototype.playingChanged = function(data){
		var challenge = this.modelFacade.get(ModelConsts.CHALLENGE).get();
		console.log("playingChanged chall is ", challenge);
		if(data === PlayingState.NOT_PLAYING){
			if(challenge ===  null){
				this.turtle.enableMove();
			}
			this.turtle.stopAnim();
		}
		else if(data === PlayingState.PLAYING){
			console.log("play anim");
			this.turtle.disableMove();
			//this.turtle.playAnim();
		}
		else if(data === PlayingState.REPLAYING){
			this.turtle.disableMove();
			this.turtle.stopAnim();
		}
	};

	Drawing.prototype.turtlePngChanged = function(pngData){
		var img, that = this;
		if(pngData !== null){
			img = new Image();
			img.onload = function(){
				that.game.cache.addImage(Turtle.EDITOR_KEY, pngData, img);
				that.turtle.addTurtleUsingKey(Turtle.EDITOR_KEY, 1);
				that.turtle.reset(that.startPos);
				img.onload = null;
			};
			img.src = pngData;
		}
	};

	Drawing.prototype.onChangeScreen = function(){
		this.angle = -90;
		this.setTurtle();
	};

	Drawing.prototype.onRotateTurtle = function(event, obj){
		var playingState = this.modelFacade.get(ModelConsts.PLAYING).get();
		if(playingState === PlayingState.NOT_PLAYING){
			this.angle = -Drawing.ANGLES[obj.data.direction];
			this.setTurtle();
		}
	};

	Drawing.prototype.setProgress = function(){
		var total = this.modelFacade.get(ModelConsts.COMM).getNum(true);
		if(total > 0){
			this.turtle.hideMove();
		}
		else{
			if(this.modelFacade.get(ModelConsts.CHALLENGE).get() === null){
				this.turtle.showMove();
			}
		}
	};

	Drawing.prototype.onReset = function(){
		this.setStart();
		this.turtle.reset(this.startPos);
		this.angle = -90;
		this.setTurtle();
		this.paths.clear();
        this.turtle.showMove();
		this.eventDispatcher.trigger({"type":Events.CHECK_POSITION, "data":this.startPos});
	};
	
	Drawing.prototype.setStart = function(){
		var pos;
		pos = this.modelFacade.get(ModelConsts.START_POS).get();
		this.startPos = this.fractionToPos(pos);
		this.turtle.move(this.startPos);
        this.turtle.showMove();
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
		else if(this.command instanceof TransportCommand){
			this.executeTransport();
		}
		this.setProgress();
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
				scale *= -1;
			}	
		}
		return scale;
	};

	Drawing.prototype.setEndPoint = function() {
		var dx, dy, thetaRad, distIndex, scale, dist, currentStepLengthIndex, currentStepLength;
		distIndex = this.command.stepLength;
		currentStepLengthIndex = this.modelFacade.get(ModelConsts.STEPLENGTH).get();
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
	
	Drawing.prototype.executeTransport = function() {
		this.endPos = this.fractionToPos(this.command.direction);
		this.turtle.move(this.endPos);
		this.commandFinished();
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
		var p, json;
		p = this.posToFraction(pos);
		json = {'type':CommandTypes.TRANSPORT, 'direction':p, 'index':0, 'total':1};
		this.eventDispatcher.trigger({"type":Events.ADD_COMMAND, "data":json});
	};

	Drawing.prototype.roundPoint = function(p, ten) {
		var x, y;
		x = this.round(p.x, ten);
		y = this.round(p.y, ten);
		return {'x':x, 'y':y};
	};
	
	Drawing.prototype.round = function(n, ten) {
		return Math.round(n * ten)/ten;
	};

	Drawing.prototype.fractionToPos = function(p) {
		var pos, x, y;
		x = (p.x * this.bounds.w) + this.bounds.x;
		y = (p.y * this.bounds.h) + this.bounds.y;
		pos = {'x':x, 'y':y};
		return this.roundPoint(pos, 10);
	};

	Drawing.prototype.posToFraction = function(pos) {
		var p;
		p = {'x':(pos.x - this.bounds.x)/this.bounds.w, 'y':(pos.y - this.bounds.y)/this.bounds.h};
		return this.roundPoint(p, 1000);
	};

	Drawing.prototype.create = function() {
		PhaserComponents.Display.Container.prototype.create.call(this);
		this.addPaths();
		this.addTurtle();
	};
	
	Drawing.prototype.addTurtle = function() {
		this.turtle = new Turtle({'bounds':this.bounds});
		this.turtle.endSignal.add(this.commandFinished, this);
		this.turtle.movedSignal.add(this.turtleMoved, this);
		this.group.add(this.turtle.view);
	};
	
	Drawing.prototype.commandFinished = function() {
		this.startPos = this.endPos;
		this.eventDispatcher.trigger({"type":Events.CHECK_CHALLENGE, "data":this.endPos});
		this.eventDispatcher.trigger({"type":Events.CHECK_POSITION, "data":this.endPos});
		this.modelFacade.get(ModelConsts.COMMTICKER).nextCommand();
	};
	
	Drawing.prototype.addPaths = function() {
		this.paths = new Paths({'bounds':this.bounds});
		this.paths.endSignal.add(this.commandFinished, this);
		this.group.add(this.paths.view);
	};
	
	Drawing.prototype.destroy = function() {
		this.eventDispatcher.removeListener(Events.ROTATE_TURTLE, this.rotateHandler);
		this.modelFacade.get(ModelConsts.COMMTICKER).executeSignal.remove(this.commandExecute, this);
		this.modelFacade.get(ModelConsts.COMMTICKER).resetSignal.remove(this.onReset, this);
		this.modelFacade.get(ModelConsts.COMM).changeSignal.remove(this.setProgress, this);
		this.modelFacade.get(ModelConsts.SCREEN).changeSignal.remove(this.onChangeScreen, this);
		this.modelFacade.get(ModelConsts.TURTLE_PNG).changeSignal.remove(this.turtlePngChanged, this);
		this.modelFacade.get(ModelConsts.TURTLE).changeSignal.remove(this.turtleChanged, this);
		this.modelFacade.get(ModelConsts.PLAYING).changeSignal.remove(this.playingChanged, this);
		this.modelFacade.get(ModelConsts.CHALLENGE).changeSignal.remove(this.challengeChanged, this);
		this.onEditorDone = null;
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
	
