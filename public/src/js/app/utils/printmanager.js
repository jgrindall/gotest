
define('app/utils/printmanager',[],

function(){
	
	"use strict";
	
	var PrintManager = function(){
		
	};
	
	PrintManager.prototype.print = function(){
		
	};
	
	PrintManager.getInstance = function(){
		if(!PrintManager.instance){
			PrintManager.instance = new PrintManager();
			PrintManager.instance.init();
		}
		return PrintManager.instance;
	};
	
	return PrintManager;
	
});

