
define('app/components/loaderbar/loaderbar',['phasercomponents'], 

	function(PhaserComponents){
	
	"use strict";
	
	var LoaderBar = function(options){
		PhaserComponents.LoaderBar.call(this, options);
	};
	
	LoaderBar.WIDTH = 500;
	LoaderBar.HEIGHT = 60;
	
	LoaderBar.prototype = Object.create(PhaserComponents.LoaderBar.prototype);
	LoaderBar.prototype.constructor = LoaderBar;
	
	LoaderBar.prototype.destroy = function(){
		PhaserComponents.LoaderBar.prototype.destroy.call(this);
	};
	
	return LoaderBar;

});

