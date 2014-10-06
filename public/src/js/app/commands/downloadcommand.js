define(

	['phasercomponents', 'app/utils/filedownloader',

	'app/views/popups/growl', 'app/assets'],

	function(PhaserComponents, FileDownloader,

	Growl, Assets) {
	
	"use strict";

	var DownloadCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};

	PhaserComponents.Utils.extends(DownloadCommand, PhaserComponents.Commands.AbstractCommand);

	DownloadCommand.prototype.execute = function(){
		if(PhaserComponents.Utils.isTouch()){
			//this.eventDispatcher.trigger({"type":Events.SHOW_TOUCH_IMG});
			PhaserComponents.AlertManager.getInstance().make(Growl, {"title":"Message", "label":"Use your device to take a screenshot\nand save it to your camera roll.\nIf you're not sure how, ask your teacher.", "sfx":Assets.SOUNDS[2]}, null);
		}
		else{
			new FileDownloader().download();
		}
	};
	
  	return DownloadCommand;
});
