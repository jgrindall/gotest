
define('app/models/modelfacade',['app/models/commmodel', 'app/models/screenmodel', 'app/models/bgmodel', 

'app/models/colormodel', 'app/models/speedmodel', 'app/consts/commspeed',

'app/models/scalemodel', 'app/models/playingmodel',

'app/models/commtickermodel', 'app/consts/playingstate'],

function(commModel, screenModel, bgModel,

	colorModel, speedModel, CommSpeed,

	scaleModel, playingModel,

	commTickerModel, PlayingState){
	
	"use strict";

	var ModelFacade  = function(){
		
	};

	ModelFacade.SPEED = 		"speed";
	ModelFacade.BG = 			"bg";
	ModelFacade.COLOR = 		"color";
	ModelFacade.COMM = 		"comm";
	ModelFacade.SCREEN = 		"screen";
	ModelFacade.COMMTICKER = 	"commTicker";
	ModelFacade.SCALE = 		"scale";
	ModelFacade.PLAYING = 		"playing";


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
		else if(name === ModelFacade.COMMTICKER){
			return commTickerModel;
		}
		else if(name === ModelFacade.SCALE){
			return scaleModel;
		}
		else if(name === ModelFacade.PLAYING){
			return playingModel;
		}
	};

	ModelFacade.prototype.init = function(){
		commTickerModel.init(commModel);
		colorModel.changeSignal.add(this.changeColor, this);
		bgModel.changeSignal.add(this.changeBg, this);
		playingModel.changeSignal.add(this.changePlaying, this);
		speedModel.changeSignal.add(this.changeSpeed, this);
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

	ModelFacade.prototype.changeSpeed = function(data) {
		this.setDuration();
	};

	ModelFacade.prototype.changeBg = function(data) {
		commTickerModel.reset();
	};

	ModelFacade.prototype.changeColor = function(data) {
		var nextCommand = commTickerModel.getNextCommand();
		if(playingModel.getData().playing === PlayingState.PLAYING && nextCommand){
			nextCommand.color = data.index;
		}
	};

	ModelFacade.getInstance = function(json){
		if(!ModelFacade.instance){
			console.log("new MFac");
			ModelFacade.instance = new ModelFacade();
		}
		return ModelFacade.instance;
	};

	ModelFacade.prototype.setData = function(json){
		screenModel.setData(json.screen);
		colorModel.setData(json.color);
		speedModel.setData(json.speed);
		bgModel.setData(json.bg);
		commModel.setData(json.commands);
	};

	ModelFacade.prototype.getJson = function() {
		var json = {};
		json.bg = 			this.get(ModelFacade.BG).getData().bg;
		json.screen = 		this.get(ModelFacade.SCREEN).getData().screen;
		json.speed = 		this.get(ModelFacade.SPEED).getData().speed;
		json.color =	 	this.get(ModelFacade.COLOR).getData().index;
		json.commands = 		this.get(ModelFacade.COMM).toJson();
		return json;
	};
	
	return ModelFacade;

});
