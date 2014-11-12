define(

	['phasercomponents', 'app/utils/filedownloader',

	'app/utils/message'],

	function(PhaserComponents, FileDownloader,

	Message) {
	
	"use strict";

	var DownloadCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};

	PhaserComponents.Utils.extends(DownloadCommand, PhaserComponents.Commands.AbstractCommand);

	DownloadCommand.prototype.execute = function(){
		if(PhaserComponents.Utils.isTouch()){
			Message.show(this.alertManager, Message.SCREENSHOT);
		}
		else{
			new FileDownloader().download();
		}
	};
	
  	return DownloadCommand;
});
