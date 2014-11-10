define(['phasercomponents'],

function(PhaserComponents) {
	
	"use strict";
	
	var VideoCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(VideoCommand, PhaserComponents.Commands.AbstractCommand);

	VideoCommand.prototype.execute = function(){
		var args, options;
		if(window.PMVideo && window.PMVideo.launch && typeof window.PMVideo.launch === 'function'){
			args = [{
			    label: "Console time",
			    url: "/mashcontent/videos/2graph/01.2Graph Console time.flv.mp4"
			},
			{
			    label: "Sweet investigation",
			    url: "/mashcontent/videos/2graph/02.2Graph Sweets investigation.flv.mp4"
			},
			{
			    label: "Spend PTA money",
			    url: "/mashcontent/videos/2graph/03.2Graph Spend PTA Money.flv.mp4"
			}];
			options = {title: "2Go - Help Videos"};
			window.PMVideo.launch(args, options);
		}
		else{
			console.log("window.PMVideo is "+window.PMVideo);
			console.log("window.PMVideo.launch is "+window.PMVideo.launch);
		}
	};
	
  	return VideoCommand;
});
