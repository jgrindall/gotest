
define('app/dataproviders/bgdataprovider',[

'app/views/bgpanel', 'app/consts/bgdata', 'app/assets'],

function(BgPanel, BgData, Assets){
	
	"use strict";
	
	var BgDataProvider  = function(game){
		this.game = game;
	};
	
	BgDataProvider.prototype.getNumPages = function(){
		return BgData.BACKGROUNDS.length;
	};
	
	BgDataProvider.prototype.addPage = function(i, scroller){
		var options, panel, bounds, w, h, paddingX, paddingY;
		paddingX = 50;
		paddingY = 50;
		w = scroller.bounds.w - 2*paddingX;
		h = scroller.bounds.h - 2*paddingY - 25;
		bounds = {"x":paddingX + scroller.bounds.x + i * this.game.w, "y":paddingY + scroller.bounds.y, "w":w, "h":h};
		options = {"bounds":bounds, "bgasset":Assets.MAPS[i]};
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
	
	



