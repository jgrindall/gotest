
define(['app/views/commandpanels/markers/markertypes',

'app/views/commandpanels/markers/marker',

'app/views/commandpanels/markers/turnmarker'

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
