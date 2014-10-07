
define([],

	function(){
	
		"use strict";
		
		var ErrorCodes = function(){
			
		};

		ErrorCodes.MESSAGES = [];

		ErrorCodes.SAVE_ERROR = 			0;
		ErrorCodes.FORMAT_ERROR = 			1;
		ErrorCodes.NO_PRINTERS = 			2;
		ErrorCodes.LOAD_ERROR = 			3;
		ErrorCodes.LOAD_DEFAULTS_ERROR = 	4;
		ErrorCodes.IMAGE_DOWNLOAD_ERROR = 	5;
		ErrorCodes.FILE_NOT_FOUND =			6;

		ErrorCodes.MESSAGES.push("Error saving your file!");
		ErrorCodes.MESSAGES.push("Format error, unable to load your file.");
		ErrorCodes.MESSAGES.push("No printers found.");
		ErrorCodes.MESSAGES.push("Error, unable to load your file.");
		ErrorCodes.MESSAGES.push("Error loading defaults.");
		ErrorCodes.MESSAGES.push("Sorry, saving images does not seem\nto be supported on your browser.");
		ErrorCodes.MESSAGES.push("Error loading your file, file not found.");

		return ErrorCodes;

	}
);
