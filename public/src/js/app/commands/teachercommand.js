define('app/commands/teachercommand',

	['phasercomponents', 'app/components/popups/growl'],

function(PhaserComponents, Growl) {
	
	"use strict";
	
	var TeacherCommand = function(){
		PhaserComponents.AbstractCommand.call(this);
	};
	
	TeacherCommand.prototype = Object.create(PhaserComponents.AbstractCommand.prototype);
	TeacherCommand.prototype.constructor = TeacherCommand;

	TeacherCommand.prototype.execute = function(data){
		PhaserComponents.AlertManager.getInstance().make(Growl, {"label":"Teacher login with password?"}, null);
	};
	
  	return TeacherCommand;
});

