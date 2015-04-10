
define(['phasercomponents',

	'base/utils/abstracttranslatorservice',

	'base/utils/translationconsts'],

	function(PhaserComponents,

		AbstractTranslatorService,

		TranslationConsts){
	
		"use strict";

		var LocalTranslatorService = function(fallback){
			AbstractTranslatorService.call(this, fallback);
		};

		PhaserComponents.Utils.extends(LocalTranslatorService, AbstractTranslatorService);

		LocalTranslatorService.prototype.getForKey = function(key){
			var data;
			if(!key){
				throw new Error("translating the key " + key);
			}
			data = TranslationConsts.Data;
			return data[key];
		};

		LocalTranslatorService.prototype.init = function(data, callback){
			// nothing needed
			callback();
		};

		return LocalTranslatorService;

	}
);



