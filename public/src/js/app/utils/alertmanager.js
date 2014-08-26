
define(['app/game', 'app/components/alert', 

'app/scenes/activity/gamescreenmenu', 'app/scenes/activity/gamebgmenu', 'app/components/growl'], 

function(Game, Alert, 

GameScreenMenu, GameBgMenu, Growl){
	
	"use strict";
	
	var AlertManager  = function(){
		
	};
	
	AlertManager.close = function(){
		console.log("close! ");
		if(AlertManager.alert){
			AlertManager.alert.selectSignal.removeAll(AlertManager);
			AlertManager.alert.destroy();
			AlertManager.bg.destroy();
			AlertManager.bg = null;
			AlertManager.alert = null;
			Game.alertSignal.dispatch({"show":false});
			Game.unPausePhysics();
		}
	};
	
	AlertManager.alertClick = function(){
		AlertManager.closeAlert();
	};
	
	AlertManager.addBg = function(){
		AlertManager.bg = new Phaser.Graphics(Game.getInstance(), 0, 0);
		AlertManager.bg.beginFill(0x000000);
		AlertManager.bg.alpha = 0.7;
    	AlertManager.bg.drawRect(0, 0, Game.w(), Game.h());
		Game.getInstance().world.add(AlertManager.bg);
	};
	
	AlertManager.make = function(ClassRef, label, callback){
		var x, y;
		x = (Game.w() - ClassRef.WIDTH)/2;
		y = (Game.h() - ClassRef.HEIGHT)/2;
		AlertManager.addBg();
		AlertManager.close();
		AlertManager.alert = new ClassRef({"label":label, "bounds":{"x":x, "y":y, "w":ClassRef.WIDTH, "h":ClassRef.HEIGHT}});
		AlertManager.alert.selectSignal.add($.proxy(this.buttonClick, this, callback));
		Game.getInstance().world.add(AlertManager.alert.group);
		Game.alertSignal.dispatch({"show":true});
		setTimeout(function(){
			AlertManager.alert.showMenu();
		}, 300);
	};
	
	AlertManager.buttonClick = function(callback, data){
		console.log("buttonClick "+data.index);
		AlertManager.close();
		if(callback){
			callback(data);
		}
	};
	
	AlertManager.makeScreenMenu = function(callback){
		AlertManager.make(GameScreenMenu, "text", callback);
	};
	
	AlertManager.makeBgMenu = function(callback){
		AlertManager.make(GameBgMenu, "text", callback);
	};
	
	AlertManager.makeGrowl = function(label, callback){
		AlertManager.make(Growl, label, callback);
	};
	
	AlertManager.makePager = function(label, callback){
		AlertManager.make(GameScreenMenu, label, callback);
	};
	
	AlertManager.makeAlert = function(label, callback){
		AlertManager.make(Alert, label, callback);
	};
	
	return AlertManager;

});
	
	

