
define(['phasercomponents', 'app/views/commandpanels/abstractcommandspanel',

'app/consts/controlslayout',

'app/consts/showdirections',

'app/views/commandpanels/commandspanelfactory', 'app/views/buttons/controlbarbutton',

'app/events/events', 'app/models/modelconsts', 'app/views/components/controlbar'

],

function(PhaserComponents, AbstractCommandsPanel,

ControlsLayout,

ShowDirections,

CommandsPanelFactory, ControlBarButton,

Events, ModelConsts, ControlBar){
	
	"use strict";
	
	var ControlsKeys  = function(options){
		PhaserComponents.Display.Container.call(this, options);
		this.alertHandler = this.onAlert.bind(this);
		this.eventDispatcher.addListener(PhaserComponents.Events.AppEvents.ALERT_SHOWN, this.alertHandler);
		this.modelFacade.get(ModelConsts.SCREEN).changeSignal.add(this.onScreenChanged, this);
		this.modelFacade.get(ModelConsts.PROG_TYPE).changeSignal.add(this.onScreenChanged, this);
		this.modelFacade.get(ModelConsts.ALLOW_PROG).changeSignal.add(this.onProgAllowedChanged, this);
	};
	
	ControlsKeys.TOP_PADDING = 47;
	ControlsKeys.BOTTOM_PADDING = 220;

	PhaserComponents.Utils.extends(ControlsKeys, PhaserComponents.Display.Container);

	ControlsKeys.prototype.create = function() {
		PhaserComponents.Display.Container.prototype.create.call(this);
		this.addControlBar();
		this.addCommandsPanel();
	};

	ControlsKeys.prototype.onProgAllowedChanged = function(value) {
		if(this.controlBar){
			this.controlBar.view.visible = (value === 1);
		}
	};
	
	ControlsKeys.prototype.positionPanel = function() {
		var x, y;
		if(this.commandsPanel){
			x = 0;
			y = ControlsKeys.TOP_PADDING + (this.game.h - ControlsKeys.BOTTOM_PADDING - AbstractCommandsPanel.HEIGHT)/2;
			y = Math.max(y, ControlsKeys.TOP_PADDING);
			this.commandsPanel.bounds.w = this.bounds.w;
			this.commandsPanel.view.x = x;
			this.commandsPanel.view.y = y;
			this.commandsPanel.onResize();
		}
	};

	ControlsKeys.prototype.positionControlBar = function() {
		var x, y;
		x = (this.bounds.w - ControlBar.WIDTH)/2;
		y = this.game.h - ControlsLayout.PEN_HEIGHT - 89;
		this.controlBar.view.x = x;
		this.controlBar.view.y = y;
	};

	ControlsKeys.prototype.onResize = function() {
		this.positionControlBar();
		this.positionPanel();
	};

	ControlsKeys.prototype.onScreenChanged = function() {
		this.addCommandsPanel();
	};
	
	ControlsKeys.prototype.onAlert = function(event, data) {
		if(data.shown){
			this.disableInput();
		}
		else{
			this.enableInput();
		}
	};
	
	ControlsKeys.prototype.disableInput = function() {
		if(this.commandsPanel){
			this.commandsPanel.disableInput();
		}
		if(this.controlBar){
			this.controlBar.disableInput();
		}
	};
	
	ControlsKeys.prototype.enableInput = function() {
		if(this.commandsPanel){
			this.commandsPanel.enableInput();
		}
		if(this.controlBar){
			this.controlBar.enableInput();
		}
	};

	ControlsKeys.prototype.addControlBar = function() {
		var options, bounds, model;
		model = this.modelFacade.get(ModelConsts.PROG_TYPE);
		bounds = {'x':0, 'y':0, 'w':ControlBar.WIDTH, 'h':ControlBar.HEIGHT};
		options = {"model":model,"bounds":bounds, "numX":4, "performSelect":true, "numY":1, "buttonClass":ControlBarButton, "data":[{'num':0}, {'num':1}, {'num':2}, {'num':3}]};
		this.controlBar = new ControlBar(options);
		this.controlBar.clickSignal.add(this.barClick, this);
		this.group.add(this.controlBar.view);
		this.controlBar.view.visible = (this.modelFacade.get(ModelConsts.ALLOW_PROG).get() === 1);
		this.positionControlBar();
		this.group.bringToTop(this.controlBar.view);
		this.showManager.add(this.controlBar.view, 3, ShowDirections.UP);
	};

	ControlsKeys.prototype.barClick = function(data) {
		var val = data.index;
		this.eventDispatcher.trigger({"type":Events.PROG_CHANGE, "data":{"value":val}});
	};
	
	ControlsKeys.prototype.removeCommandsPanel = function() {
		if(this.commandsPanel){
			this.group.remove(this.commandsPanel.view);
			this.commandsPanel.destroy();
			this.commandsPanel = null;
		}
	};

	ControlsKeys.prototype.addCommandsPanel = function() {
		var bounds, type, prog, surrounds;
		this.removeCommandsPanel();
		surrounds = 180;
		type = this.modelFacade.get(ModelConsts.SCREEN).get();
		prog = this.modelFacade.get(ModelConsts.PROG_TYPE).get();
		bounds = {'x':0, 'y':0, 'w':this.bounds.w, 'h':this.bounds.h - surrounds};
		this.commandsPanel = CommandsPanelFactory.make(type, prog, bounds);
		if(this.commandsPanel){
			this.group.add(this.commandsPanel.view);
			this.positionPanel();
			this.showManager.add(this.commandsPanel.view, 3, ShowDirections.LEFT, "commandsPanel");
			if(this.controlBar){
				this.group.bringToTop(this.controlBar.view);
			}
		}
	};

	ControlsKeys.prototype.removeControlBar = function(){
		if(this.controlBar){
			this.group.remove(this.controlBar.view);
			this.controlBar.clickSignal.remove(this.barClick, this);
			this.controlBar.destroy();
			this.controlBar = null;
		}
	};

	ControlsKeys.prototype.destroy = function() {
		this.eventDispatcher.removeListener(PhaserComponents.Events.AppEvents.ALERT_SHOWN, this.alertHandler);
		this.alertHandler = null;
		this.modelFacade.get(ModelConsts.SCREEN).changeSignal.remove(this.onScreenChanged, this);
		this.modelFacade.get(ModelConsts.PROG_TYPE).changeSignal.remove(this.onScreenChanged, this);
		this.modelFacade.get(ModelConsts.ALLOW_PROG).changeSignal.remove(this.onProgAllowedChanged, this);
		this.removeControlBar();
		this.removeCommandsPanel();
		PhaserComponents.Display.Container.prototype.destroy.call(this);
	};
	
	return ControlsKeys;
});
	
	
