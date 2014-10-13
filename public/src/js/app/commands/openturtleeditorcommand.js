define(

	['jquery', 'phasercomponents',

	'app/models/modelconsts'],

function($, PhaserComponents,

	ModelConsts) {
	
	"use strict";

	var OpenTurtleEditorCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(OpenTurtleEditorCommand, PhaserComponents.Commands.AbstractCommand);

	OpenTurtleEditorCommand.prototype.onDrawFinished = function(data){
		this.modelFacade.get(ModelConsts.TURTLE_PNG).set(data);
	};

	OpenTurtleEditorCommand.prototype.drawRandom = function(options){
		var graph, context;
		$("body").append("<canvas id='sketch' style='position:absolute;top:10px;left:10px;background:white;' width='50' height='50'></canvas>");
		$("body").append("<button id='sketch_button' style='position:absolute;top:10px;left:10px;'>Ok</button>");
		graph = $('#sketch');
		$("#sketch_button").click(function(){
			var data = document.getElementById("sketch").toDataURL("image/png");
			options.success(data);
			$("#sketch_button").remove();
			$("#sketch").remove();
		});
        context = graph[0].getContext('2d');
   	 	context.lineWidth = 3;
    	context.strokeStyle = '#00bb00';
	    context.beginPath();
	    context.moveTo(15, 10);
	    context.lineTo(35, 10);
	    context.lineTo(35, 45);
	    context.lineTo(15, 45);
	    context.lineTo(15, 10);
	    context.moveTo(15, 15);
	    context.lineTo(0, 20);
	    context.lineTo(15, 25);
	    context.moveTo(35, 15);
	    context.lineTo(50, 20);
	    context.lineTo(35, 25);
	    context.moveTo(15, 35);
	    context.lineTo(7, 40);
	    context.lineTo(15, 45);
	    context.moveTo(35, 35);
	    context.lineTo(44, 40);
	    context.lineTo(35, 45);
	    context.stroke();
	};
		
	OpenTurtleEditorCommand.prototype.execute = function(){
		this.drawRandom({"success":this.onDrawFinished.bind(this)});
	};
	
  	return OpenTurtleEditorCommand;
});
