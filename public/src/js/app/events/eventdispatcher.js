define('app/events/eventdispatcher',['zepto'],

function($) {
	
	/* A simple event aggregator */

	"use strict";
	
	var EventDispatcher = function(){
		this.el = $(document);
	};
	
	EventDispatcher.prototype.addListener = function(name, method) {
		if(!name || !method){
			throw "No eventName/method";
		}
		this.el.on(name, method);
	};

	EventDispatcher.prototype.addOnce = function(name, method) {
		if(!name || !method){
			throw "No eventName/method";
		}
		this.el.once(name, method);
	};

	EventDispatcher.prototype.removeListener = function(name, method) {
		if(!name || !method){
			throw "No eventName/method";
		}
		this.el.off(name, method);
	};

	EventDispatcher.prototype.trigger = function(eventObj) {
		if(!eventObj || !eventObj.type){
			throw "No eventName";
		}
		else{
			this.el.trigger(eventObj.type, eventObj);
		}
	};

  	return new EventDispatcher();
});




