
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
		var options, panel, bounds, w, h, paddingX, paddingY, top;
		top = 20;
		w = Game.w();
		h = Game.h();
		paddingX = 50;
		paddingY = 50;
		bounds = {"x":i * w + paddingX, "y":paddingY, "w":w, "h":h};
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
	
	


