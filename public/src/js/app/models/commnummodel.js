
define(['app/models/abstractmodel'],

function(AbstractModel){
	
	"use strict";
	
	var CommNumModel  = function(){
		AbstractModel.call(this);
		this.commandNum = 0;
	};
	
	CommNumModel.prototype = Object.create(AbstractModel.prototype);
	CommNumModel.prototype.constructor = CommNumModel;
	
	CommNumModel.prototype.getData = function(){
		return {"commandNum":this.commandNum};
	};
	
	CommNumModel.prototype.increment = function() {
		this.setCommandNum(this.commandNum + 1);
	};

	CommNumModel.prototype.decrement = function() {
		this.setCommandNum(this.commandNum - 1);
	};

	CommNumModel.prototype.reset = function() {
		this.setCommandNum(0);
	};

	CommNumModel.prototype.setData = function(n) {
		this.setCommandNum(n);
	};
	
	CommNumModel.prototype.setCommandNum = function(i) {
		if(this.commandNum !== i){
			this.commandNum = i;
			this.trigger();
		}
	};
	
	return new CommNumModel();

});
	
