define('app/commands/teachercommand',

	['phasercomponents', 'app/components/popups/growl'],

function(PhaserComponents, Growl) {
	
	"use strict";
	
	var TeacherCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	TeacherCommand.prototype = Object.create(PhaserComponents.Commands.AbstractCommand.prototype);
	TeacherCommand.prototype.constructor = TeacherCommand;

	TeacherCommand.prototype.execute = function(data){
		PhaserComponents.AlertManager.getInstance().make(Growl, {"label":"Teacher login with password?"}, null);
	};
	
  	return TeacherCommand;
});

