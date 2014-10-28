
define(['app/models/commmodel', 'app/models/screenmodel', 'app/models/bgmodel', 

'app/models/colormodel', 'app/models/speedmodel', 'app/models/startposmodel', 'app/models/selectedcommmodel',

'app/models/playingmodel', 'app/models/gridmodel', 'app/models/anglemodel', 'app/models/progmodel',

'app/models/widthmodel', 'app/models/steplengthmodel', 'app/models/diagmodel',

'app/models/prognummodel',

'app/models/progtypemodel', 'app/models/allowprogmodel', 'app/models/turtlemodel', 'app/models/namemodel',

'app/models/commtickermodel', 'app/consts/playingstate', 'app/consts/commspeed',

'app/models/bgpngmodel', 'app/models/turtlepngmodel',

'app/models/modelconsts'],

function(CommModel, ScreenModel, BgModel,

	ColorModel, SpeedModel, StartPosModel, SelectedCommModel,

	PlayingModel, GridModel, AngleModel, ProgModel,

	WidthModel, StepLengthModel, DiagModel,

	ProgNumModel,

	ProgTypeModel, AllowProgModel, TurtleModel, NameModel,

	CommTickerModel, PlayingState, CommSpeed, BgPngModel, TurtlePngModel,

	ModelConsts){
	
	"use strict";

	var ModelFacade  = function(){
		
	};

	ModelFacade.prototype.get = function(name){
		if(name === ModelConsts.SPEED){
			return this.speedModel;
		}
		else if(name === ModelConsts.BG){
			return this.bgModel;
		}
		else if(name === ModelConsts.START_POS){
			return this.startPosModel;
		}
		else if(name === ModelConsts.SELECTED_COMM){
			return this.selCommModel;
		}
		else if(name === ModelConsts.ANGLE){
			return this.angleModel;
		}
		else if(name === ModelConsts.COLOR){
			return this.colorModel;
		}
		else if(name === ModelConsts.COMM){
			return this.commModel;
		}
		else if(name === ModelConsts.SCREEN){
			return this.screenModel;
		}
		else if(name === ModelConsts.DIAG){
			return this.diagModel;
		}
		else if(name === ModelConsts.NAME){
			return this.nameModel;
		}
		else if(name === ModelConsts.COMMTICKER){
			return this.commTickerModel;
		}
		else if(name === ModelConsts.PLAYING){
			return this.playingModel;
		}
		else if(name === ModelConsts.PROG_NUM){
			return this.progNumModel;
		}
		else if(name === ModelConsts.GRID){
			return this.gridModel;
		}
		else if(name === ModelConsts.BG_PNG){
			return this.bgPngModel;
		}
		else if(name === ModelConsts.TURTLE_PNG){
			return this.turtlePngModel;
		}
		else if(name === ModelConsts.WIDTH){
			return this.widthModel;
		}
		else if(name === ModelConsts.STEPLENGTH){
			return this.stepLengthModel;
		}
		else if(name === ModelConsts.PROG_TYPE){
			return this.progTypeModel;
		}
		else if(name === ModelConsts.PROG){
			return this.progModel;
		}
		else if(name === ModelConsts.ALLOW_PROG){
			return this.allowProgModel;
		}
		else if(name === ModelConsts.TURTLE){
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
		this.bgPngModel = new BgPngModel();
		this.turtlePngModel = new TurtlePngModel();
	};

	ModelFacade.prototype.addListeners = function(){
		this.colorModel.changeSignal.add(		this.changeColor, 		this);
		this.bgModel.changeSignal.add(			this.changeBg, 			this);
		this.widthModel.changeSignal.add(		this.changeWidth, 		this);
		this.playingModel.changeSignal.add(		this.changePlaying, 	this);
		this.speedModel.changeSignal.add(		this.changeSpeed, 		this);
		this.allowProgModel.changeSignal.add(	this.changeAllowProg, 	this);
		this.screenModel.changeSignal.add(		this.changeScreen, 		this);
		this.bgPngModel.changeSignal.add(		this.changeBgPng, 		this);
		this.turtlePngModel.changeSignal.add(	this.changeTurtlePng, 	this);
		this.turtleModel.changeSignal.add(		this.changeTurtle, 		this);
	};

	ModelFacade.prototype.removeListeners = function(){
		this.colorModel.changeSignal.remove(		this.changeColor, 		this);
		this.bgModel.changeSignal.remove(			this.changeBg, 			this);
		this.widthModel.changeSignal.remove(		this.changeWidth, 		this);
		this.playingModel.changeSignal.remove(		this.changePlaying, 	this);
		this.speedModel.changeSignal.remove(		this.changeSpeed, 		this);
		this.allowProgModel.changeSignal.remove(	this.changeAllowProg, 	this);
		this.screenModel.changeSignal.remove(		this.changeScreen, 		this);
		this.bgPngModel.changeSignal.remove(		this.changeBgPng, 		this);
		this.turtlePngModel.changeSignal.remove(	this.changeTurtlePng, 	this);
		this.turtleModel.changeSignal.remove(		this.changeTurtle, 		this);
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

	ModelFacade.prototype.changeScreen = function() {
		this.selCommModel.reset();
	};

	ModelFacade.prototype.changeAllowProg = function(value) {
		if(value === 0){
			this.progTypeModel.set(0);
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

	ModelFacade.prototype.changeBg = function(value) {
		this.commTickerModel.reset();
		this.commModel.reset();
		if(value){
			this.bgPngModel.set(null);
		}
	};

	ModelFacade.prototype.changeBgPng = function(value) {
		if(value){
			this.bgModel.set(null);
		}
	};

	ModelFacade.prototype.changeTurtle = function(value) {
		if(value){
			this.turtlePngModel.set(null);
		}
	};

	ModelFacade.prototype.changeTurtlePng = function(value) {
		if(value){
			this.turtleModel.set(null);
		}
	};

	ModelFacade.prototype.changeColor = function(value) {
		if(this.playingModel.get() === PlayingState.PLAYING){
			this.commTickerModel.update("color", value);
		}
	};

	ModelFacade.prototype.setData = function(json){
		this.screenModel.set(json.settings.screen);
		this.colorModel.set(json.settings.color, {"force":true});
		this.speedModel.set(json.settings.speed);
		this.widthModel.set(json.settings.width);
		if(json.settings.bgPng){
			this.bgPngModel.set(json.settings.bgPng);
			this.bgModel.set(null);
		}
		else{
			this.bgPngModel.set(null);
			this.bgModel.set(json.settings.bg);
		}
		if(json.settings.turtlePng){
			this.turtlePngModel.set(json.settings.turtlePng);
			this.turtleModel.set(null);
		}
		else{
			this.turtlePngModel.set(null);
			this.turtleModel.set(json.settings.turtle);
		}
		this.gridModel.set(json.settings.grid);
		this.diagModel.set(json.settings.diag);
		this.allowProgModel.set(json.settings.allowProg);
		this.angleModel.set(json.settings.angle);
		this.progTypeModel.set(json.settings.prog);
		this.stepLengthModel.set(json.settings.stepLength);
		this.startPosModel.set(json.settings.startPos, {"force":true});
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
		settings.bgPng = 		this.bgPngModel.get();
		settings.turtlePng = 	this.turtlePngModel.get();
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
		this.bgPngModel.destroy();
		this.turtlePngModel.destroy();
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
		this.bgPngModel = null;
		this.turtlePngModel = null;
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

	ModelFacade.prototype.destroy = function(){
		this.removeListeners();
		this.destroyModels();
	};

	return ModelFacade;

});
