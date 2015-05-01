
define([],

	function() {
	
	"use strict";

   	var AppSettings, regexp0, regexp1;

   	AppSettings = {};

    regexp0 = new RegExp('purple', 'g');
    regexp1 = new RegExp('simple', 'g');

	AppSettings.LIVE = (regexp0.test(window.location) || regexp1.test(window.location));
	
	// IMPORTNAT: override this to true once it has gone live!
	AppSettings.LIVE = true;

	return AppSettings;
	
});
