
define(['app/game', 'app/components/alert', 'app/scenes/game/gamepausemenu',

'app/scenes/game/gameovermenusuccess', 'app/scenes/game/gameovermenufail',

'app/scenes/activity/gamescreenmenu', 'app/components/growl'], 

function(Game, Alert, GamePauseMenu,

GameOverMenuSuccess, GameOverMenuFail,

GameScreenMenu, Growl){
	
	"use strict";
	
	var AlertManager  = function(){
		
	};
	
	AlertManager.close = function(){
		if(AlertManager.alert){
			AlertManager.alert.selectSignal.removeAll(AlertManager);
			AlertManager.alert.destroy();
			AlertManager.alert = null;
			Game.alertSignal.dispatch({"show":false});
			Game.unPausePhysics();
		}
	};
	
	AlertManager.alertClick = function(){
		AlertManager.closeAlert();
	};
	
	AlertManager.make = function(ClassRef, label, callback){
		var x, y;
		x = (Game.w() - ClassRef.WIDTH)/2;
		y = (Game.h() - ClassRef.HEIGHT)/2;
		AlertManager.close();
		AlertManager.alert = new ClassRef({"label":label, "bounds":{"x":x, "y":y, "w":ClassRef.WIDTH, "h":ClassRef.HEIGHT}});
		AlertManager.alert.selectSignal.add($.proxy(this.buttonClick, this, callback));
		Game.alertSignal.dispatch({"show":true});
		setTimeout(function(){
			Game.getInstance().world.add(AlertManager.alert.group);
			AlertManager.alert.showMenu();
		}, 300);
	};
	
	AlertManager.buttonClick = function(callback, data){
		AlertManager.close();
		if(callback){
			callback(data);
		}
	};
	
	AlertManager.makeScreenMenu = function(callback){
		AlertManager.make(GameScreenMenu, "text", callback);
	};
	
	AlertManager.makeGrowl = function(label, callback){
		AlertManager.make(Growl, label, callback);
	};
	
	AlertManager.makePauseMenu = function(label, callback){
		AlertManager.make(GamePauseMenu, label, callback);
		Game.pausePhysics();
	};
	
	AlertManager.makeGameOverMenuSuccess = function(label, callback){
		AlertManager.make(GameOverMenuSuccess, label, callback);
		Game.pausePhysics();
	};
	
	AlertManager.makePager = function(label, callback){
		AlertManager.make(GameScreenMenu, label, callback);
	};
	
	AlertManager.makeGameOverMenuFail = function(label, callback){
		AlertManager.make(GameOverMenuFail, label, callback);
		Game.pausePhysics();
	};
	
	AlertManager.makeAlert = function(label, callback){
		AlertManager.make(Alert, label, callback);
	};
	
	return AlertManager;

});
	
	

