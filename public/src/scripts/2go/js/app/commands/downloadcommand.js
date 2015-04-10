define(

	['phasercomponents',

	'base/utils/message', 'base/utils/translation', 'base/utils/translationconsts'],

	function(PhaserComponents, 

	Message, Translation, TranslationConsts) {
	
	"use strict";

	var DownloadCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
		PhaserComponents.Injector.getInstance().injectInto(this, 'downloadcommand');
	};

	PhaserComponents.Utils.extends(DownloadCommand, PhaserComponents.Commands.AbstractCommand);

	DownloadCommand.prototype.execute = function(){
		if(PhaserComponents.Utils.isTouch()){
			Message.show(this.alertManager, Translation.getForKey(TranslationConsts.Keys.SCREENSHOT));
		}
		else{
			this.fileDownLoader.download();
		}
	};
	
  	return DownloadCommand;
});
