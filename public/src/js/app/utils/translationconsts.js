
define([],

	function(){
	
		"use strict";

		var TranslationConsts = { };

		TranslationConsts.SHEET_NAME = 					"2go";
		TranslationConsts.DEFAULT_SHEET_NAME = 			"default";


		TranslationConsts.KEYS = {};
		TranslationConsts.KEYS.START_NEW_FILE_KEY = 	"START_NEW_FILE";

		// TODO
		// delete these when the app goes live

		TranslationConsts.DATA = {};
		TranslationConsts.DATA[TranslationConsts.KEYS.START_NEW_FILE_KEY] = "Start a new file - choose a background";

		return TranslationConsts;

	}
);

