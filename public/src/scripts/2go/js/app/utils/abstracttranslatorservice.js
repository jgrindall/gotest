
define([],

	function(){
	
		"use strict";

		var AbstractTranslatorService = function(fallback){
			this._fallback = fallback;
		};

		AbstractTranslatorService.getForKey = function(){
			return "";
		};

		return AbstractTranslatorService;

	}
);

