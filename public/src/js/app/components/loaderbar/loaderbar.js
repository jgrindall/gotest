
define('app/components/loaderbar/loaderbar',['phasercomponents'], 

	function(PhaserComponents){
	
	"use strict";
	
	var LoaderBar = function(options){
		PhaserComponents.Display.LoaderBar.call(this, options);
	};
	
	LoaderBar.WIDTH = 500;
	LoaderBar.HEIGHT = 60;
	
	PhaserComponents.Utils.extends(LoaderBar, PhaserComponents.Display.LoaderBar);

	LoaderBar.prototype.destroy = function(){
		PhaserComponents.Display.LoaderBar.prototype.destroy.call(this);
	};
	
	return LoaderBar;

});

