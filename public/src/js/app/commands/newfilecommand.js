define('app/commands/newfilecommand',['app/utils/alertmanager', 'app/models/modelfacade'],

function(AlertManager, ModelFacade) {
	
	"use strict";
	
	var NewFileCommand = function(){
		
	};
	
	NewFileCommand.prototype.execute = function(data){
		AlertManager.makeBgMenu({}, this.onBgChosen.bind(this));
	};
	
	NewFileCommand.prototype.onBgChosen = function(data){
		if(data.index === 1){
			ModelFacade.getInstance().get(ModelFacade.BG).setBg(data.selection.selectedPage);
		}
	};
	
  	return NewFileCommand;
});

