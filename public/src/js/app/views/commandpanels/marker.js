
define('app/views/commandpanels/marker',['app/views/commandpanels/abstractmarker'], function(AbstractMarker){
	
	"use strict";
	
	var Marker = function(options){
		AbstractMarker.call(this, options);
	};
	
	Marker.prototype = Object.create(AbstractMarker.prototype);
	Marker.prototype.constructor = Marker;

	return Marker;

});

