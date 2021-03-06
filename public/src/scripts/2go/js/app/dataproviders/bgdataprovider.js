
define([

'base/views/bgpanel', 'base/consts/bgdata', 'base/assets'],

function(BgPanel, BgData, Assets){
	
	"use strict";
	
	var BgDataProvider  = function(game){
		this.game = game;
	};
	
	BgDataProvider.prototype.getNumPages = function(){
		return BgData.BACKGROUNDS.length;
	};
	
	BgDataProvider.prototype.getPageAt = function(i, scroller){
		var options, panel, bounds, w, h, paddingX, paddingY;
		paddingX = 90;
		paddingY = 50;
		w = scroller.bounds.w - 2*paddingX;
		h = scroller.bounds.h - 2*paddingY - 50;
		bounds = {"x":paddingX + scroller.bounds.x + i * this.game.w, "y":paddingY + scroller.bounds.y, "w":w, "h":h};
		options = {"bounds":bounds, "bgasset":Assets.MAPS[i]};
		panel = new BgPanel(options);
		return panel;
	};
	
	return BgDataProvider;

});
	
	



