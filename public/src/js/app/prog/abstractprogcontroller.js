define( [],

	function(){
	
	"use strict";

	var AbstractProgController = function(parent){
		this.parent = parent;
		this.model = parent.model;
	};

	AbstractProgController.prototype.destroy = function(){
		this.parent = null;
		this.model = null;
	};

	return AbstractProgController;
});
