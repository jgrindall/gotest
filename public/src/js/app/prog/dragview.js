define('app/prog/dragview',

	['phasercomponents', 'app/prog/abstractdragview', 'app/assets'],

	function(PhaserComponents, AbstractDragView, Assets){
	
	"use strict";

	var DragView = function(options){
		var frame0;
		options.asset = Assets.DRAG_ARROW;
		frame0 = options.type * 10 + options.index;
		options.defaultFrame = frame0;
		AbstractDragView.call(this, options);
	};

	PhaserComponents.Utils.extends(DragView, AbstractDragView);

	return DragView;

});

