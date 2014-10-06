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
			//this.eventDispatcher.trigger({"type":Events.SHOW_TOUCH_IMG});
			Message.show(Message.SCREENSHOT);
		}
		else{
			new FileDownloader().download();
		}
	};
	
  	return DownloadCommand;
});
