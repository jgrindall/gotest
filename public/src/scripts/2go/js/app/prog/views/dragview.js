define(

	['phasercomponents', 'base/prog/views/abstractdragview', 'base/assets'],

	function(PhaserComponents, AbstractDragView, Assets){
	
	"use strict";

	var DragView = function(options){
		var frame, model, index = options.index;
		model = new PhaserComponents.Model.MovieClipModel();
		options.asset = Assets.DRAG_ARROW;
		if(options.turn && index === 3){
			index = 9;
		}
		else if(options.turn && index === 5){
			index = 10;
		}
		frame = options.type * 11 + index;
		model.set(frame);
		options.model = model;
		AbstractDragView.call(this, options);
	};

	PhaserComponents.Utils.extends(DragView, AbstractDragView);

	return DragView;

});

