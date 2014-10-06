
define(['phasercomponents', 'app/views/popups/growl', 'filesaver',

	'html2canvas', 'app/events/events', 'app/assets', 'canvastoblob'],

	function(PhaserComponents, Growl, filesaver,

		html2canvas, Events, Assets, canvastoblob){
	
		"use strict";
		
		var FileDownloader = function(){
			console.log("canvastoblob "+canvastoblob);
			PhaserComponents.Injector.getInstance().injectInto(this, "filedownloader");
		};

		FileDownloader.prototype.download = function(){
			var options = {"onrendered" : this.onRendered.bind(this)};
			if(html2canvas){
				try{
					html2canvas(document.body, options);
				}
				catch(e){
					this.message();
				}
			}
			else{
				this.message();
			}
		};

		FileDownloader.prototype.processBlob = function(blob){
			try{
				filesaver(blob, "my2goimage.png");
			}
			catch(e){
				this.message();
			}
		};

		FileDownloader.prototype.displayImage = function(imgData){
			this.eventDispatcher.trigger({"type":Events.IMG_CAPTURED, "data":imgData});
		};

		FileDownloader.prototype.onRendered = function(canvas){
			var imgData;
			if(canvas){
				if(canvas.toBlob && filesaver){
					canvas.toBlob(this.processBlob.bind(this));
				}
				else if(canvas.toDataURL){
					try{
						imgData = canvas.toDataURL("image/png");
						this.displayImage(imgData);
					}
					catch(e){
						this.message();
					}
				}
			}
			else{
				this.message();
			}
		};

		FileDownloader.prototype.message = function(s){
			if(!s){
				s = "Sorry, saving images does not seem\nto be supported on your browser.";
			}
			PhaserComponents.AlertManager.getInstance().make(Growl, {"title":"Message", "label":s, "sfx":Assets.SOUNDS[2]}, null);
		};

		return FileDownloader;

	}
);




