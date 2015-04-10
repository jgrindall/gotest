
define([],

	function(){
	
		"use strict";
		
		var ErrorCodes = function(){
			
		};

		ErrorCodes.SAVE_ERROR = 				0;
		ErrorCodes.FORMAT_ERROR = 				1;
		ErrorCodes.NO_PRINTERS = 				2;
		ErrorCodes.LOAD_ERROR = 				3;
		ErrorCodes.LOAD_DEFAULTS_ERROR = 		4;
		ErrorCodes.IMAGE_DOWNLOAD_ERROR = 		5;
		ErrorCodes.FILE_NOT_FOUND =				6;
		ErrorCodes.PM_CLIPART_ERROR = 			7;
		ErrorCodes.NO_PM_CLIPART = 				8;
		ErrorCodes.PM_CLIPART_HELPER_ERROR = 	9;
		ErrorCodes.NO_CLIPART_HELPER = 			10;
		ErrorCodes.WRONG_VERSION = 				11;
		ErrorCodes.SHARE_ERROR = 				12;

		return ErrorCodes;

	}
);


