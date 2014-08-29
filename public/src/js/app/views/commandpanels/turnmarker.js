
define(['app/game', 'app/views/commandpanels/abstractmarker'], function(Game, AbstractMarker){
	
	"use strict";
	
	var TurnMarker = function(options){
		AbstractMarker.call(this, options);
	};
	
	TurnMarker.prototype = Object.create(AbstractMarker.prototype);
	TurnMarker.prototype.constructor = TurnMarker;

	TurnMarker.prototype.goTo = function(i){
		var j = i;
		if(i === 3){
			j = 9;
		}
		else if(i === 5){
			j = 10;
		}
		AbstractMarker.prototype.goTo.call(this, j);
	};
	
	return TurnMarker;

});

