
define(['phasercomponents', 'app/utils/abstractclipartadapter', 'app/utils/errorcodes', 'app/utils/error'],

	function(PhaserComponents, AbstractClipartAdapter, ErrorCodes, Error){
	
		"use strict";

		var PurpleMashClipartAdapter = function(){
			AbstractClipartAdapter.call(this);
		};
		
		PhaserComponents.Utils.extends(PurpleMashClipartAdapter, AbstractClipartAdapter);

		PurpleMashClipartAdapter.prototype.open = function(options){
			var onSuccess, obj;
			onSuccess = this.idSelected.bind(this, options);
			obj = {"onSelectImage": onSuccess, "background":options.background};
			if(options.additionalFolders){
				obj.additionalFolders = [{"label" : '2go turtles', "value" : '/2go/turtles'}];
			}
			console.log("window.PMClipArtPicker is ", window.PMClipArtPicker);
			console.log("options are ", JSON.stringify(obj));
			if(window.PMClipArtPicker){
				try{
					new window.PMClipArtPicker(obj);
				}
				catch(e){
					Error.show(this.alertManager, ErrorCodes.PM_CLIPART_ERROR);
				}
			}
			else{
				Error.show(this.alertManager, ErrorCodes.NO_PM_CLIPART);
			}
		};

		PurpleMashClipartAdapter.prototype.idSelected = function(options, id){
			var src, that = this;
			console.log("you selected an image");
			console.log("window.ClipArtHelper is ", window.ClipArtHelper);
			console.log("options is ", options , " \n and id is ", id);
			if(window.ClipArtHelper){
				try{
					window.ClipArtHelper.getImage(id, function(data){
						src = data.src;
						console.log("getImage callback data is ", data);
						if(that.isBase64(src)){
							options.success(src);
						}
						else{
							that.imgUrlToBase64(src, options);
						}
					});
				}
				catch(e){
					Error.show(this.alertManager, ErrorCodes.PM_CLIPART_HELPER_ERROR);
				}
			}
			else{
				Error.show(this.alertManager, ErrorCodes.NO_CLIPART_HELPER);
			}
		};

		PurpleMashClipartAdapter.prototype.openBg = function(options){
			options.background = true;
			options.additionalFolders = false;
			this.open(options);
		};

		PurpleMashClipartAdapter.prototype.openTurtle = function(options){
			options.background = false;
			options.additionalFolders = true;
			this.open(options);
		};

		PurpleMashClipartAdapter.prototype.isJpg = function(obj){
			return obj.substring(0, 22) === "data:image/jpg;base64,";
		};

		PurpleMashClipartAdapter.prototype.isJpeg = function(obj){
			return obj.substring(0, 23) === "data:image/jpeg;base64,";
		};

		PurpleMashClipartAdapter.prototype.isPng = function(obj){
			return obj.substring(0, 22) === "data:image/png;base64,";
		};

		PurpleMashClipartAdapter.prototype.isBase64 = function(obj){
			if((typeof obj) === 'string' && (this.isPng(obj) || this.isJpg(obj) || this.isJpeg(obj))){
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
	        	//window.alert("imgUrlToBase64 dataURL "+dataURL.substring(0,50));
	        	options.success(dataURL);
	        	canvas = null;
	        	context = null;
	        	img.onload = null;
	        	img = null;
   	 		};
   	 		img.src = url;
		};

		return PurpleMashClipartAdapter;

	}
);

