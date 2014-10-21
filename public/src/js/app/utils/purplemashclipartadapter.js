
define(['app/utils/errorcodes', 'app/utils/error'],

	function(ErrorCodes, Error){
	
		"use strict";
		
		var PurpleMashClipartAdapter = function(){
			console.log("E ", ErrorCodes, Error);
		};
		
		PurpleMashClipartAdapter.prototype.open = function(options){
			var onSuccess, obj;
			console.log("open ", options, options.success);
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
			console.log("callback id = ", id, options, options.success);
			var src, that = this;
			if(window.ClipArtHelper){
				try{
					window.ClipArtHelper.getImage(id, function(data){
						src = data.src;
						console.log("getImage = ", data, JSON.stringify(data));
						console.log("src = ", src);
						if(that.isBase64(src)){
							options.success(src);
						}
						else{
							that.imgUrlToBase64(src, options);
						}
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

		PurpleMashClipartAdapter.prototype.isBase64 = function(obj){
			console.log("isbase64", obj, (typeof obj), obj.substring(0, 22));
			if((typeof obj) === 'string' && obj.substring(0, 22) === "data:image/png;base64,"){
				return true;
			}
			return false;
		};

		PurpleMashClipartAdapter.prototype.imgUrlToBase64 = function(url, options){
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
	        	options.success(dataURL);
	        	canvas = null;
	        	img.onload = null;
   	 		};
   	 		img.src = url;
		};

		return PurpleMashClipartAdapter;

	}
);

