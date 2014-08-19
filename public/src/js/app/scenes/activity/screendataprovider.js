
define(['app/game', 'app/components/buttongrid',

'app/components/screenpanel', 'app/utils/storage'],

function(Game, ButtonGrid,

ScreenPanel, Storage){
	
	"use strict";
	
	var ScreenDataProvider  = function(){
		
	};
	
	ScreenDataProvider.prototype.getNumPages = function(){
		return 2;
	};
	
	ScreenDataProvider.prototype.addPage = function(i, scroller){
		var options, panel, bounds, w, h, paddingX, paddingY, top;
		top = 50;
		w = Game.w()/2;
		h = Game.h();
		paddingX = 50;
		paddingY = 50;
		bounds = {"x":i * w + paddingX, "y":paddingY, "w":400, "h":200};
		options = {"bounds":bounds, "bgAsset":'panel'};
		panel = new ScreenPanel(options);
		scroller.add(panel);
	};
	
	ScreenDataProvider.prototype.addAll = function(scroller){
		this.addPage(0, scroller);
		this.addPage(1, scroller);
		this.addPage(2, scroller);
		this.addPage(3, scroller);
		this.addPage(4, scroller);
		this.addPage(5, scroller);
	};
	
	return ScreenDataProvider;

});
	
	



