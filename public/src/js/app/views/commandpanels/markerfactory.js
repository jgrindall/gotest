
define('app/views/commandpanels/markerfactory',['app/views/commandpanels/markertypes',

'app/views/commandpanels/marker',

'app/views/commandpanels/turnmarker'

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
