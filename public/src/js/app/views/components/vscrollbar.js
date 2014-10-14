
define(['phasercomponents',

	'app/assets', 'app/models/modelconsts'

],

function(PhaserComponents, 


 Assets, ModelConsts){
	
	"use strict";
	
	var VScrollBar  = function(options){
		PhaserComponents.Display.InteractiveSprite.call(this, options);
	};
	
	VScrollBar.WIDTH = 20;
	VScrollBar.HEIGHT = 100;

	PhaserComponents.Utils.extends(VScrollBar, PhaserComponents.Display.InteractiveSprite);
	
	VScrollBar.prototype.create = function(){
		PhaserComponents.Display.InteractiveSprite.prototype.create.call(this);
		this.scrollPos = 0;
		this.resize(VScrollBar.HEIGHT);
		this.hide();
	};

	VScrollBar.prototype.hide = function(y){
		this.disableInput();
		this.view.visible = false;
	};

	VScrollBar.prototype.show = function(y){
		this.enableInput();
		this.view.visible = true;
	};

	VScrollBar.prototype.moveTo = function(y){
		this.sprite.y = y;
		this.scrollPos = y;
	};
	
	VScrollBar.prototype.resize = function(h){
		var scale = h/VScrollBar.HEIGHT;
		this.sprite.scale = {'x':1, 'y':scale};
	};

	VScrollBar.prototype.destroy = function(){
		PhaserComponents.Display.InteractiveSprite.prototype.destroy.call(this);
	};

	return VScrollBar;
});
	

