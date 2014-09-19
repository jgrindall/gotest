
define(['jquery', 'phasercomponents', 'app/views/popups/tooltip', 'app/assets'], 

function($, PhaserComponents, ToolTip, Assets){

	"use strict";
	
	var ToolTipManager  = function(){
		this.started = true;
		this.num = 0;
	};
	
	ToolTipManager.TEXT = 		["Use the arrow buttons to control the turtle", "Change the speed here", "These are the stop and undo buttons", "This button lets you choose how to program the turtle, you can program it in a number of different ways", "Start a new file, load, save and print your work"];
	ToolTipManager.POS = 		[{'x':100, 'y':10}, {'x':400, 'y':300}, {'x':200, 'y':200}, {'x':200, 'y':200}, {'x':200, 'y':200}];
	ToolTipManager.ARROW_POS = 	[0, 1, 2, 3, 4, 0];

	ToolTipManager.prototype.start = function() {
		this.open();
	};

	ToolTipManager.prototype.open = function() {
		var text, pos, arrow, options;
		text = ToolTipManager.TEXT[this.num];
		arrow = ToolTipManager.ARROW_POS[this.num];
		pos = ToolTipManager.POS[this.num];
		options = {"label":text, "sfx":Assets.SOUNDS[2], "num":this.num, "arrow":arrow};
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

	

