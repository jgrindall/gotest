define( ['base/consts/commandpaneltypes', 'base/prog/controller/progcontroller',

	'base/prog/controller/keysprogcontroller', 'base/prog/controller/turnkeysprogcontroller'],

	function(CommandPanelTypes, ProgController,

		KeysProgController, TurnKeysProgController){
	
	"use strict";

	var ProgControllerFactory = function(){

	};
	
	ProgControllerFactory.make = function(type, parent){
		if(type === CommandPanelTypes.NSEW){
			return new ProgController(parent);
		}
		else if(type === CommandPanelTypes.NSEW_KEYS || type === CommandPanelTypes.NSEW_45_KEYS){
			return new KeysProgController(parent);
		}
		else if(type === CommandPanelTypes.TURNING_KEYS){
			return new TurnKeysProgController(parent);
		}
	};

	return ProgControllerFactory;
});
