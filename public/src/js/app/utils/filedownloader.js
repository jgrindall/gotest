
define(['phasercomponents', 'filesaver',

	'html2canvas', 'app/events/events',

	'app/utils/error', 'app/utils/errorcodes'],

	function(PhaserComponents, filesaver,

		html2canvas, Events,

		Error, ErrorCodes){
	
		"use strict";
		
		var FileDownloader = function(){
			PhaserComponents.Injector.getInstance().injectInto(this, "filedownloader");
		};

		FileDownloader.FILENAME = "my2goimage.png";

		FileDownloader.base64_ranks = new Uint8Array([62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1,  0, -1, -1, -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51]);

		FileDownloader.decode_base64 = function(base64){
			var len, buffer, i, outptr, last, state, save, rank, code, undef;
			len = base64.length;
			buffer = new Uint8Array(len / 4 * 3 | 0);
			i = 0;
			outptr = 0;
			last = [0, 0];
			state = 0;
			save = 0;
			while (len--) {
				code = base64.charCodeAt(i++);
				rank = FileDownloader.base64_ranks[code - 43];
				if (rank !== 255 && rank !== undef) {
					last[1] = last[0];
					last[0] = code;
					save = (save << 6) | rank;
					state++;
					if (state === 4) {
						buffer[outptr++] = save >>> 16;
						if (last[1] !== 61) {
							buffer[outptr++] = save >>> 8;
						}
						if (last[0] !== 61) {
							buffer[outptr++] = save;
						}
						state = 0;
					}
				}
			}
			return buffer;
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
				filesaver(blob, FileDownloader.FILENAME);
			}
			catch(e){
				this.fallback(canvas);
			}
		};

		FileDownloader.prototype.saveBlob = function(canvas){
			var imgData, data, blob, enc = "image/png";
			try{
				if(canvas.toBlob){
					canvas.toBlob(this.processBlob.bind(this, canvas));
				}
				else{
					imgData = canvas.toDataURL(enc);
					data = imgData.substring(imgData.indexOf(",") + 1);
					blob = new Blob([FileDownloader.decode_base64(data)], {"type": enc});
					this.processBlob(canvas, blob);
				}
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
				if(window.Blob && filesaver){
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




