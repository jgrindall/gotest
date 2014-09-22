
define(['jquery', 'phasercomponents', 'app/views/popups/tooltip', 'app/assets'], 

function($, PhaserComponents, ToolTip, Assets){

	"use strict";
	
	var ToolTipManager  = function(){
		this.started = true;
		this.num = 0;
	};
	
	ToolTipManager.TEXT = 		["Welcome to 2Go!\n\nUse the arrow buttons\nto control the turtle", "Change the speed here", "These are the stop and\nundo buttons", "This button lets you choose\nhow to program the turtle.", "Start a new file, load,\nsave and print your work"];
	ToolTipManager.ARROW_POS = 	[1, 0, 1, 1, 2, 4];
	ToolTipManager.NUM = 		5;
	ToolTipManager.DX = 		[0, 0, 0, -20, 30];

	ToolTipManager.prototype.start = function(w, h) {
		w -= ToolTip.WIDTH;
		ToolTipManager.pos = [];
		ToolTipManager.pos.push({'x':w - 260, 	'y':90});
		ToolTipManager.pos.push({'x':w/2, 		'y':60});
		ToolTipManager.pos.push({'x':w - 240, 	'y':10});
		ToolTipManager.pos.push({'x':w - 120, 	'y':10});
		ToolTipManager.pos.push({'x':240, 		'y':10});
		this.open();
	};

	ToolTipManager.prototype.open = function() {
		var text, pos, arrow, options;
		text = ToolTipManager.TEXT[this.num];
		arrow = ToolTipManager.ARROW_POS[this.num];
		pos = ToolTipManager.pos[this.num];
		options = {"label":text, "sfx":Assets.SOUNDS[2], "end":(this.num === ToolTipManager.NUM - 1), "num":this.num, "arrow":arrow, "dx":ToolTipManager.DX[this.num]};
		PhaserComponents.AlertManager.getInstance().make(ToolTip, options, $.proxy(this.onClosed, this), pos);
	};

	ToolTipManager.prototype.onClosed = function(data) {
		if(data.index === 0){
			// close
		}
		else if(data.index === 1){
			this.num++;
			if(this.num === ToolTipManager.NUM){
				//close
			}
			else{
				this.open();
			}
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

	

