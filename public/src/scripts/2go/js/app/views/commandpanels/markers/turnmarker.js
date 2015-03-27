
define(['base/views/commandpanels/abstractmarker', 'phasercomponents'],

	function(AbstractMarker, PhaserComponents){
	
	"use strict";
	
	var TurnMarker = function(options){
		AbstractMarker.call(this, options);
	};
	
	PhaserComponents.Utils.extends(TurnMarker, AbstractMarker);

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

