define('app/commands/teachercommand',

	['app/utils/alertmanager', 'app/commands/abstractcommand'],

function(AlertManager, AbstractCommand) {
	
	"use strict";
	
	var TeacherCommand = function(){
		AbstractCommand.call(this);
	};
	
	TeacherCommand.prototype = Object.create(AbstractCommand.prototype);
	TeacherCommand.prototype.constructor = TeacherCommand;

	TeacherCommand.prototype.execute = function(data){
		AlertManager.makeGrowl({"label":"Teacher login with password?"}, null);
	};
	
  	return TeacherCommand;
});

