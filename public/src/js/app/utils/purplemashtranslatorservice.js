
define(['phasercomponents',

	'app/utils/abstracttranslatorservice',

	'app/utils/translationconsts'],

	function(PhaserComponents,

		AbstractTranslatorService,

		TranslationConsts){
	
		"use strict";

		var PurpleMashTranslatorService = function(){
			AbstractTranslatorService.call(this);
		};

		PhaserComponents.Utils.extends(PurpleMashTranslatorService, AbstractTranslatorService);

		PurpleMashTranslatorService.prototype.getDefaultForKey = function(key){
			return this._defaultTranslate(key);
		};

		PurpleMashTranslatorService.prototype.getForKey = function(key){
			return this._translate(key);
		};

		PurpleMashTranslatorService.prototype.init = function(data, callback){
			this._translate = 			window.T.getTranslateFunction(TranslationConsts.SHEET_NAME);
			this._defaultTranslate = 	window.T.getTranslateFunction(TranslationConsts.DEFAULT_SHEET_NAME);
			callback();
		};

		return PurpleMashTranslatorService;

	}
);


