
define(['base/views/commandpanels/markers/markertypes',

'base/views/commandpanels/markers/marker',

'base/views/commandpanels/markers/turnmarker'

],

function(MarkerTypes,

Marker, TurnMarker){
	
	"use strict";
	
	var MarkerFactory  = function(){
		
	};
	
	MarkerFactory.make = function(type, options) {
		if(type === MarkerTypes.ARROW){
			return new Marker(options);
		}
		else{
			return new TurnMarker(options);
		}
	};
	
	return MarkerFactory;

});
