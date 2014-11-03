

define(['app/consts/canvaslayout',

	'app/consts/controlslayout', 'phasercomponents'],

function(CanvasLayout,

	ControlsLayout, PhaserComponents){
	
	"use strict";
	
	var MainViewLayout  = function(){
		
	};
	
	MainViewLayout.TOP_PADDING = 50;
	MainViewLayout.BOTTOM_PADDING = 40;

	MainViewLayout.getCanvasPos = function(gameWidth, gameHeight){
		var w, h, x, y, scale, data;
		scale = MainViewLayout.getCanvasScale(gameWidth, gameHeight);
		w = CanvasLayout.REF_WIDTH * scale;
		h = CanvasLayout.REF_HEIGHT * scale;
		x = (gameWidth - ControlsLayout.MIN_WIDTH - w)/2;
		y = MainViewLayout.TOP_PADDING + (gameHeight - h - MainViewLayout.TOP_PADDING - MainViewLayout.BOTTOM_PADDING)/2;
		data = {'x':x, 'y':y, 'scale':scale};
		return data;
	};

	MainViewLayout.getCanvasScale = function(gameWidth, gameHeight){
		var rect, size, scale, ratio;
		ratio = CanvasLayout.REF_WIDTH/CanvasLayout.REF_HEIGHT;
		rect = {"w":gameWidth - ControlsLayout.MIN_WIDTH, "h":gameHeight - MainViewLayout.TOP_PADDING - MainViewLayout.BOTTOM_PADDING};
		size = PhaserComponents.Utils.fitRect(rect, ratio);
		scale = size.w / CanvasLayout.REF_WIDTH;
		return Math.max(scale, 0.1);
	};

	return MainViewLayout;

});
	
	



