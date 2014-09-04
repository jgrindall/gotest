define('app/commands/newfilecommand',

	['app/utils/alertmanager', 'app/models/modelfacade', 'app/commands/abstractcommand'],

function(AlertManager, ModelFacade, AbstractCommand) {
	
	"use strict";
	
	var NewFileCommand = function(){
		AbstractCommand.call(this);
	};
	
	NewFileCommand.prototype = Object.create(AbstractCommand.prototype);
	NewFileCommand.prototype.constructor = NewFileCommand;

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

