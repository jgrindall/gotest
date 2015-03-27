define(['phasercomponents',

	'base/utils/error', 'base/utils/errorcodes'],

function(PhaserComponents,

	Error, ErrorCodes) {
	
	"use strict";
	
	var ShareCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(ShareCommand, PhaserComponents.Commands.AbstractCommand);

	ShareCommand.prototype.execute = function(){
		var json;
		json = this.modelFacade.getJson();
		this.storage.shareForKeyPath(null, json, this.onSaved.bind(this));
	};
	
	ShareCommand.prototype.onSaved = function(data){
		if(data.success === false){
			Error.show(this.alertManager, ErrorCodes.SHARE_ERROR);
		}
	};

  	return ShareCommand;
});


