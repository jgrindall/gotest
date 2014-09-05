
define('app/models/modelfacade',['app/models/commmodel', 'app/models/screenmodel', 'app/models/bgmodel', 

'app/models/colormodel', 'app/models/speedmodel', 'app/consts/commspeed',

'app/models/playingmodel', 'app/models/gridmodel', 'app/models/anglemodel',

'app/models/widthmodel', 'app/models/steplengthmodel', 'app/models/diagmodel',

'app/models/commtickermodel', 'app/consts/playingstate'],

function(CommModel, ScreenModel, BgModel,

	ColorModel, SpeedModel, CommSpeed,

	PlayingModel, GridModel, AngleModel, 

	WidthModel, StepLengthModel, DiagModel,

	CommTickerModel, PlayingState){
	
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
		if(this.playingModel.getData().playing === PlayingState.PLAYING){
			duration = this.speedModel.getData().actualSpeed * CommSpeed.SPEED_FACTOR;
		}
		else{
			duration = 0;
		}
		this.commTickerModel.duration = duration;
	};

	ModelFacade.prototype.changePlaying = function(data) {
		this.setDuration();
	};

	ModelFacade.prototype.changeWidth = function(data) {
		if(this.playingModel.getData().playing === PlayingState.PLAYING){
			this.commTickerModel.update("width", data.index);
		}
	};

	ModelFacade.prototype.changeSpeed = function(data) {
		this.setDuration();
	};

	ModelFacade.prototype.changeBg = function(data) {
		this.commTickerModel.reset();
		this.commModel.reset();
	};

	ModelFacade.prototype.changeColor = function(data) {
		if(this.playingModel.getData().playing === PlayingState.PLAYING){
			this.commTickerModel.update("color", data.index);
		}
	};

	ModelFacade.getInstance = function(){
		if(!ModelFacade.instance){
			ModelFacade.instance = new ModelFacade();
		}
		return ModelFacade.instance;
	};

	ModelFacade.prototype.setData = function(json){
		this.screenModel.setData(json.settings.screen);
		this.colorModel.setData(json.settings.color);
		this.speedModel.setData(json.settings.speed);
		this.widthModel.setData(json.settings.width);
		this.bgModel.setData(json.settings.bg);
		this.gridModel.setData(json.settings.grid);
		this.diagModel.setData(json.settings.diag);
		this.angleModel.setData(json.settings.angle);
		this.stepLengthModel.setData(json.settings.stepLength);
		this.commModel.setData(json.commands);
	};

	ModelFacade.prototype.getJson = function() {
		var json = {}, settings = {};
		settings.bg = 			this.bgModel.getData().bg;
		settings.screen = 		this.screenModel.getData().index;
		settings.width = 		this.widthModel.getData().index;
		settings.angle = 		this.angleModel.getData().index;
		settings.stepLength = 	this.stepLengthModel.getData().index;
		settings.speed = 		this.speedModel.getData().index;
		settings.gridOn = 		this.gridModel.getData().on;
		settings.color =	 	this.colorModel.getData().index;
		json.commands = 		this.commModel.toJson();
		json.settings = settings;
		return json;
	};
	
	return ModelFacade;

});
