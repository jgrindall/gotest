
define(['app/models/commmodel', 'app/models/screenmodel', 'app/models/bgmodel', 

'app/models/colormodel', 'app/models/speedmodel', 'app/models/startposmodel', 'app/models/selectedcommmodel',

'app/models/playingmodel', 'app/models/gridmodel', 'app/models/anglemodel', 'app/models/progmodel',

'app/models/widthmodel', 'app/models/steplengthmodel', 'app/models/diagmodel', 'app/models/prognummodel',

'app/models/progtypemodel', 'app/models/allowprogmodel', 'app/models/turtlemodel', 'app/models/namemodel',

'app/models/commtickermodel', 'app/consts/playingstate', 'app/consts/commspeed'],

function(CommModel, ScreenModel, BgModel,

	ColorModel, SpeedModel, StartPosModel, SelectedCommModel,

	PlayingModel, GridModel, AngleModel, ProgModel,

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
	ModelFacade.STARTPOS = 		"startpos";
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
	ModelFacade.PROG = 			"prog";
	ModelFacade.NAME = 			"name";
	ModelFacade.TURTLE = 		"turtle";
	ModelFacade.SELECTED_COMM = "selectedComm";

	ModelFacade.prototype.get = function(name){
		if(name === ModelFacade.SPEED){
			return this.speedModel;
		}
		else if(name === ModelFacade.BG){
			return this.bgModel;
		}
		else if(name === ModelFacade.STARTPOS){
			return this.startPosModel;
		}
		else if(name === ModelFacade.SELECTED_COMM){
			return this.selCommModel;
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
		else if(name === ModelFacade.PROG){
			return this.progModel;
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
		this.progModel = new ProgModel();
		this.allowProgModel = new AllowProgModel();
		this.turtleModel = new TurtleModel();
		this.nameModel = new NameModel();
		this.progNumModel = new ProgNumModel();
		this.startPosModel = new StartPosModel();
		this.selCommModel = new SelectedCommModel();
	};

	ModelFacade.prototype.addListeners = function(){
		this.colorModel.changeSignal.add(		this.changeColor, 		this);
		this.bgModel.changeSignal.add(			this.changeBg, 			this);
		this.widthModel.changeSignal.add(		this.changeWidth, 		this);
		this.playingModel.changeSignal.add(		this.changePlaying, 	this);
		this.speedModel.changeSignal.add(		this.changeSpeed, 		this);
		this.allowProgModel.changeSignal.add(	this.changeAllowProg, 	this);
	};

	ModelFacade.prototype.removeListeners = function(){
		this.colorModel.changeSignal.remove(this.changeColor, this);
		this.bgModel.changeSignal.remove(this.changeBg, this);
		this.widthModel.changeSignal.remove(this.changeWidth, this);
		this.playingModel.changeSignal.remove(this.changePlaying, this);
		this.speedModel.changeSignal.remove(this.changeSpeed, this);
		this.allowProgModel.changeSignal.remove(this.changeAllowProg, this);
	};

	ModelFacade.prototype.init = function(){
		this.makeModels();
		this.commTickerModel.init(this.commModel);
		this.addListeners();
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
		this.startPosModel.set(json.settings.startPos);
		this.nameModel.set(json.settings.name);
		this.progNumModel.set(json.settings.progNum);
		this.commModel.set(json.commands);
		this.progModel.set(json.prog);
	};

	ModelFacade.prototype.getJson = function() {
		var json = {}, settings = {};
		settings.bg = 			this.bgModel.get();
		settings.screen = 		this.screenModel.get();
		settings.width = 		this.widthModel.get();
		settings.angle = 		this.angleModel.get();
		settings.stepLength = 	this.stepLengthModel.get();
		settings.speed = 		this.speedModel.get();
		settings.startPos = 	this.startPosModel.get();
		settings.prog = 		this.progTypeModel.get();
		settings.grid = 		this.gridModel.get();
		settings.turtle = 		this.turtleModel.get();
		settings.color =	 	this.colorModel.get();
		settings.allowProg =	this.allowProgModel.get();
		settings.diag =	 		this.diagModel.get();
		settings.progNum =	 	this.progNumModel.get();
		settings.name =	 		this.nameModel.get();
		json.commands = 		this.commModel.toJson();
		json.prog = 			this.progModel.get();
		json.settings = settings;
		return json;
	};
	
	ModelFacade.prototype.destroyModels = function(){
		this.screenModel.destroy();
		this.colorModel.destroy();
		this.speedModel.destroy();
		this.widthModel.destroy();
		this.bgModel.destroy();
		this.gridModel.destroy();
		this.diagModel.destroy();
		this.turtleModel.destroy();
		this.allowProgModel.destroy();
		this.angleModel.destroy();
		this.progTypeModel.destroy();
		this.stepLengthModel.destroy();
		this.nameModel.destroy();
		this.progNumModel.destroy();
		this.commModel.destroy();
		this.progModel.destroy();
		this.screenModel = null;
		this.colorModel = null;
		this.speedModel = null;
		this.widthModel = null;
		this.bgModel = null;
		this.gridModel = null;
		this.diagModel = null;
		this.turtleModel = null;
		this.allowProgModel = null;
		this.angleModel = null;
		this.progTypeModel = null;
		this.stepLengthModel = null;
		this.nameModel = null;
		this.progNumModel = null;
		this.commModel = null;
		this.progModel = null;
		this.startPosModel = null;
	};

	ModelFacade.shutdown = function(){
		ModelFacade.getInstance().shutdown();
		ModelFacade.instance = null;
	};

	ModelFacade.prototype.shutdown = function(){
		this.removeListeners();
		this.destroyModels();
	};

	return ModelFacade;

});
