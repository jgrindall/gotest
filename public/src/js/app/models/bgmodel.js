
define('app/models/bgmodel',['phasercomponents'],

function(PhaserComponents){
	
	"use strict";
	
	var BgModel  = function(){
		PhaserComponents.Model.AbstractModel.call(this);
	};
	
	PhaserComponents.Utils.extends(BgModel, PhaserComponents.Model.AbstractModel);

	return BgModel;

});
