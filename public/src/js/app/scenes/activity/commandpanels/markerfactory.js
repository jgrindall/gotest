
define(['app/game', 

'app/scenes/activity/commandpanels/markertypes',

'app/scenes/activity/commandpanels/marker',

'app/scenes/activity/commandpanels/turnmarker'

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
