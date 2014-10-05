
define(['phasercomponents',

'app/events/events', 'app/views/popups/tooltipmanager', 'app/views/mainview', 'app/views/popups/ipad'],

function(PhaserComponents,

Events, ToolTipManager, MainView, IPad){
	
	"use strict";
	
	var ActivityScene  = function(){
		PhaserComponents.Scene.call(this);
	};
	
	PhaserComponents.Utils.extends(ActivityScene, PhaserComponents.Scene);

	ActivityScene.prototype.create = function() {
		this.addMain();
		this.startScene();
		this.eventDispatcher.addListener(PhaserComponents.Events.AppEvents.RESIZE, this.onResize.bind(this));
		this.eventDispatcher.addListener(PhaserComponents.Events.AppEvents.ORIENT, this.onOrient.bind(this));
		this.eventDispatcher.addListener(Events.IMG_CAPTURED, this.onImgCaptured.bind(this));
		this.checkDevice();
	};

	ActivityScene.prototype.startScene = function(){
		this.eventDispatcher.trigger({"type":Events.STARTUP});
	};

	ActivityScene.prototype.onImgCaptured = function(event, obj){
		this.mainView.addImg(obj.data);
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
		this.mainView.onResize();
		this.removeIPad();
		this.checkDevice();
	};
	
	ActivityScene.prototype.checkDevice = function() {
		var incorrect = PhaserComponents.Utils.deviceIsIncorrectSize();
		if(incorrect){
			this.showIPad();
		}
		else{
			this.removeIPad();
		}
	};
	
	ActivityScene.prototype.showIPad = function() {
		if(!this.ipad){
			this.ipad = new IPad({"bounds":this.bounds});
			this.world.add(this.ipad.view);
			this.eventDispatcher.trigger({"type":PhaserComponents.Events.AppEvents.ALERT_SHOWN, "shown":true});
		}
	};

	ActivityScene.prototype.removeIPad = function() {
		if(this.ipad){
			this.eventDispatcher.trigger({"type":PhaserComponents.Events.AppEvents.ALERT_SHOWN, "shown":false});
			this.world.remove(this.ipad.view);
			this.ipad.destroy();
			this.ipad = null;
		}
	};

	ActivityScene.prototype.onOrient = function() {
		this.checkDevice();
	};

	ActivityScene.prototype.destroy = function() {
		clearTimeout(this.toolTipTimeout);
		this.eventDispatcher.removeListener(PhaserComponents.Events.AppEvents.RESIZE);
		this.eventDispatcher.removeListener(PhaserComponents.Events.AppEvents.ORIENT);
		this.eventDispatcher.removeListener(Events.IMG_CAPTURED);
		this.removeMain();
		this.removeIPad();
	};

	ActivityScene.prototype.shutdown = function() {
		PhaserComponents.Scene.prototype.shutdown.apply(this, arguments);
		this.destroy();
	};
	
	return ActivityScene;

});
	
	



