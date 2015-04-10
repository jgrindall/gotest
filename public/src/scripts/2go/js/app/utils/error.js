
define(['base/views/popups/growl', 'base/assets',

	'base/utils/translation', 'base/utils/translationconsts'],

	function(Growl, Assets,

		Translation, TranslationConsts){
	
		"use strict";
		
		var Error = function(){
			
		};

		Error.show = function(alertManager, code){
			var s = Translation.getForKey(TranslationConsts.Keys.ERROR_PREFIX + code);
			s = s + "\n(code " + code + ")";
			alertManager.make(Growl, {"title":Translation.getForKey(TranslationConsts.Keys.ERROR_TITLE), "label":s, "sfx":Assets.SOUNDS[2]}, null);
		};
		
		return Error;

	}
);




