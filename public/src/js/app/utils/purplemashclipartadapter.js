
define(['app/utils/errorcodes', 'app/utils/error'],

	function(ErrorCodes, Error){
	
		"use strict";
		
		var PurpleMashClipartAdapter = function(){
			console.log("E ", ErrorCodes, Error);
		};
		
		PurpleMashClipartAdapter.prototype.open = function(options){
			var onSuccess, obj;
			onSuccess = this.idSelected.bind(this, options);
			obj = {"onSelectImage": onSuccess, "background":options.background};
			if(window.PMClipArtPicker){
				try{
					new window.PMClipArtPicker(obj);
				}
				catch(e){
					//Error.show(this.alertManager, ErrorCodes.NO_PRINTERS);
				}
			}
			else{
				//Error.show(this.alertManager, ErrorCodes.NO_PRINTERS);
			}
		};

		PurpleMashClipartAdapter.prototype.idSelected = function(options, id){
			console.log("callback id = ", id);
			if(window.ClipArtHelper){
				try{
					window.ClipArtHelper.getImage(id, function(data){
						console.log("getImage = ", data, JSON.stringify(data));
						console.log("src = ", data.src);
						//options.callback(data.src);
					});
				}
				catch(e){
					//Error.show(this.alertManager, ErrorCodes.NO_PRINTERS);
				}
			}
			else{
				//Error.show(this.alertManager, ErrorCodes.NO_PRINTERS);
			}
		};

		PurpleMashClipartAdapter.prototype.openBg = function(options){
			options.background = true;
			this.open(options);
		};

		PurpleMashClipartAdapter.prototype.openTurtle = function(options){
			options.background = false;
			this.open(options);
		};

		PurpleMashClipartAdapter.prototype.imgUrlToBase64 = function(url, callback){
    		var canvas, context, img;
    		canvas = document.createElement('canvas');
        	context = canvas.getContext('2d');
        	img = new Image();
   			img.crossOrigin = 'Anonymous';
   			img.onload = function(){
        		var dataURL;
	        	canvas.height = img.height;
	        	canvas.width = img.width;
	        	context.drawImage(img, 0, 0);
	        	dataURL = canvas.toDataURL("image/png");
	        	callback.call(this, dataURL);
	        	canvas = null; 
   	 		};
   	 		img.src = url;
		};

		return PurpleMashClipartAdapter;

	}
);

