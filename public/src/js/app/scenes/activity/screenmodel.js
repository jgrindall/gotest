
define(['app/scenes/activity/abstractmodel'],

function(AbstractModel){
	
	"use strict";
	
	var ScreenModel  = function(){
		AbstractModel.call(this);
		this.screen = null;
	};
	
	ScreenModel.prototype = Object.create(AbstractModel.prototype);
	ScreenModel.prototype.constructor = ScreenModel;
	
	ScreenModel.prototype.getData = function() {
		return {"screen":this.screen};
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
	
	return new ScreenModel();

});
