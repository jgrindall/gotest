
define(['phasercomponents',

'app/views/popups/ipad'],

function(PhaserComponents, IPad){
	
	"use strict";
	
	var InteractiveScene  = function(){
		PhaserComponents.Scene.call(this);
	};
	
	PhaserComponents.Utils.extends(InteractiveScene, PhaserComponents.Scene);

	InteractiveScene.prototype.preload = function() {
		PhaserComponents.Scene.prototype.preload.apply(this);
	};

	InteractiveScene.prototype.create = function(){
		this.addMain();
		this.addListeners();
		this.checkDevice();
		this.startScene();
	};

	InteractiveScene.prototype.addListeners = function(){
		this.resizeHandler = this.onResize.bind(this);
		this.orientHandler = this.onOrient.bind(this);
		this.eventDispatcher.addListener(PhaserComponents.Events.AppEvents.RESIZE, this.resizeHandler);
		this.eventDispatcher.addListener(PhaserComponents.Events.AppEvents.ORIENT, this.orientHandler);
	};

	InteractiveScene.prototype.startScene = function(){
		
	};

	InteractiveScene.prototype.addMain = function(){
		
	};

	InteractiveScene.prototype.onResize = function() {
		this.mainView.onResize();
		this.removeIPad();
		this.checkDevice();
	};
	
	InteractiveScene.prototype.checkDevice = function() {
		var incorrect = PhaserComponents.Utils.deviceIsIncorrectSize();
		if(incorrect){
			this.showIPad();
		}
		else{
			this.removeIPad();
		}
	};

	InteractiveScene.prototype.showIPad = function() {
		if(!this.ipad){
			this.ipad = new IPad({"bounds":this.bounds});
			this.group.add(this.ipad.view);
			this.eventDispatcher.trigger({"type":PhaserComponents.Events.AppEvents.ALERT_SHOWN, "shown":true});
		}
	};

	InteractiveScene.prototype.removeIPad = function() {
		if(this.ipad){
			this.eventDispatcher.trigger({"type":PhaserComponents.Events.AppEvents.ALERT_SHOWN, "shown":false});
			this.group.remove(this.ipad.view);
			this.ipad.destroy();
			this.ipad = null;
		}
	};

	InteractiveScene.prototype.onOrient = function() {
		this.mainView.onOrient();
		this.removeIPad();
		this.checkDevice();
	};

	InteractiveScene.prototype.removeMain = function() {
		if(this.mainView){
			this.group.remove(this.mainView.view);
			this.mainView.destroy();
			this.mainView = null;
		}
	};

	InteractiveScene.prototype.destroy = function() {
		this.eventDispatcher.removeListener(PhaserComponents.Events.AppEvents.RESIZE, this.resizeHandler);
		this.eventDispatcher.removeListener(PhaserComponents.Events.AppEvents.ORIENT, this.orientHandler);
		this.resizeHandler = null;
		this.orientHandler = null;
		this.removeMain();
		this.removeIPad();
	};

	InteractiveScene.prototype.shutdown = function() {
		PhaserComponents.Scene.prototype.shutdown.apply(this, arguments);
		this.destroy();
	};
	
	return InteractiveScene;

});
	
	



