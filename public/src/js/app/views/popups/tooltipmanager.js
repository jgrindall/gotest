
define(['jquery', 'phasercomponents', 'app/views/popups/tooltip', 'app/assets'], 

function($, PhaserComponents, ToolTip, Assets){

	"use strict";
	
	var ToolTipManager  = function(){
		this.started = true;
		this.num = 0;
	};
	
	ToolTipManager.TEXT = ["Label0", "Label1"];
	ToolTipManager.POS = [{'x':100, 'y':10}, {'x':400, 'y':300}];

	ToolTipManager.prototype.start = function() {
		this.open();
	};

	ToolTipManager.prototype.open = function() {
		var text, pos, options;
		text = ToolTipManager.TEXT[this.num];
		pos = ToolTipManager.POS[this.num];
		options = {"title":"Message", "label":text, "sfx":Assets.SOUNDS[2]};
		PhaserComponents.AlertManager.getInstance().make(ToolTip, options, $.proxy(this.onClosed, this), pos);
	};

	ToolTipManager.prototype.onClosed = function(data) {
		if(data.index === 0){
			// close
		}
		else if(data.index === 1){
			this.num++;
			this.open();
		}
	};

	ToolTipManager.getInstance = function(){
		if(!ToolTipManager.instance){
			ToolTipManager.instance = new ToolTipManager();
		}
		return ToolTipManager.instance;
	};
	
	return ToolTipManager;

});

	

