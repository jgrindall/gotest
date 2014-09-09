
define('app/views/loaderbar/loaderbar',['phasercomponents'], 

	function(PhaserComponents){
	
	"use strict";
	
	var LoaderBar = function(options){
		PhaserComponents.Display.LoaderBar.call(this, options);
	};
	
	LoaderBar.WIDTH = 350;
	LoaderBar.HEIGHT = 30;
	
	PhaserComponents.Utils.extends(LoaderBar, PhaserComponents.Display.LoaderBar);

	LoaderBar.prototype.destroy = function(){
		PhaserComponents.Display.LoaderBar.prototype.destroy.call(this);
	};

	LoaderBar.prototype.create = function(){
		PhaserComponents.Display.LoaderBar.prototype.create.call(this);
	};
	
	return LoaderBar;

});

