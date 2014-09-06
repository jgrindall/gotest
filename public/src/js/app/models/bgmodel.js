
define('app/models/bgmodel',['phasercomponents'],

function(PhaserComponents){
	
	"use strict";
	
	var BgModel  = function(){
		PhaserComponents.Model.AbstractModel.call(this);
	};
	
	BgModel.prototype = Object.create(PhaserComponents.Model.AbstractModel.prototype);
	BgModel.prototype.constructor = BgModel;
	
	return BgModel;

});
