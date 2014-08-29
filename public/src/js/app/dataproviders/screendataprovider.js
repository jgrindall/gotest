
define(['app/game', 'app/components/buttongrid/buttongrid', 'app/components/buttongrid/buttongridmodel',

'app/components/screenchoice'],

function(Game, ButtonGrid, ButtonGridModel,

ScreenChoice){
	
	"use strict";
	
	var ScreenDataProvider  = function(){
		
	};
	
	ScreenDataProvider.prototype.getNumPages = function(){
		return 1;
	};
	
	ScreenDataProvider.prototype.addPage = function(i, scroller){
		var options, w, h, top, paddingX, paddingY, bounds, model, grid;
		paddingX = 50;
		paddingY = 50;
		model = new ButtonGridModel();
		w = scroller.bounds.w - 2*paddingX;
		h = scroller.bounds.h - 2*paddingY;
		bounds = {"x":paddingX + scroller.bounds.x + i * Game.w(), "y":paddingY + scroller.bounds.y, "w":w, "h":h};
		options = {"bounds":bounds, "numX": 2, "numY": 2, "buttonClass": ScreenChoice, "model":model};
		grid = new ButtonGrid(options);
		scroller.add(grid);
	};
	
	ScreenDataProvider.prototype.addAll = function(scroller){
		this.addPage(0, scroller);
	};
	
	return ScreenDataProvider;

});
	
	



