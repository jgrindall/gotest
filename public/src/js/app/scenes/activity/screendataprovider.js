
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
		var options, panel, bounds, w, h, top;
		var paddingX = 50;
		var paddingY = 50;
		w = scroller.bounds.w - 2*paddingX;
		h = scroller.bounds.h - 2*paddingY;
		bounds = {"x":paddingX + scroller.bounds.x + i * Game.w(), "y":paddingY + scroller.bounds.y, "w":w, "h":h};
		options = {"bounds":bounds, "bgasset":'map'+i};
		panel = new ScreenPanel(options);
		scroller.add(panel);
	};
	
	ScreenDataProvider.prototype.addAll = function(scroller){
		this.addPage(0, scroller);
	};
	
	return ScreenDataProvider;

});
	
	



