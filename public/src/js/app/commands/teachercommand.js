define('app/commands/teachercommand',

	['phasercomponents', 'app/views/popups/growl', 'app/assets'],

function(PhaserComponents, Growl, Assets) {
	
	"use strict";
	
	var TeacherCommand = function(){
		PhaserComponents.Commands.AbstractCommand.call(this);
	};
	
	PhaserComponents.Utils.extends(TeacherCommand, PhaserComponents.Commands.AbstractCommand);

	TeacherCommand.prototype.execute = function(){
		PhaserComponents.AlertManager.getInstance().make(Growl, {"title":"Message", "label":"Teacher login with password?", "sfx":Assets.SOUNDS[2]}, null);
	};
	
  	return TeacherCommand;
});

