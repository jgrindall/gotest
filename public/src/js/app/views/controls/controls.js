
define(['phasercomponents',

'app/views/controls/controlskeys',

'app/views/controls/controlspens',

'app/consts/showdirections'

],

function(PhaserComponents, 

ControlsKeys, ControlsPens, ShowDirections){
	
	"use strict";
	
	var Controls  = function(options){
		PhaserComponents.Display.Container.call(this, options);
	};

	Controls.MIN_WIDTH = 280;
	
	PhaserComponents.Utils.extends(Controls, PhaserComponents.Display.Container);

	Controls.prototype.create = function() {
		PhaserComponents.Display.Container.prototype.create.call(this);
		this.addKeys();
		this.addPens();
	};

	Controls.prototype.addKeys = function() {
		var bounds = this.bounds;
		this.keys = new ControlsKeys({"bounds":bounds});
		this.group.add(this.keys.view);
	};

	Controls.prototype.removeKeys = function(){
		if(this.keys){
			this.group.remove(this.keys.view);
			this.keys.destroy();
			this.keys = null;
		}
	};

	Controls.prototype.onResize = function() {
		this.pens.onResize();
		this.keys.onResize();
	};

	Controls.prototype.addPens = function() {
		var bounds = this.bounds;
		this.pens = new ControlsPens({"bounds":bounds});
		this.group.add(this.pens.view);
		this.showManager.add(this.pens.view, 4, ShowDirections.UP);
	};

	Controls.prototype.removePens = function(){
		if(this.pens){
			this.group.remove(this.pens.view);
			this.pens.destroy();
			this.pens = null;
		}
	};

	Controls.prototype.destroy = function() {
		this.removeKeys();
		this.removePens();
		PhaserComponents.Display.Container.prototype.destroy.call(this);
	};
	
	return Controls;
});
	
	
