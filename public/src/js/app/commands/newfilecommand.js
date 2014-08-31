define(['app/utils/alertmanager', 'app/models/bgmodel'],

function(AlertManager, bgModel) {
	
	"use strict";
	
	var NewFileCommand = function(){
		
	};
	
	NewFileCommand.prototype.execute = function(data){
		console.log("execute NEW FILE");
		AlertManager.makeBgMenu({}, $.proxy(this.onBgChosen, this));
	};
	
	NewFileCommand.prototype.onBgChosen = function(data){
		console.log("bgChosen "+JSON.stringify(data));
		if(data.index === 1){
			bgModel.setBg(data.selection.selectedPage);
		}
	};
	
  	return NewFileCommand;
});

