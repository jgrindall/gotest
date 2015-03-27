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
		console.log(this.modelFacade);
		console.log(this.modelFacade.getJson);
		json = this.modelFacade.getJson();
		console.log(this.modelFacade, json, this.storage, this.onSaved);
		this.storage.shareForKeyPath(null, json, this.onSaved.bind(this));
	};
	
	ShareCommand.prototype.onSaved = function(data){
		if(data.success === false){
			Error.show(this.alertManager, ErrorCodes.SHARE_ERROR);
		}
	};

  	return ShareCommand;
});


