define(

	['phasercomponents',

	'base/utils/message'],

	function(PhaserComponents, 

	Message) {
	
	"use strict";

	var DownloadCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
		PhaserComponents.Injector.getInstance().injectInto(this, 'downloadcommand');
	};

	PhaserComponents.Utils.extends(DownloadCommand, PhaserComponents.Commands.AbstractCommand);

	DownloadCommand.prototype.execute = function(){
		if(PhaserComponents.Utils.isTouch()){
			Message.show(this.alertManager, Message.SCREENSHOT);
		}
		else{
			this.fileDownLoader.download();
		}
	};
	
  	return DownloadCommand;
});
