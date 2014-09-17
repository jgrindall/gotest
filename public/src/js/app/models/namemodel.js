
define(['phasercomponents',

'app/consts/playingstate'],

function(PhaserComponents,

PlayingState){
	
	"use strict";
	
	var NameModel  = function(){
		PhaserComponents.Model.AbstractModel.call(this);
		this.value = "";
	};
	
	PhaserComponents.Utils.extends(NameModel, PhaserComponents.Model.AbstractModel);

	return NameModel;

});
