
define('app/models/screenmodel',['phasercomponents'],

function(PhaserComponents){
	
	"use strict";
	
	var ScreenModel  = function(){
		PhaserComponents.Model.AbstractModel.call(this);
	};
	
	ScreenModel.prototype = Object.create(PhaserComponents.Model.AbstractModel.prototype);
	ScreenModel.prototype.constructor = ScreenModel;
	
	return ScreenModel;

});
