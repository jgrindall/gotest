
define(['phasercomponents', 'filesaver',

	'html2canvas', 'app/events/events',

	'canvastoblob', 'app/utils/error', 'app/utils/errorcodes'],

	function(PhaserComponents, filesaver,

		html2canvas, Events,

		canvastoblob, Error, ErrorCodes){
	
		"use strict";
		
		var FileDownloader = function(){
			console.log("canvastoblob", canvastoblob);
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

		FileDownloader.prototype.processBlob = function(canvas, blob){
			try{
				filesaver(blob, "my2goimage.png");
			}
			catch(e){
				this.fallback(canvas);
			}
		};

		FileDownloader.prototype.saveBlob = function(canvas){
			try{
				canvas.toBlob(this.processBlob.bind(this, canvas));
			}
			catch(e){
				this.fallback(canvas);
			}
		};

		FileDownloader.prototype.fallback = function(canvas){
			if(canvas){
				this.saveImage(canvas);
			}
			else{
				this.message();
			}
		};

		FileDownloader.prototype.saveImage = function(canvas){
			var imgData;
			try{
				imgData = canvas.toDataURL("image/png");
				this.displayImage(imgData);
			}
			catch(e){
				this.message();
			}
		};

		FileDownloader.prototype.displayImage = function(imgData){
			this.eventDispatcher.trigger({"type":Events.IMG_CAPTURED, "data":imgData});
		};

		FileDownloader.prototype.onRendered = function(canvas){
			if(canvas){
				if(canvas.toBlob && filesaver){
					this.saveBlob(canvas);
				}
				else if(canvas.toDataURL){
					this.fallback(canvas);
				}
			}
			else{
				this.message();
			}
		};

		FileDownloader.prototype.message = function(){
			Error.show(ErrorCodes.IMAGE_DOWNLOAD_ERROR);
		};

		return FileDownloader;

	}
);




