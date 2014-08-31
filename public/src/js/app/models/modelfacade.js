
define(['app/models/commmodel', 'app/models/screenmodel', 'app/models/bgmodel', 

'app/models/colormodel', 'app/models/speedmodel',

'app/models/commtickermodel', 'app/events/eventdispatcher', 'app/events/events'],

function(commModel, screenModel, bgModel,

	colorModel, speedModel,

	commTickerModel, eventDispatcher, Events){
	
	"use strict";
	
	var ModelFacade  = function(){
		
	};

	ModelFacade.setData = function(json){
		screenModel.setData(json.screen);
		colorModel.setData(json.color);
		speedModel.setData(json.speed);
		bgModel.setData(json.bg);
		commModel.setData(json.commands);
		eventDispatcher.trigger({"event":Events.REPLAY});
	};

	ModelFacade.getJson = function() {
		var json = {};
		json.bg = 			bgModel.getData().bg;
		json.screen = 		screenModel.getData().screen;
		json.speed = 		speedModel.getData().speed;
		json.color =	 	colorModel.getData().index;
		json.commands = 		commModel.toJson();
		return json;
	};
	
	return ModelFacade;

});
