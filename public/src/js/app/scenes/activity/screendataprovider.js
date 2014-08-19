
define(['app/game', 'app/components/buttongrid',

'app/components/screenpanel', 'app/utils/storage'],

function(Game, ButtonGrid,

ScreenPanel, Storage){
	
	"use strict";
	
	var ScreenDataProvider  = function(){
		
	};
	
	ScreenDataProvider.prototype.getNumPages = function(){
		return 1;
	};
	
	ScreenDataProvider.prototype.addPage = function(i, scroller){
		var options, panel, bounds, w, h, paddingX, paddingY, top;
		top = 20;
		w = Game.w();
		h = Game.h();
		paddingX = 50;
		paddingY = 50;
		bounds = {"x":i * w + paddingX, "y":paddingY, "w":w, "h":h};
		options = {"bounds":bounds, "bgasset":'smallpanel'};
		panel = new ScreenPanel(options);
		scroller.add(panel);
	};
	
	ScreenDataProvider.prototype.addAll = function(scroller){
		console.log("ScreenDataProvider add All");
		this.addPage(0, scroller);
		//this.addPage(1, scroller);
		
	};
	
	return ScreenDataProvider;

});
	
	



