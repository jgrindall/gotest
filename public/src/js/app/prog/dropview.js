define('app/prog/dropview', ['phasercomponents', 'app/assets'],

	function(PhaserComponents, Assets){

	var DropView = function(options){
		options.asset = Assets.DRAG_TARGET;
		options.numFrames = 2;
		PhaserComponents.Drag.AbstractDropView.call(this, options);
	};

	DropView.prototype = Object.create(PhaserComponents.Drag.AbstractDropView.prototype);
	DropView.prototype.constructor = DropView;

	DropView.prototype.highlight = function(show){
		var frame;
		if(show){
			frame = 1;
		}
		else{
			frame = 0;
		}
		this.goTo(frame);
	};

	return DropView;
});

