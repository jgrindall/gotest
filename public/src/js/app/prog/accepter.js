define( ['phasercomponents'], function(PhaserComponents){
	
	"use strict";

	var Accepter = function(data){
		PhaserComponents.Drag.AbstractAccepter.call(this, data);
	};

	Accepter.prototype = Object.create(PhaserComponents.Drag.AbstractAccepter.prototype);
	Accepter.prototype.constructor = Accepter;

	Accepter.prototype.willAccept = function(view){
		var accept = (this.data.indexOf(view.options.type) >= 0);
		return accept;
	};

	return Accepter;
});

