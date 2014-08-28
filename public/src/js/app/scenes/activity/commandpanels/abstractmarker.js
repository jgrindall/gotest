
define(['app/game', 'app/components/movieclip'], function(Game, MovieClip){
	
	"use strict";
	
	var AbstractMarker = function(options){
		options.defaultFrame = 4;
		options.asset = 'markers';
		options.num = 11;
		MovieClip.call(this, options);
		this.sprite.alpha = 0.6;
	};
	
	AbstractMarker.prototype = Object.create(MovieClip.prototype);
	AbstractMarker.prototype.constructor = AbstractMarker;
	
	AbstractMarker.WIDTH = 50;
	AbstractMarker.HEIGHT = 50;

	return AbstractMarker;

});

