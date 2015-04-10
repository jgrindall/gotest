
define(['base/views/popups/growl', 'base/assets',

	'base/utils/translation', 'base/utils/translationconsts'],

	function(Growl, Assets,

		Translation, TranslationConsts){
	
		"use strict";
		
		var Message = function(){
			
		};

		Message.show = function(alertManager, s){
			alertManager.make(Growl, {"title":Translation.getForKey(TranslationConsts.Keys.MESSAGE_TITLE), "label":s, "sfx":Assets.SOUNDS[2]}, null);
		};
		
		return Message;

	}
);




