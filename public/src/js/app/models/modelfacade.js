
define('app/models/modelfacade',['app/models/commmodel', 'app/models/screenmodel', 'app/models/bgmodel', 

'app/models/colormodel', 'app/models/speedmodel', 'app/consts/commspeed',

'app/models/playingmodel', 'app/models/gridmodel',

'app/models/widthmodel', 'app/models/steplengthmodel', 'app/models/diagmodel',

'app/models/commtickermodel', 'app/consts/playingstate'],

function(commModel, screenModel, bgModel,

	colorModel, speedModel, CommSpeed,

	playingModel, gridModel,

	widthModel, stepLengthModel, diagModel,

	commTickerModel, PlayingState){
	
	"use strict";

	var ModelFacade  = function(){
		
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

	ModelFacade.prototype.get = function(name){
		if(name === ModelFacade.SPEED){
			return speedModel;
		}
		else if(name === ModelFacade.BG){
			return bgModel;
		}
		else if(name === ModelFacade.COLOR){
			return colorModel;
		}
		else if(name === ModelFacade.COMM){
			return commModel;
		}
		else if(name === ModelFacade.SCREEN){
			return screenModel;
		}
		else if(name === ModelFacade.DIAG){
			return diagModel;
		}
		else if(name === ModelFacade.COMMTICKER){
			return commTickerModel;
		}
		else if(name === ModelFacade.PLAYING){
			return playingModel;
		}
		else if(name === ModelFacade.GRID){
			return gridModel;
		}
		else if(name === ModelFacade.WIDTH){
			return widthModel;
		}
		else if(name === ModelFacade.STEPLENGTH){
			return stepLengthModel;
		}
		else{
			throw "no model "+name;
		}
	};

	ModelFacade.prototype.init = function(){
		commTickerModel.init(commModel);
		colorModel.changeSignal.add(this.changeColor, this);
		bgModel.changeSignal.add(this.changeBg, this);
		widthModel.changeSignal.add(this.changeWidth, this);
		playingModel.changeSignal.add(this.changePlaying, this);
		speedModel.changeSignal.add(this.changeSpeed, this);
		//TODO - make them commands
	};

	ModelFacade.prototype.setDuration = function() {
		var duration;
		if(playingModel.getData().playing === PlayingState.PLAYING){
			duration = speedModel.getData().actualSpeed * CommSpeed.SPEED_FACTOR;
		}
		else{
			duration = 0;
		}
		commTickerModel.duration = duration;
	};

	ModelFacade.prototype.changePlaying = function(data) {
		this.setDuration();
	};

	ModelFacade.prototype.changeWidth = function(data) {
		if(playingModel.getData().playing === PlayingState.PLAYING){
			commTickerModel.update("width", data.index);
		}
	};

	ModelFacade.prototype.changeSpeed = function(data) {
		this.setDuration();
	};

	ModelFacade.prototype.changeBg = function(data) {
		commTickerModel.reset();
		commModel.reset();
	};

	ModelFacade.prototype.changeColor = function(data) {
		if(playingModel.getData().playing === PlayingState.PLAYING){
			commTickerModel.update("color", data.index);
		}
	};

	ModelFacade.getInstance = function(json){
		if(!ModelFacade.instance){
			ModelFacade.instance = new ModelFacade();
		}
		return ModelFacade.instance;
	};

	ModelFacade.prototype.setData = function(json){
		screenModel.setData(json.screen);
		colorModel.setData(json.color);
		speedModel.setData(json.speed);
		widthModel.setData(json.width);
		stepLengthModel.setData(json.stepLength);
		bgModel.setData(json.bg);
		commModel.setData(json.commands);
	};

	ModelFacade.prototype.getJson = function() {
		var json = {};
		json.bg = 			bgModel.getData().bg;
		json.screen = 		screenModel.getData().screen;
		json.width = 		widthModel.getData().index;
		json.stepLength = 	stepLengthModel.getData().index;
		json.speed = 		speedModel.getData().index;
		json.gridOn = 		gridModel.getData().on;
		json.color =	 	colorModel.getData().index;
		json.commands = 	commModel.toJson();
		return json;
	};
	
	return ModelFacade;

});
