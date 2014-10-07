
define(['phasercomponents', 'app/views/commandpanels/abstractcommandspanel',

'app/models/modelfacade', 'app/consts/controlslayout',

'app/consts/showdirections',

'app/views/commandpanels/commandspanelfactory', 'app/views/buttons/controlbarbutton',

'app/events/events'

],

function(PhaserComponents, AbstractCommandsPanel,

ModelFacade, ControlsLayout,

ShowDirections,

CommandsPanelFactory, ControlBarButton,

Events){
	
	"use strict";
	
	var ControlsKeys  = function(options){
		PhaserComponents.Display.Container.call(this, options);
		this.eventDispatcher.addListener(PhaserComponents.Events.AppEvents.ALERT_SHOWN, this.onAlert.bind(this));
		this.modelFacade.get(ModelFacade.SCREEN).changeSignal.add(this.onScreenChanged, this);
		this.modelFacade.get(ModelFacade.PROG_TYPE).changeSignal.add(this.onScreenChanged, this);
		this.modelFacade.get(ModelFacade.ALLOW_PROG).changeSignal.add(this.onProgAllowedChanged, this);
	};

	ControlsKeys.WIDTH = 320;
	
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
		x = 16;
		y = 50 + (this.game.h - 200 - AbstractCommandsPanel.HEIGHT)/2;
		y = Math.max(y, 50);
		this.commandsPanel.view.x = x;
		this.commandsPanel.view.y = y;
	};

	ControlsKeys.prototype.positionControlBar = function() {
		var x, y;
		x = 0;
		y = this.game.h - ControlsLayout.PEN_HEIGHT - 43;
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
		model = this.modelFacade.get(ModelFacade.PROG_TYPE);
		bounds = {'x':0, 'y':0, 'w':this.bounds.w, 'h':50};
		options = {"model":model,"bounds":bounds, "numX":4, "performSelect":true, "numY":1, "buttonClass":ControlBarButton, "data":[{'num':0}, {'num':1}, {'num':2}, {'num':3}]};
		this.controlBar = new PhaserComponents.Display.TabButtonBar(options);
		this.controlBar.clickSignal.add(this.barClick, this);
		this.group.add(this.controlBar.view);
		this.controlBar.view.visible = (this.modelFacade.get(ModelFacade.ALLOW_PROG).get() === 1);
		this.positionControlBar();
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
		var bounds, type, prog;
		this.removeCommandsPanel();
		type = this.modelFacade.get(ModelFacade.SCREEN).get();
		prog = this.modelFacade.get(ModelFacade.PROG_TYPE).get();
		bounds = {'x':0, 'y':0, 'w':this.bounds.w, 'h':this.bounds.h - 50};
		this.commandsPanel = CommandsPanelFactory.make(type, prog, bounds);
		if(this.commandsPanel){
			this.group.add(this.commandsPanel.view);
			this.positionPanel();
			this.showManager.add(this.commandsPanel.view, 3, ShowDirections.LEFT, "commandsPanel");
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
		this.eventDispatcher.removeListener(PhaserComponents.Events.AppEvents.ALERT_SHOWN);
		this.modelFacade.get(ModelFacade.SCREEN).changeSignal.remove(this.onScreenChanged, this);
		this.modelFacade.get(ModelFacade.PROG_TYPE).changeSignal.remove(this.onScreenChanged, this);
		this.modelFacade.get(ModelFacade.ALLOW_PROG).changeSignal.remove(this.onProgAllowedChanged, this);
		this.removeControlBar();
		this.removeCommandsPanel();
		PhaserComponents.Display.Container.prototype.destroy.call(this);
	};
	
	return ControlsKeys;
});
	
	
