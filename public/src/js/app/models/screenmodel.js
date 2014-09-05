
define('app/models/screenmodel',['phasercomponents'],

function(PhaserComponents){
	
	"use strict";
	
	var ScreenModel  = function(){
		PhaserComponents.AbstractModel.call(this);
		this.screen = null;
	};
	
	ScreenModel.prototype = Object.create(PhaserComponents.AbstractModel.prototype);
	ScreenModel.prototype.constructor = ScreenModel;
	
	ScreenModel.prototype.getData = function() {
		return {"index":this.screen};
	};
	
	ScreenModel.prototype.setData = function(n) {
		this.setScreen(n);
	};
	
	ScreenModel.prototype.setScreen = function(i) {
		if(this.screen !== i){
			this.screen = i;
			this.trigger();
		}
	};
	
	return ScreenModel;

});
