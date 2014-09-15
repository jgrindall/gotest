define('app/prog/dragview',

	['phasercomponents', 'app/prog/abstractdragview', 'app/assets'],

	function(PhaserComponents, AbstractDragView, Assets){
	
	"use strict";

	var DragView = function(options){
		options.asset = Assets.DRAG_ARROW;
		options.defaultFrame = options.index;
		AbstractDragView.call(this, options);
	};

	PhaserComponents.Utils.extends(DragView, AbstractDragView);

	return DragView;

});

