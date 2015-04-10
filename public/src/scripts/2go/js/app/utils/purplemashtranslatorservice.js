
define(['phasercomponents',

	'base/utils/abstracttranslatorservice',

	'base/utils/translationconsts'],

	function(PhaserComponents,

		AbstractTranslatorService,

		TranslationConsts){
	
		"use strict";

		var PurpleMashTranslatorService = function(fallback){
			AbstractTranslatorService.call(this, fallback);
		};

		PhaserComponents.Utils.extends(PurpleMashTranslatorService, AbstractTranslatorService);

		PurpleMashTranslatorService.prototype.getForKey = function(key){
			var val = this._translate(key);
			if(!val){
				if(this._fallback){
					val = this._fallback.getForKey(key);
				}
			}
			return val;
		};

		PurpleMashTranslatorService.prototype.init = function(data, callback){
			this._translate = 			window.T.getTranslateFunction(TranslationConsts.SHEET_NAME);
			this._defaultTranslate = 	window.T.getTranslateFunction(TranslationConsts.DEFAULT_SHEET_NAME);
			callback();
		};

		return PurpleMashTranslatorService;

	}
);


