define(

	['phasercomponents',

	'app/models/modelconsts'],

function(PhaserComponents,

	ModelConsts) {
	
	"use strict";

	var OpenBgEditorCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(OpenBgEditorCommand, PhaserComponents.Commands.AbstractCommand);

	OpenBgEditorCommand.prototype.onImgSelected = function(id){
		console.log("callback id = ", id, JSON.stringify(id));
		window.ClipArtHelper.getImage(id, function(data){
			console.log("getImage = ", data, JSON.stringify(data));
			console.log("src = ", data.src);
		});
	};

	OpenBgEditorCommand.prototype.onDrawFinished = function(data){
		this.modelFacade.get(ModelConsts.BG_PNG).set(data);
	};

	OpenBgEditorCommand.prototype.openPM = function(){
		var onSuccess = this.onImgSelected.bind(this);
		console.log("using PM editor");
		console.log("PMClipArtPicker = ", 	window.PMClipArtPicker);
		console.log("ClipArtHelper = ", 	window.ClipArtHelper);
		console.log("onSuccess = ", 		onSuccess);
		new window.PMClipArtPicker({"onSelectImage": onSuccess, "background":true});
	};

	OpenBgEditorCommand.prototype.drawRandom = function(options){
		var graph, c, i;
		$("body").append("<canvas id='sketch' style='position:absolute;top:10px;left:10px;background:white;' width='600' height='400'></canvas>");
		$("body").append("<button id='sketch_button' style='position:absolute;top:10px;left:15px;font-size: 150%;'>Ok</button>");
		$("body").append("<p id='sketch_msg' style='position:absolute;top:10px;background:white;left:160px;'>Imagine this is the 2Simple drawing API</p>");
		graph = $('#sketch');
		$("#sketch_button").click(function(){
			var data = document.getElementById("sketch").toDataURL("image/png");
			options.success(data);
			$("#sketch_button").remove();
			$("#sketch_msg").remove();
			$("#sketch").remove();
		});
        c = graph[0].getContext('2d');
   	 	c.lineWidth = 3;
    	c.strokeStyle = '#0000bb';
	    c.beginPath();
	    c.moveTo(10, 50);
	    for(i = 1; i <= 20; i++){
			c.lineTo(600 * Math.random(), 400 * Math.random());
	    }
	    c.stroke();
	};
		
	OpenBgEditorCommand.prototype.execute = function(){
		this.openPM();
		//this.drawRandom({"success":this.onDrawFinished.bind(this)});
	};
	
  	return OpenBgEditorCommand;
});


/**

TODO

function convertImgToBase64(url, callback, outputFormat){
    var canvas = document.createElement('CANVAS'),
        ctx = canvas.getContext('2d'),
        img = new Image;
    //img.crossOrigin = 'Anonymous';
    img.onload = function(){
        var dataURL;
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        callback.call(this, dataURL);
        canvas = null; 
    };
    img.src = url;
}
**/
