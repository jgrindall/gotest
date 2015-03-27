
define(['phasercomponents',

	'app/utils/abstracttranslatorservice',

	'app/utils/translationconsts'],

	function(PhaserComponents,

		AbstractTranslatorService,

		TranslationConsts){
	
		"use strict";

		var LocalTranslatorService = function(){
			AbstractTranslatorService.call(this);
		};

		PhaserComponents.Utils.extends(LocalTranslatorService, AbstractTranslatorService);

		LocalTranslatorService.prototype.getForKey = function(key){
			var data = TranslationConsts.DATA;
			return data[key];
		};

		LocalTranslatorService.prototype.init = function(data, callback){
			// nothing needed
			callback();
		};

		return LocalTranslatorService;

	}
);



