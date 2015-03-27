
define(['phasercomponents'],

	function(PhaserComponents){
	
		"use strict";
		
		var AbstractClipartAdapter = function(){
			PhaserComponents.Injector.getInstance().injectInto(this, "clipartadapter");
		};
		
		return AbstractClipartAdapter;

	}
);

