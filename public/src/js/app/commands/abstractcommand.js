
define('app/commands/abstractcommand', [], function(){
	
	"use strict";
	
	var AbstractCommand = function(){
		this.eventDispatcher = {"name":"John"};
	};
	
	AbstractCommand.prototype.start = function(data){
		this.execute(data);
		this.cleanUp();
	};

	AbstractCommand.prototype.cleanUp = function(){
		this.eventDispatcher = null;
	};
	
	return AbstractCommand;

});




