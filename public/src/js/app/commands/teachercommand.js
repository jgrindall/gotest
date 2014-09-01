define('app/commands/teachercommand',['app/utils/alertmanager'],

function(AlertManager) {
	
	"use strict";
	
	var TeacherCommand = function(){
		
	};
	
	TeacherCommand.prototype.execute = function(data){
		AlertManager.makeGrowl({"label":"Teacher login with password?"}, null);
	};
	
  	return TeacherCommand;
});

