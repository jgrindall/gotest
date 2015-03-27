define(

	['phasercomponents'],

function(PhaserComponents) {
	
	"use strict";
	
	var BackCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(BackCommand, PhaserComponents.Commands.AbstractCommand);

	BackCommand.prototype.execute = function(){
		if(window.closeApplication && window.pmConfirm && window._T){
			window.pmConfirm({
    			text: window._T('Are you sure you want to exit this program') + '?',
    			title: window._T('Exit') + "?",
    			onOk: window.closeApplication,
    			useNodder: true,
    			width: "250",
    			className: "codeDialog"
			});
		}
		else if(window.closeApplication && typeof window.closeApplication === 'function'){
			window.closeApplication();
		}
		else{
			//console.log("window.closeApplication is "+window.closeApplication);
			//window.history.back();
		}
	};
	
  	return BackCommand;
});
