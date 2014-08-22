
define(['app/game', 'app/components/buttongrid',

'app/components/bgpanel', 'app/utils/storage', 'app/bgdata'],

function(Game, ButtonGrid,

BgPanel, Storage, BgData){
	
	"use strict";
	
	var BgDataProvider  = function(){
		
	};
	
	BgDataProvider.prototype.getNumPages = function(){
		return BgData.BACKGROUNDS.length;
	};
	
	BgDataProvider.prototype.addPage = function(i, scroller){
		var options, panel, bounds, w, h, top;
		var paddingX = 50;
		var paddingY = 50;
		w = scroller.bounds.w - 2*paddingX;
		h = scroller.bounds.h - 2*paddingY;
		bounds = {"x":paddingX + scroller.bounds.x + i * Game.w(), "y":paddingY + scroller.bounds.y, "w":w, "h":h};
		options = {"bounds":bounds, "bgasset":'map'+i};
		panel = new BgPanel(options);
		scroller.add(panel);
	};
	
	BgDataProvider.prototype.addAll = function(scroller){
		for(var i = 0; i < BgData.BACKGROUNDS.length; i++){
			this.addPage(i, scroller);
		}
	};
	
	return BgDataProvider;

});
	
	



