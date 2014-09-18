
define(['app/models/commmodel', 'app/models/screenmodel', 'app/models/bgmodel', 

'app/models/colormodel', 'app/models/speedmodel',

'app/models/playingmodel', 'app/models/gridmodel', 'app/models/anglemodel',

'app/models/widthmodel', 'app/models/steplengthmodel', 'app/models/diagmodel', 'app/models/prognummodel',

'app/models/progtypemodel', 'app/models/allowprogmodel', 'app/models/turtlemodel', 'app/models/namemodel',

'app/models/commtickermodel', 'app/consts/playingstate', 'app/consts/commspeed'],

function(CommModel, ScreenModel, BgModel,

	ColorModel, SpeedModel,

	PlayingModel, GridModel, AngleModel, 

	WidthModel, StepLengthModel, DiagModel, ProgNumModel,

	ProgTypeModel, AllowProgModel, TurtleModel, NameModel,

	CommTickerModel, PlayingState, CommSpeed){
	
	"use strict";

	var ModelFacade  = function(){
		this.init();
	};

	ModelFacade.SPEED = 		"speed";
	ModelFacade.BG = 			"bg";
	ModelFacade.COLOR = 		"color";
	ModelFacade.GRID = 			"grid";
	ModelFacade.COMM = 			"comm";
	ModelFacade.SCREEN = 		"screen";
	ModelFacade.COMMTICKER = 	"commTicker";
	ModelFacade.PLAYING = 		"playing";
	ModelFacade.WIDTH = 		"width";
	ModelFacade.STEPLENGTH = 	"stepLength";
	ModelFacade.DIAG = 			"diag";
	ModelFacade.ANGLE = 		"angle";
	ModelFacade.PROG_TYPE = 	"progType";
	ModelFacade.ALLOW_PROG = 	"allowProg";
	ModelFacade.PROG_NUM = 		"progNum";
	ModelFacade.NAME = 			"name";
	ModelFacade.TURTLE = 		"turtle";

	ModelFacade.prototype.get = function(name){
		if(name === ModelFacade.SPEED){
			return this.speedModel;
		}
		else if(name === ModelFacade.BG){
			return this.bgModel;
		}
		else if(name === ModelFacade.ANGLE){
			return this.angleModel;
		}
		else if(name === ModelFacade.COLOR){
			return this.colorModel;
		}
		else if(name === ModelFacade.COMM){
			return this.commModel;
		}
		else if(name === ModelFacade.SCREEN){
			return this.screenModel;
		}
		else if(name === ModelFacade.DIAG){
			return this.diagModel;
		}
		else if(name === ModelFacade.NAME){
			return this.nameModel;
		}
		else if(name === ModelFacade.COMMTICKER){
			return this.commTickerModel;
		}
		else if(name === ModelFacade.PLAYING){
			return this.playingModel;
		}
		else if(name === ModelFacade.PROG_NUM){
			return this.progNumModel;
		}
		else if(name === ModelFacade.GRID){
			return this.gridModel;
		}
		else if(name === ModelFacade.WIDTH){
			return this.widthModel;
		}
		else if(name === ModelFacade.STEPLENGTH){
			return this.stepLengthModel;
		}
		else if(name === ModelFacade.PROG_TYPE){
			return this.progTypeModel;
		}
		else if(name === ModelFacade.ALLOW_PROG){
			return this.allowProgModel;
		}
		else if(name === ModelFacade.TURTLE){
			return this.turtleModel;
		}
		else{
			throw "no model "+name;
		}
	};

	ModelFacade.prototype.makeModels = function(){
		this.commModel = new CommModel();
		this.colorModel = new ColorModel();
		this.speedModel = new SpeedModel();
		this.bgModel = new BgModel();
		this.angleModel = new AngleModel();
		this.diagModel = new DiagModel();
		this.gridModel = new GridModel();
		this.stepLengthModel = new StepLengthModel();
		this.widthModel = new WidthModel();
		this.playingModel = new PlayingModel();
		this.screenModel = new ScreenModel();
		this.commTickerModel = new CommTickerModel();
		this.progTypeModel = new ProgTypeModel();
		this.allowProgModel = new AllowProgModel();
		this.turtleModel = new TurtleModel();
		this.nameModel = new NameModel();
		this.progNumModel = new ProgNumModel();
	};

	ModelFacade.prototype.init = function(){
		this.makeModels();
		this.commTickerModel.init(this.commModel);
		this.colorModel.changeSignal.add(this.changeColor, this);
		this.bgModel.changeSignal.add(this.changeBg, this);
		this.widthModel.changeSignal.add(this.changeWidth, this);
		this.playingModel.changeSignal.add(this.changePlaying, this);
		this.speedModel.changeSignal.add(this.changeSpeed, this);
		this.allowProgModel.changeSignal.add(this.changeAllowProg, this);
		//TODO - make them commands?
	};

	ModelFacade.prototype.setDuration = function() {
		var duration;
		if(this.playingModel.get() === PlayingState.PLAYING){
			duration = CommSpeed.ALL[this.speedModel.get()] * CommSpeed.SPEED_FACTOR;
		}
		else{
			duration = 0;
		}
		this.commTickerModel.duration = duration;
	};

	ModelFacade.prototype.changePlaying = function() {
		this.setDuration();
	};

	ModelFacade.prototype.changeAllowProg = function(value) {
		if(value === 0){
			this.progTypeModel.set(0);
			//TODO - add consts
		}
	};

	ModelFacade.prototype.changeWidth = function(value) {
		if(this.playingModel.get() === PlayingState.PLAYING){
			this.commTickerModel.update("width", value);
		}
	};

	ModelFacade.prototype.changeSpeed = function() {
		this.setDuration();
	};

	ModelFacade.prototype.changeBg = function() {
		this.commTickerModel.reset();
		this.commModel.reset();
	};

	ModelFacade.prototype.changeColor = function(value) {
		if(this.playingModel.get() === PlayingState.PLAYING){
			this.commTickerModel.update("color", value);
		}
	};

	ModelFacade.getInstance = function(){
		if(!ModelFacade.instance){
			ModelFacade.instance = new ModelFacade();
		}
		return ModelFacade.instance;
	};

	ModelFacade.prototype.setData = function(json){
		this.screenModel.set(json.settings.screen);
		this.colorModel.set(json.settings.color, {"force":true});
		this.speedModel.set(json.settings.speed);
		this.widthModel.set(json.settings.width);
		this.bgModel.set(json.settings.bg);
		this.gridModel.set(json.settings.grid);
		this.diagModel.set(json.settings.diag);
		this.turtleModel.set(json.settings.turtle);
		this.allowProgModel.set(json.settings.allowProg);
		this.angleModel.set(json.settings.angle);
		this.progTypeModel.set(json.settings.prog);
		this.stepLengthModel.set(json.settings.stepLength);
		this.nameModel.set(json.settings.name);
		this.progNumModel.set(json.settings.name);
		this.commModel.set(json.commands);
	};

	ModelFacade.prototype.getJson = function() {
		var json = {}, settings = {};
		settings.bg = 			this.bgModel.get();
		settings.screen = 		this.screenModel.get();
		settings.width = 		this.widthModel.get();
		settings.angle = 		this.angleModel.get();
		settings.stepLength = 	this.stepLengthModel.get();
		settings.speed = 		this.speedModel.get();
		settings.prog = 		this.progTypeModel.get();
		settings.grid = 		this.gridModel.get();
		settings.turtle = 		this.turtleModel.get();
		settings.color =	 	this.colorModel.get();
		settings.allowProg =	this.allowProgModel.get();
		settings.diag =	 		this.diagModel.get();
		settings.progNum =	 	this.progNumModel.get();
		settings.name =	 		this.nameModel.get();
		json.commands = 		this.commModel.toJson();
		json.settings = settings;
		return json;
	};
	
	return ModelFacade;

});
