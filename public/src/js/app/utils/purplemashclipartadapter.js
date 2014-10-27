
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
			if(window.ClipArtHelper){
				try{
					window.ClipArtHelper.getImage(id, function(data){
						src = data.src;
						console.log("loading src ", src);
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
			this.open(options);
		};

		PurpleMashClipartAdapter.prototype.openTurtle = function(options){
			options.background = false;
			this.open(options);
		};

		PurpleMashClipartAdapter.prototype.isBase64 = function(obj){
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
	        	context = null;
	        	img.onload = null;
	        	img = null;
   	 		};
   	 		img.src = url;
		};

		return PurpleMashClipartAdapter;

	}
);
