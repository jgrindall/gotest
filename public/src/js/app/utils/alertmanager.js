
define(['app/game', 'app/components/alert'], function(Game, Alert){
	
	"use strict";
	
	var AlertManager  = function(){
		
	};
	
	AlertManager.closeAlert = function(){
		AlertManager.alert.selectSignal.removeAll(AlertManager);
		AlertManager.alert.destroy();
		AlertManager.alert = null;
		Game.alertSignal.dispatch({"show":false});
	};
	
	AlertManager.alertClick = function(){
		AlertManager.closeAlert();
	};
	
	AlertManager.makeAlert = function(label){
		var x, y;
		x = (Game.w() - Alert.WIDTH)/2;
		y = (Game.h() - Alert.HEIGHT)/2;
		if(AlertManager.alert){
			AlertManager.closeAlert();
		}
		AlertManager.alert = new Alert({"label":label, "bounds":{"x":x, "y":y, "w":Alert.WIDTH, "h":Alert.HEIGHT}});
		AlertManager.alert.create();
		Game.getInstance().world.add(AlertManager.alert.group);
		AlertManager.alert.selectSignal.add(AlertManager.alertClick);
		Game.alertSignal.dispatch({"show":true});
	};
	
	return AlertManager;

});
	
	

