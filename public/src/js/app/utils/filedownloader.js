
define(['phasercomponents', 'filesaver',

	'html2canvas', 'app/events/events', 'app/utils/message',

	'app/utils/error', 'app/utils/errorcodes'],

	function(PhaserComponents, filesaver,

		html2canvas, Events, Message,

		Error, ErrorCodes){
	
		"use strict";
		
		var FileDownloader = function(){
			PhaserComponents.Injector.getInstance().injectInto(this, "filedownloader");
			this.processing = false;
			this.flash = false;
			this.message = Message;
		};

		FileDownloader.FILENAME = "my2goimage";

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

		FileDownloader.prototype.getFlashData = function(){
			if(!this.canvas && !this.processing){
				this.download();
			}
			else{
				return this.canvas.toDataURL("image/png");
			}
		};

		FileDownloader.prototype.flashSaved = function(){
			this.canvas = null;
			console.log("saved");
		};
		
		FileDownloader.prototype.flashCancelled = function(){
			this.canvas = null;
			console.log("cancelled");
		};
		
		FileDownloader.prototype.initFlash = function(){
			return;
			/*
			var options;
			if(swfobject.hasFlashPlayerVersion("9.0.0")){
				try{
					this.el = document.getElementById('flash');
					if(this.el === null){
						$("body").append("<div id='flash' style='position:absolute;top:0;left:0;'></div>");
						this.el = document.getElementById('flash');
					}
					options = {};
					options.filename = 			FileDownloader.FILENAME;
					options.data = 				this.getFlashData.bind(this);
					options.onComplete = 		this.flashSaved.bind(this);
					options.onCancel = 			this.flashCancelled.bind(this);
					options.onError = 			this.message.bind(this);
					options.swf = 				'assets/flash/downloadify.swf';
					options.downloadImage = 	'assets/flash/download.png';
					options.width = 			100;
					options.height = 			30;
					options.transparent = 		true;
					options.append = 			true;
					Downloadify.create("flash", options );
					this.flash = true;
				}
				catch(e){

				}
			}
			*/
		};

		FileDownloader.prototype.onClickClose = function(){
			$("._2gofilenamecontainer").remove();
			$("._2gofilenameclose").off('click');
			$("._2gofilenameokcontainer").off('click');
			$("._2gofilenameinput").off('keyup');
			$("._2gofilenameinput").off('keydown');
		};

		FileDownloader.prototype.validate = function(){
			return (this.filename.length >= 3);
		};

		FileDownloader.prototype.onClickOk = function(){
			this.onChange();
			this.filename = $("._2gofilenameinput").val();
			if(this.validate()){
				this.onClickClose();
				this.startDownload();
			}
			else{
				$("._2gofilenameerror").show();
			}
		};

		FileDownloader.prototype.onChange = function(){
			var val, newVal;
			val = $("._2gofilenameinput").val();
			newVal = val.replace(/\W/g, '');
			newVal = newVal.replace(/\s/g, '');
			newVal = newVal.replace(/_/g, '');
			$("._2gofilenameinput").val(newVal);
		};

		FileDownloader.prototype.onKeyDown = function(e){
			e.stopPropagation();
		};

		FileDownloader.prototype.download = function(){
			var pop, box;
			pop = $("<div class='_2gofilenamecontainer'></div>");
			pop.append("<div class='_2gofilenamebg'></div>");
			box = $("<div class='_2gofilename'></div>");
			box.append("<div class='_2gofilenameclose'></div>");
			box.append("<input maxlength = '12' class='_2go _2gofilenameinput' type='text'></input>");
			box.append("<p class='_2gofilenametitle'>Download</p>");
			box.append("<p class='_2gofilenameerror'>Please enter at least 3 characters</p>");
			box.append("<p class='_2gofilenamemessage'>Please choose a filename</p>");
			box.append("<div class='_2gofilenameokcontainer'><div class='_2gofilenameokyellow'><div class='_2gofilenameokyes'></div></div></div>");
			pop.append(box);
			$("body").append(pop);
			$("._2gofilenameerror").hide();
			$("._2gofilenameinput").val(FileDownloader.FILENAME);
			$("._2gofilenameclose").click(this.onClickClose.bind(this));
			$("._2gofilenameokcontainer").click(this.onClickOk.bind(this));
			$("._2gofilenameinput").keyup(this.onChange.bind(this));
			$("._2gofilenameinput").keydown(this.onKeyDown.bind(this));
		};

		FileDownloader.prototype.startDownload = function(){
			var options = {"onrendered" : this.onRendered.bind(this)};
			console.log("html2canvas", html2canvas);
			if(html2canvas){
				try{
					html2canvas(document.body, options);
					this.processing = true;
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
			var filename = this.filename || FileDownloader.FILENAME;
			try{
				filesaver(blob, filename + ".png");
			}
			catch(e){
				this.fallback();
			}
		};

		FileDownloader.prototype.saveBlob = function(){
			var imgData, data, blob, enc = "image/png";
			try{
				if(this.canvas.toBlob){
					this.canvas.toBlob(this.processBlob.bind(this));
				}
				else{
					imgData = this.canvas.toDataURL(enc);
					data = imgData.substring(imgData.indexOf(",") + 1);
					blob = new Blob([FileDownloader.decode_base64(data)], {"type": enc});
					this.processBlob(blob);
				}
			}
			catch(e){
				this.fallback();
			}
		};

		FileDownloader.prototype.fallback = function(){
			if(this.canvas){
				this.saveImage();
			}
			else{
				this.message();
			}
		};

		FileDownloader.prototype.saveImage = function(){
			var imgData;
			try{
				imgData = this.canvas.toDataURL("image/png");
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
			this.canvas = canvas;
			this.processing = false;
			console.log("onRendered", canvas, this.flash, window.Blob, filesaver);
			if(!this.flash){
				if(canvas){
					if(window.Blob && filesaver){
						this.saveBlob();
					}
					else if(canvas.toDataURL){
						this.fallback();
					}
				}
				else{
					this.message();
				}
			}
		};

		FileDownloader.prototype.message = function(code){
			if(code === null || code === undefined){
				code = ErrorCodes.IMAGE_DOWNLOAD_ERROR;
			}
			Error.show(this.alertManager, code);
		};

		return FileDownloader;

	}
);




