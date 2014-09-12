
define(

	['app/views/commandpanels/abstractmarker', 'phasercomponents'],

	function(AbstractMarker, PhaserComponents){
	
	"use strict";
	
	var Marker = function(options){
		AbstractMarker.call(this, options);
	};
	
	PhaserComponents.Utils.extends(Marker, AbstractMarker);

	return Marker;

});

