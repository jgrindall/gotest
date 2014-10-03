define(

	['phasercomponents', 'app/events/events', 'html2canvas'],

	function(PhaserComponents, Events, html2canvas) {
	
	"use strict";

	var DownloadCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(DownloadCommand, PhaserComponents.Commands.AbstractCommand);

	DownloadCommand.prototype.onRendered = function(canvas){
		var img = canvas.toDataURL("image/png");
		this.eventDispatcher.trigger({"type":Events.IMG_CAPTURED, "data":img});
	};

	DownloadCommand.prototype.toCanvas = function(){
		var options = {"onrendered" : this.onRendered.bind(this)};
		html2canvas(document.body, options);
	};

	DownloadCommand.prototype.execute = function(){
		if(PhaserComponents.Utils.isTouch()){
			this.eventDispatcher.trigger({"type":Events.SHOW_TOUCH_IMG});
		}
		else{
			this.toCanvas();
		}
	};
	
  	return DownloadCommand;
});
