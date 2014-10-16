define(

	['phasercomponents', 

	'app/prog/views/dragview', 'app/prog/accepter', 'app/views/commandpanels/abstractcommandspanel',

	'app/prog/progbuttons', 'app/prog/progdragcontainer',

	'app/prog/controller/playcontrollerfactory', 

	'app/consts/playingstate', 'app/models/modelconsts'],

	function(PhaserComponents, 

		DragView, Accepter, AbstractCommandsPanel,

		ProgButtons, ProgDragContainer,

		PlayControllerFactory, 

		PlayingState, ModelConsts){
	
	"use strict";

	var ProgCommandPanel = function(options){
		options.model = new PhaserComponents.Drag.DragModel();
		AbstractCommandsPanel.call(this, options);
		this.modelFacade.get(ModelConsts.PLAYING).changeSignal.add(this.playingChanged, this);
		this.modelFacade.get(ModelConsts.PROG).changeSignal.add(this.load, this);
	};

	PhaserComponents.Utils.extends(ProgCommandPanel, AbstractCommandsPanel);

	ProgCommandPanel.prototype.playingChanged = function(value){
		if(value === PlayingState.PLAYING){
			this.disableInput();
		}
		else if(value=== PlayingState.NOT_PLAYING){
			this.enableInput();
		}
	};

	ProgCommandPanel.prototype.clickButton = function(data){
		var type, index, drag, turn;
		type = data.target.options.type;
		index = data.target.options.index;
		turn = data.target.options.turn;
		if(this.dragManager && this.dragManager.enabled){
			drag = this.addDrag(type, index, turn, {'x':data.target.view.x, 'y':data.target.view.y});
			this.dragManager.startDrag(drag);
		}
	};

	ProgCommandPanel.prototype.positionButtons = function(){
		var availableWidth = this.bounds.w - ProgDragContainer.WIDTH - ProgButtons.WIDTH;
		this.progButtons.view.x = 4 + availableWidth/3;
	};

	ProgCommandPanel.prototype.positionDrag = function(){
		var availableWidth = this.bounds.w - ProgDragContainer.WIDTH - ProgButtons.WIDTH;
		this.dragContainer.view.x = ProgButtons.WIDTH + 2*availableWidth/3;
	};

	ProgCommandPanel.prototype.onResize = function(){
		this.positionButtons();
		this.positionDrag();
	};

	ProgCommandPanel.prototype.disableInput = function(){
		this.dragManager.disableInput();
		this.dragContainer.disableInput();
	};
	
	ProgCommandPanel.prototype.enableInput = function(){
		this.dragManager.enableInput();
		this.dragContainer.enableInput();
	};

	ProgCommandPanel.prototype.addDrag = function(type, index, turn, bounds){
		bounds = bounds || {'x':0, 'y':0};
		bounds.x -= this.dragContainer.view.x;
		bounds.x += this.progButtons.view.x;
		bounds.y -= this.dragContainer.view.y;
		var drag = new DragView({"type":type, "turn":turn, "index":index, 'bounds':bounds});
		this.dragContainer.addDrag(drag);
		this.dragManager.addDrag(drag);
		return drag;
	};

	ProgCommandPanel.prototype.load = function(){
		var json, i, j, obj, drag, numTargets, objAllowed;
		if(this.dragManager){
			this.dragManager.clear();
		}
		json = this.modelFacade.get(ModelConsts.PROG).get();
		numTargets = Math.min(json.length, this.options.targetObj.constructor.NUM);
		for(i = 0; i < numTargets; i++){
			for(j = 0; j < json[i].length; j++){
				obj = json[i][j];
				objAllowed = this.progButtons.objAllowed(obj);
				if(objAllowed){
					drag = this.addDrag(objAllowed.type, objAllowed.index, objAllowed.turn);
					this.dragManager.snapTo(drag, i, j);
				}
			}
		}
		this.onEdited();
	};

	ProgCommandPanel.prototype.initDrag = function(){
		var i, j, hitZones, hitZone, hitZoneRow, h;
		hitZones = this.options.hitzones;
		for(i = 0; i < hitZones.length; i++){
			hitZone = hitZones[i];
			h = [];
			for(j = 0; j < hitZone.length; j++){
				h.push(new PhaserComponents.Drag.HitZone(new Accepter(hitZone[j].accept), hitZone[j].bounds));
			}
			hitZoneRow = new PhaserComponents.Drag.HitZoneRow(h);
			this.dragManager.addTarget(this.dragContainer.targets[i], hitZoneRow); 
		}
	};
	
	ProgCommandPanel.prototype.onClear = function(){
		if(this.dragManager){
			this.dragManager.clear();
		}
		this.onEdited();
	};

	ProgCommandPanel.prototype.create = function() {
		AbstractCommandsPanel.prototype.create.call(this);
		this.progButtons = new ProgButtons(this.options);
		this.progButtons.buttonSignal.add(this.clickButton, this);
		this.dragContainer = new ProgDragContainer(this.options);
		this.dragContainer.clearSignal.add(this.onClear, this);
		this.dragManager = new PhaserComponents.Drag.DragManager(this.dragContainer.view, this.game, {"model":this.options.model, "fail":PhaserComponents.Drag.DragFailTypes.FAIL_REMOVE});
		this.dragManager.editSignal.add(this.onEdited, this);
		this.group.add(this.progButtons.view);
		this.group.add(this.dragContainer.view);
		this.initDrag();
		this.playController = PlayControllerFactory.make(this.options.targets, this);
		this.dragContainer.playSignal.add(this.onPlay, this);
		this.load();
	};

	ProgCommandPanel.prototype.onPlay = function(commands){
		this.playController.addCommands(commands);
	};

	ProgCommandPanel.prototype.onEdited = function() {
		if(this.options.model){
			this.modelFacade.get(ModelConsts.PROG).set(this.options.model.toJson(), {"silent":true});
		}
		this.dragContainer.checkStartEnabled();
	};

	ProgCommandPanel.prototype.destroy = function() {
		this.disableInput();
		this.modelFacade.get(ModelConsts.PLAYING).changeSignal.remove(this.playingChanged, this);
		this.dragManager.editSignal.remove(this.onEdited, this);
		this.dragManager.destroy();
		this.dragManager = null;
		this.progButtons.buttonSignal.remove(this.clickButton, this);
		this.group.remove(this.progButtons.view);
		this.progButtons.destroy();
		this.progButtons = null;
		this.group.remove(this.dragContainer.view);
		this.dragContainer.clearSignal.remove(this.onClear, this);
		this.dragContainer.destroy();
		this.dragContainer = null;
		this.options.targetObj.destroy();
		this.options.model = null;
		this.options = null;
		AbstractCommandsPanel.prototype.destroy.call(this);
	};

	return ProgCommandPanel;
});



