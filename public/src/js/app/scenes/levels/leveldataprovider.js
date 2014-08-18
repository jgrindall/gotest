
define(['app/game', 'app/components/buttongrid', 'app/components/buttons/levelbadge', 'app/utils/storage'],

function(Game, ButtonGrid, LevelBadge, Storage){
	
	"use strict";
	
	var LevelDataProvider  = function(){
		
	};
	
	LevelDataProvider.prototype.getNumPages = function(){
		return 3;
	};
	
	LevelDataProvider.prototype.addPage = function(i, numX, numY, scroller, config){
		var options, grid, bounds, w, h, paddingX, paddingY, top;
		top = 50;
		w = Game.w();
		h = Game.h();
		paddingX = (w - 800)/2;
		paddingY = (h - 600)/2;
		bounds = {"x":i * w + paddingX, "y":paddingY, "w":800, "h":600};
		options = {"bounds":bounds, "numX": numX, "numY": numY, "buttonClass": LevelBadge, "config":config};
		grid = new ButtonGrid(options);
		grid.create();
		scroller.add(grid);
	};
	
	LevelDataProvider.prototype.addAll = function(scroller){
		var config0 = Storage.getInstance().loadLevelDataForPage(0);
		var config1 = Storage.getInstance().loadLevelDataForPage(1);
		var config2 = Storage.getInstance().loadLevelDataForPage(2);
		this.addPage(0, 3, 3, scroller, config0);
		this.addPage(1, 3, 3, scroller, config1);
		this.addPage(2, 3, 3, scroller, config2);
	};
	
	return LevelDataProvider;

});
	
	



