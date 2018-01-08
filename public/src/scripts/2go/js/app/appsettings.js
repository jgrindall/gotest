
define([],

	function() {
	
	"use strict";

   	var AppSettings, regexp0, regexp1;

   	AppSettings = {};

    regexp0 = new RegExp('purple', 'g');
    regexp1 = new RegExp('simple', 'g');

	AppSettings.LIVE = false;
	
	//AppSettings.LIVE = true;
	// IMPORTNAT: override this to true once it has gone live!

	return AppSettings;
	
});
