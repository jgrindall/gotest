define(

	['phasercomponents', 'app/prog/abstractdragview', 'app/assets'],

	function(PhaserComponents, AbstractDragView, Assets){
	
	"use strict";

	var DragView = function(options){
		var frame0, index = options.index;
		options.asset = Assets.DRAG_ARROW;
		if(options.turn && index === 3){
			index = 9;
		}
		else if(options.turn && index === 5){
			index = 10;
		}
		frame0 = options.type * 11 + index;
		options.defaultFrame = frame0;
		AbstractDragView.call(this, options);
	};

	PhaserComponents.Utils.extends(DragView, AbstractDragView);

	return DragView;

});

