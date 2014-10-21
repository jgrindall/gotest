
define(['phasercomponents', 'app/utils/abstractclipartadapter'],

	function(PhaserComponents, AbstractClipartAdapter){
	
		"use strict";
		
		var LocalClipartAdapter = function(){
			AbstractClipartAdapter.call(this);
		};
		
		PhaserComponents.Utils.extends(LocalClipartAdapter, AbstractClipartAdapter);

		LocalClipartAdapter.prototype.openBg = function(options){
			var graph, context, i;
			this.addCanvas(options, {"w":600, "h":400});
			graph = $('#sketch');
			context = graph[0].getContext('2d');
	   	 	context.lineWidth = 3;
	    	context.strokeStyle = '#0000bb';
		    context.beginPath();
		    context.moveTo(10, 50);
		    for(i = 1; i <= 20; i++){
				context.lineTo(600 * Math.random(), 400 * Math.random());
		    }
		    context.stroke();
		};

		LocalClipartAdapter.prototype.addCanvas = function(options, data){
			$("body").append("<canvas id='sketch' style='position:absolute;top:10px;left:10px;background:white;' width='"+data.w+"' height='"+data.h+"'></canvas>");
			$("body").append("<button id='sketch_button' style='position:absolute;top:10px;left:15px;font-size: 150%;'>Ok</button>");
			$("body").append("<p id='sketch_msg' style='position:absolute;top:10px;background:white;left:160px;'>Imagine this is the 2Simple drawing API</p>");
			$("#sketch_button").click(this.imgDone.bind(this, options));
		};

		LocalClipartAdapter.prototype.imgDone = function(options){
			var data = document.getElementById("sketch").toDataURL("image/png");
			$("#sketch_button").remove();
			$("#sketch_msg").remove();
			$("#sketch").remove();
			options.success(data);
		};

		LocalClipartAdapter.prototype.openTurtle = function(options){
			var graph, context;
			this.addCanvas(options, {"w":50, "h":50});
			graph = $('#sketch');
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
		
		return LocalClipartAdapter;

	}
);

