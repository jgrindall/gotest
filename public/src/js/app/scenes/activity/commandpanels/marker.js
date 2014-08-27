
define(['app/game', 'app/components/movieclip'], function(Game, MovieClip){
	
	"use strict";
	
	var Marker = function(options){
		options.defaultFrame = 4;
		options.asset = 'markers';
		options.num = 9;
		MovieClip.call(this, options);
	};
	
	Marker.prototype = Object.create(MovieClip.prototype);
	Marker.prototype.constructor = Marker;
	
	Marker.WIDTH = 52;
	Marker.HEIGHT = 52;

	return Marker;

});

