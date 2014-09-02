
define('app/utils/alertmanager',['app/game', 

'app/views/popups/gamescreenmenu', 'app/views/popups/gamebgmenu',

'app/components/popups/growl'], 

function(Game,

GameScreenMenu, GameBgMenu,

Growl){
	
	"use strict";
	
	var AlertManager  = function(){
		
	};
	
	AlertManager.close = function(){
		if(AlertManager.alert){
			AlertManager.alert.selectSignal.remove(AlertManager.callbackProxy);
			AlertManager.alert.destroy();
			AlertManager.bg.destroy();
			AlertManager.bg = null;
			AlertManager.alert = null;
			Game.alertSignal.dispatch({"show":false});
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
    	AlertManager.bg.endFill();
		Game.getInstance().world.add(AlertManager.bg);
	};
	
	AlertManager.make = function(ClassRef, data, callback){
		var x, y;
		AlertManager.callbackProxy = this.buttonClick.bind(AlertManager, callback);
		x = (Game.w() - ClassRef.WIDTH)/2;
		y = (Game.h() - ClassRef.HEIGHT)/2;
		AlertManager.addBg();
		AlertManager.close();
		AlertManager.alert = new ClassRef({"data":data, "bounds":{"x":x, "y":y, "w":ClassRef.WIDTH, "h":ClassRef.HEIGHT}});
		AlertManager.alert.selectSignal.add(this.callbackProxy);
		Game.getInstance().world.add(AlertManager.alert.group);
		Game.alertSignal.dispatch({"show":true});
		setTimeout(function(){
			AlertManager.alert.showMe();
		}, 100);
	};
	
	AlertManager.buttonClick = function(callback, data){
		AlertManager.close();
		if(callback){
			callback(data);
		}
	};
	
	AlertManager.makeScreenMenu = function(data, callback){
		AlertManager.make(GameScreenMenu, data, callback);
	};
	
	AlertManager.makeBgMenu = function(data, callback){
		AlertManager.make(GameBgMenu, data, callback);
	};
	
	AlertManager.makeGrowl = function(data, callback){
		AlertManager.make(Growl, data, callback);
	};
	
	AlertManager.makeAlert = function(data, callback){
		AlertManager.make(Alert, data, callback);
	};
	
	AlertManager.getInstance = function(){
		if(!AlertManager.instance){
			AlertManager.instance = new AlertManager();
		}
		return AlertManager.instance;
	};
	
	return AlertManager;

});
	
	

