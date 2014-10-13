define(

	['jquery', 'phasercomponents', 'app/events/events'],

function($, PhaserComponents, Events) {
	
	"use strict";

	var OpenBgEditorCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(OpenBgEditorCommand, PhaserComponents.Commands.AbstractCommand);

	OpenBgEditorCommand.prototype.onDrawFinished = function(data){
		this.eventDispatcher.trigger({"type":Events.BG_EDITOR_DONE, "data":data});
	};

	OpenBgEditorCommand.prototype.drawRandom = function(options){
		var graph, c;
		$("body").append("<canvas id='sketch' style='position:absolute;top:10px;left:10px;background:white;' width='600' height='300'></canvas>");
		$("body").append("<button id='sketch_button' style='position:absolute;top:10px;left:10px;'>Ok</button>");
		graph = $('#sketch');
		$("#sketch_button").click(function(){
			var data = document.getElementById("sketch").toDataURL("image/png");
			options.success(data);
			$("#sketch_button").remove();
			$("#sketch").remove();
		});
        c = graph[0].getContext('2d');
   	 	c.lineWidth = 2;
    	c.strokeStyle = '#111';
	    c.beginPath();
	    c.moveTo(10, 50);
	    c.lineTo(400, 250);
	    c.lineTo(100, 600);
	    c.lineTo(40, 70);
	    c.lineTo(440, 70);
	    c.lineTo(200, 100);
	    c.lineTo(500, 50);
	    c.lineTo(40, 150);
	    c.stroke();
	};
		
	OpenBgEditorCommand.prototype.execute = function(){
		this.drawRandom({"success":this.onDrawFinished.bind(this)});
	};
	
  	return OpenBgEditorCommand;
});
