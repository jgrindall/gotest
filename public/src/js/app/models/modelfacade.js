
define(['app/models/commmodel', 'app/models/screenmodel', 'app/models/bgmodel', 

'app/models/colormodel', 'app/models/speedmodel',

'app/models/playingmodel', 'app/models/gridmodel', 'app/models/anglemodel',

'app/models/widthmodel', 'app/models/steplengthmodel', 'app/models/diagmodel', 'app/models/progmodel',

'app/models/commtickermodel', 'app/consts/playingstate', 'app/consts/commspeed'],

function(CommModel, ScreenModel, BgModel,

	ColorModel, SpeedModel,

	PlayingModel, GridModel, AngleModel, 

	WidthModel, StepLengthModel, DiagModel, ProgModel,

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
	ModelFacade.PROG = 			"prog";

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
		else if(name === ModelFacade.COMMTICKER){
			return this.commTickerModel;
		}
		else if(name === ModelFacade.PLAYING){
			return this.playingModel;
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
		else if(name === ModelFacade.PROG){
			return this.progModel;
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
		this.progModel = new ProgModel();
	};

	ModelFacade.prototype.init = function(){
		this.makeModels();
		this.commTickerModel.init(this.commModel);
		this.colorModel.changeSignal.add(this.changeColor, this);
		this.bgModel.changeSignal.add(this.changeBg, this);
		this.widthModel.changeSignal.add(this.changeWidth, this);
		this.playingModel.changeSignal.add(this.changePlaying, this);
		this.speedModel.changeSignal.add(this.changeSpeed, this);
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
		this.angleModel.set(json.settings.angle);
		this.progModel.set(json.settings.prog);
		this.stepLengthModel.set(json.settings.stepLength);
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
		settings.prog = 		this.progModel.get();
		settings.grid = 		this.gridModel.get();
		settings.color =	 	this.colorModel.get();
		settings.diag =	 		this.diagModel.get();
		json.commands = 		this.commModel.toJson();
		json.settings = settings;
		return json;
	};
	
	return ModelFacade;

});
