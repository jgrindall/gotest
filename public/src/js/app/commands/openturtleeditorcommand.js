define(

	['jquery', 'phasercomponents', 'app/events/events'],

function($, PhaserComponents, Events) {
	
	"use strict";

	var OpenTurtleEditorCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(OpenTurtleEditorCommand, PhaserComponents.Commands.AbstractCommand);

	OpenTurtleEditorCommand.prototype.onDrawFinished = function(data){
		this.eventDispatcher.trigger({"type":Events.TURTLE_EDITOR_DONE, "data":data});
	};

	OpenTurtleEditorCommand.prototype.drawRandom = function(options){
		var graph, context;
		$("body").append("<canvas id='sketch' style='position:absolute;top:10px;left:10px;background:white;' width='80' height='80'></canvas>");
		$("body").append("<button id='sketch_button' style='position:absolute;top:10px;left:10px;'>Ok</button>");
		graph = $('#sketch');
		$("#sketch_button").click(function(){
			var data = document.getElementById("sketch").toDataURL("image/png");
			options.success(data);
			$("#sketch_button").remove();
			$("#sketch").remove();
		});
        context = graph[0].getContext('2d');
   	 	context.lineWidth = 2;
    	context.strokeStyle = '#111';
	    context.beginPath();
	    context.moveTo(30, 20);
	    context.lineTo(50, 20);
	    context.lineTo(50, 60);
	    context.lineTo(30, 60);
	    context.lineTo(30, 20);
	    context.moveTo(30, 25);
	    context.lineTo(15, 30);
	    context.lineTo(30, 35);
	    context.moveTo(50, 25);
	    context.lineTo(65, 30);
	    context.lineTo(50, 35);
	    context.moveTo(30, 45);
	    context.lineTo(22, 50);
	    context.lineTo(30, 55);
	    context.moveTo(50, 45);
	    context.lineTo(58, 50);
	    context.lineTo(50, 55);
	    context.stroke();
	};
		
	OpenTurtleEditorCommand.prototype.execute = function(){
		this.drawRandom({"success":this.onDrawFinished.bind(this)});
	};
	
  	return OpenTurtleEditorCommand;
});
