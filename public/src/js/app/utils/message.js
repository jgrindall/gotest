
define(['app/views/popups/growl', 'app/assets'],

	function(Growl, Assets){
	
		"use strict";
		
		var Message = function(){
			
		};

		Message.SCREENSHOT = "Use your device to take a screenshot\nand save it to your camera roll.\nIf you're not sure how, ask your teacher.";
		Message.SAVE_SUCCESS = "Your file has been saved";
		Message.LOAD_SUCCESS = "Your file has been loaded";

		//MEssage.IMAGE_SAVED = "Your image has been "
		
		Message.show = function(alertManager, s){
			alertManager.make(Growl, {"title":"Message", "label":s, "sfx":Assets.SOUNDS[2]}, null);
		};
		
		
		return Message;

	}
);




