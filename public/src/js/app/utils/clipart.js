
define(['app/utils/localclipartadapter'],

	function(LocalClipartAdapter){
	
		"use strict";
		
		var Clipart = function(){
			this.adapter = new LocalClipartAdapter();
		};
		
		Clipart.prototype.setAdapter = function(adapter){
			this.adapter = adapter;
		};

		Clipart.prototype.openBg = function(options){
			this.adapter.openBg(options);
		};

		Clipart.prototype.openTurtle = function(options){
			this.adapter.openTurtle(options);
		};

		return Clipart;

	}
);

