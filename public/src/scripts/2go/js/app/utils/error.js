
define(['base/views/popups/growl', 'base/assets', 'base/utils/errorcodes'],

	function(Growl, Assets, ErrorCodes){
	
		"use strict";
		
		var Error = function(){
			
		};

		Error.show = function(alertManager, code){
			var s = ErrorCodes.MESSAGES[code];
			s = s + "\n(error code " + code + ")";
			alertManager.make(Growl, {"title":"Error", "label":s, "sfx":Assets.SOUNDS[2]}, null);
		};
		
		return Error;

	}
);




