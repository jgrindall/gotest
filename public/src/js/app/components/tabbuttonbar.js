
define(['jquery', 'app/components/buttonbar', 'app/game', 'app/components/container'],

function($, ButtonBar, Game, Container){
	
	"use strict";
	
	var TabButtonBar = function(options){
		ButtonBar.call(this, options);
	};
	
	TabButtonBar.prototype = Object.create(ButtonBar.prototype);
	TabButtonBar.prototype.constructor = TabButtonBar;
	
	TabButtonBar.prototype.create = function(){
		ButtonBar.prototype.create.call(this);
		this.setSelected(0);
	};
	
	return TabButtonBar;
	
});

