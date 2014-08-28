
define(['app/game', 'app/scenes/activity/commandpanels/abstractmarker'], function(Game, AbstractMarker){
	
	"use strict";
	
	var Marker = function(options){
		AbstractMarker.call(this, options);
	};
	
	Marker.prototype = Object.create(AbstractMarker.prototype);
	Marker.prototype.constructor = Marker;

	return Marker;

});

