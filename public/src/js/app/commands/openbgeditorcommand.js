define(

	['jquery', 'phasercomponents',

	'app/events/events', 'app/models/modelconsts'],

function($, PhaserComponents,

	Events, ModelConsts) {
	
	"use strict";

	var OpenBgEditorCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(OpenBgEditorCommand, PhaserComponents.Commands.AbstractCommand);

	OpenBgEditorCommand.prototype.onDrawFinished = function(data){
		this.modelFacade.get(ModelConsts.BG_PNG).set(data);
	};

	OpenBgEditorCommand.prototype.drawRandom = function(options){
		var graph, c, i;
		$("body").append("<canvas id='sketch' style='position:absolute;top:10px;left:10px;background:white;' width='600' height='400'></canvas>");
		$("body").append("<button id='sketch_button' style='position:absolute;top:10px;left:10px;'>Ok</button>");
		graph = $('#sketch');
		$("#sketch_button").click(function(){
			var data = document.getElementById("sketch").toDataURL("image/png");
			options.success(data);
			$("#sketch_button").remove();
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
		this.drawRandom({"success":this.onDrawFinished.bind(this)});
	};
	
  	return OpenBgEditorCommand;
});
