
define(['jquery', 'app/models/modelfacade', 'phasercomponents',

'app/events/events', 'app/views/popups/tooltipmanager', 'app/views/mainview'],

function($, ModelFacade, PhaserComponents,

Events, ToolTipManager, MainView){
	
	"use strict";
	
	var ActivityScene  = function(){
		PhaserComponents.Scene.call(this);
	};
	
	PhaserComponents.Utils.extends(ActivityScene, PhaserComponents.Scene);

	ActivityScene.prototype.create = function() {
		this.addMain();
		this.init();
		this.toolTipTimeout = setTimeout(this.openToolTips.bind(this), 300);
		this.eventDispatcher.addListener(PhaserComponents.Events.AppEvents.RESIZE, this.onResize.bind(this));
	};

	ActivityScene.prototype.init = function(){
		this.eventDispatcher.trigger({"type":Events.STARTUP});
		this.eventDispatcher.trigger({"type":Events.REPLAY});
		this.eventDispatcher.trigger({"type":Events.ENTER_FS});
	};

	ActivityScene.prototype.addMain = function(){
		var bounds;
		bounds = {'x':0, 'y':0, 'w':this.game.w, 'h':this.game.h};
		this.mainView = new MainView({"bounds":bounds});
		this.world.add(this.mainView.view);
	};

	ActivityScene.prototype.openToolTips = function(){
		ToolTipManager.getInstance().start(this.game.w, this.game.h);
	};

	ActivityScene.prototype.removeCanvas = function() {
		if(this.mainView){
			this.world.remove(this.mainView.view);
			this.mainView.destroy();
			this.mainView = null;
		}
	};

	ActivityScene.prototype.onResize = function() {
		this.eventDispatcher.trigger({"type":Events.REWIND});
		this.mainView.onResize();
		this.eventDispatcher.trigger({"type":Events.REPLAY});
	};

	ActivityScene.prototype.destroy = function() {
		clearTimeout(this.toolTipTimeout);
		this.removeMain();
	};

	ActivityScene.prototype.shutdown = function() {
		PhaserComponents.Scene.prototype.shutdown.apply(this, arguments);
		this.destroy();
	};
	
	return ActivityScene;

});
	
	



