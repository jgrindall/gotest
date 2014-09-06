define('app/commands/teachercommand',

	['phasercomponents', 'app/components/popups/growl'],

function(PhaserComponents, Growl) {
	
	"use strict";
	
	var TeacherCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(TeacherCommand, PhaserComponents.Commands.AbstractCommand);

	TeacherCommand.prototype.execute = function(data){
		PhaserComponents.AlertManager.getInstance().make(Growl, {"label":"Teacher login with password?"}, null);
	};
	
  	return TeacherCommand;
});

