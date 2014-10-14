define(

	['phasercomponents', 'app/views/buttons/dragbutton', 'app/assets',

	'app/prog/views/dragview', 'app/prog/accepter', 'app/consts/commandpaneltypes',

	'app/views/commandpanels/abstractcommandspanel', 'app/views/buttons/closebutton',

	'app/views/buttons/playbutton', 'app/views/buttons/stopbutton', 'app/events/events', 

	'app/prog/controller/progcontrollerfactory', 'app/prog/controller/playcontrollerfactory',

	'app/consts/playingstate', 'app/models/modelconsts'],

	function(PhaserComponents, DragButton, Assets,

		DragView, Accepter, CommandPanelTypes, 

		AbstractCommandsPanel, CloseButton,

		PlayButton, StopButton, Events,

		ProgControllerFactory, PlayControllerFactory,

		PlayingState, ModelConsts){
	
	"use strict";

	var ProgGfx = function(options){
		PhaserComponents.Display.Container.call(this, options);
	};

	PhaserComponents.Utils.extends(ProgGfx, PhaserComponents.Display.Container);

	ProgGfx.prototype.create = function() {
		PhaserComponents.Display.Container.prototype.create.call(this);
	};

	ProgGfx.prototype.destroy = function() {
		
	};

	return ProgGfx;
});



