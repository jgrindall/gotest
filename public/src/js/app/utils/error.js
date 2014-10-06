
define(['phasercomponents',

	'app/views/popups/growl', 'app/assets', 'app/utils/errorcodes'],

	function(PhaserComponents, Growl, Assets, ErrorCodes){
	
		"use strict";
		
		var Error = function(){
			
		};

		Error.show = function(code){
			var s = ErrorCodes.MESSAGES[code];
			s = s + "\n(error code " + code + ")";
			PhaserComponents.AlertManager.getInstance().make(Growl, {"title":"Error", "label":s, "sfx":Assets.SOUNDS[2]}, null);
		};
		
		return Error;

	}
);




