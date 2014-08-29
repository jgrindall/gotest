
define(['app/game', 

'app/views/commandpanels/markertypes',

'app/views/commandpanels/marker',

'app/views/commandpanels/turnmarker'

],

function(Game, MarkerTypes,

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
