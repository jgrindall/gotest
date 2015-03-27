
define([

	'base/utils/purplemashtranslatorservice',

	'base/utils/localtranslatorservice'],

	function(PurpleMashTranslatorService,

		LocalTranslatorService){
	
		"use strict";

		var Translation = function(){
			
		};

		Translation.init = function(callback){
			console.log("window.T is ", window.T);
			if(window.T){
				this._service = new PurpleMashTranslatorService();
			}
			else{
				this._service = new LocalTranslatorService();
			}
			this._service.init({}, callback);
		};

		Translation.getForKey = function(key){
			return this._service.getForKey(key);
		};

		return Translation;

	}
);

