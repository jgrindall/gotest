define(

	['phasercomponents', 'phaser', 'app/views/buttons/dragbutton', 'app/prog/dropview',

	'app/prog/dragview', 'app/prog/accepter', 'app/assets',

	'app/views/commandpanels/abstractcommandspanel', 

	'app/views/buttons/playbutton', 'app/consts/progtypes',

	'app/logocommands/commandtypes', 'app/prog/targetbuilder', 'app/models/modelfacade'],

	function(PhaserComponents, Phaser, DragButton, DropView,

		DragView, Accepter, Assets,

		AbstractCommandsPanel,

		PlayButton, ProgTypes,

		CommandTypes, TargetBuilder, ModelFacade){
	
	"use strict";

	var AbstractProgCommandPanel = function(options){
		this.buttons = [];
		this.targets = [];
		AbstractCommandsPanel.call(this, options);
		ModelFacade.getInstance().get(ModelFacade.COMMTICKER).changeSignal.add(this.setProgress, this);
		ModelFacade.getInstance().get(ModelFacade.COMM).changeSignal.add(this.setProgress, this);
	};

	PhaserComponents.Utils.extends(AbstractProgCommandPanel, AbstractCommandsPanel);

	AbstractProgCommandPanel.prototype.setProgress = function(data){
		
	};

	AbstractProgCommandPanel.prototype.clickButton = function(data){
		var type, index, tick, turn;
		type = data.target.options.type
		index = data.target.options.index;
		turn = data.target.options.turn;
		if(this.dragManager && this.dragManager.enabled){
			tick = this.addDrag(type, index, turn, {'x':data.target.sprite.x, 'y':data.target.sprite.y});
			this.dragManager.startDrag(tick);
		}
	};

	AbstractProgCommandPanel.prototype.disableInput = function(){
		this.dragManager.disableInput();
		this.disableStart();
	};
	
	AbstractProgCommandPanel.prototype.enableInput = function(){
		this.dragManager.enableInput();
		this.enableStart();
	};

	AbstractProgCommandPanel.prototype.disableStart = function(){
		if(this.playButton.mouseUpSignal.has(this.clickPlay, this)){
			this.playButton.mouseUpSignal.remove(this.clickPlay, this);
		}	
	};
	
	AbstractProgCommandPanel.prototype.enableStart = function(){
		if(!this.playButton.mouseUpSignal.has(this.clickPlay, this)){
			this.playButton.mouseUpSignal.add(this.clickPlay, this);
		}
	};

	AbstractProgCommandPanel.prototype.addDrag = function(type, index, turn, bounds){
		var tick = new DragView({"type":type, "turn":turn, "index":index, 'bounds':bounds});
		this.group.add(tick.sprite);
		this.dragManager.addDrag(tick);
		return tick;
	};

	AbstractProgCommandPanel.prototype.getButtonPos = function(i, j){
		return {'x':this.bounds.x + 2 + 32*i, 'y':this.bounds.y + 10 + 40*j};
	};

	AbstractProgCommandPanel.prototype.addButtons = function(){
		var i, j, button, buttons, bounds, data, options;
		buttons = this.options.buttons;
		for(i = 0; i < buttons.length; i++){
			for(j = 0; j < buttons[i].length; j++){
				data = buttons[i][j];
				bounds = this.getButtonPos(i, j);
				options = {'type':i, 'index':data.num, 'turn':data.turn, 'bounds':bounds};
				button = new DragButton(options);
				this.buttons.push(button);
				this.group.add(button.sprite);
				button.mouseDownSignal.add(this.clickButton, this);
			}
		}
	};

	AbstractProgCommandPanel.prototype.onSaveClick = function(){
		var jsonString = JSON.stringify(this.model.toJson());
		localStorage.setItem("jsonData", jsonString);
	};

	AbstractProgCommandPanel.prototype.onLoadClick = function(){
		/*
		var i, j, json, jsonString, obj, tick;
		this.dragManager.clear();
		jsonString = localStorage.getItem("jsonData");
		json = JSON.parse(jsonString);
		for(i = 0; i < json.length; i++){
			for(j = 0; j < json[i].length; j++){
				obj = json[i][j];
				if(obj.type !== null && obj.type !== undefined){
					tick = this.addDrag(obj.type, obj.index);
					this.dragManager.snapTo(tick, i, j);
				}
			}
		}
		*/
	};

	AbstractProgCommandPanel.prototype.addTargets = function(){
		new TargetBuilder(this.options.targets).build(this);
	};

	AbstractProgCommandPanel.prototype.initDrag = function(){
		var i, j, hitZones, hitZone, hitZoneRow, h;
		hitZones = this.options.hitzones;
		for(i = 0; i < hitZones.length; i++){
			hitZone = hitZones[i];
			h = [];
			for(j = 0; j < hitZone.length; j++){
				h.push(new PhaserComponents.Drag.HitZone(new Accepter(hitZone[j].accept), hitZone[j].bounds));
			}
			hitZoneRow = new PhaserComponents.Drag.HitZoneRow(h);
			this.dragManager.addTarget(this.targets[i], hitZoneRow); 
		}
	};

	AbstractProgCommandPanel.prototype.addPlay = function() {
		var options = {"bounds":{'x':this.bounds.x + (this.bounds.w - PlayButton.WIDTH)/2, 'y':this.bounds.y + 10, 'w':PlayButton.WIDTH, 'h':PlayButton.HEIGHT}};
		this.playButton = new PlayButton(options);
		this.group.add(this.playButton.sprite);
	};

	AbstractProgCommandPanel.prototype.clickPlay = function() {
		console.log("play");
		this.addAllCommands();
	};
	
	AbstractProgCommandPanel.prototype.create = function() {
		AbstractCommandsPanel.prototype.create.call(this);
		this.model = new PhaserComponents.Drag.DragModel();
		this.dragManager = new PhaserComponents.Drag.DragManager(this.game, {"model":this.model, "fail":PhaserComponents.Drag.DragFailTypes.FAIL_REMOVE});
		this.dragManager.editSignal.add(this.onEdited, this);
		this.addButtons();
		this.addTargets();
		this.addPlay();
		this.initDrag();
	};

	AbstractProgCommandPanel.prototype.onEdited = function() {
		var enable = this.startEnabled();
		if(enable){
			this.enableStart();
		}
		else{
			this.disableStart();
		}
	};

	AbstractProgCommandPanel.prototype.removeTargets = function() {
		var target, i;
		for(i = 0; i < this.targets.length; i++){
			target = this.targets[i];
			this.group.remove(target.sprite);
			target.destroy();
		}
		this.targets = [];
	};

	AbstractProgCommandPanel.prototype.removeButtons = function() {
		var button, i;
		for(i = 0; i < this.buttons.length; i++){
			button = this.buttons[i];
			button.mouseDownSignal.remove(this.clickButton, this);
			this.group.remove(button.sprite);
			button.destroy();
		}
		this.buttons = [];
	};

	AbstractProgCommandPanel.prototype.startEnabled = function() {
		var i, hitZoneRow, json = this.model.toJson();
		for(i = 0; i < json.length; i++){
			hitZoneRow = json[i];
			if(this.isFull(hitZoneRow)){
				return true;
			}
		}
		return false;
	};

	AbstractProgCommandPanel.prototype.destroy = function() {
		this.disableInput();
		this.model = null;
		ModelFacade.getInstance().get(ModelFacade.COMMTICKER).changeSignal.remove(this.setProgress, this);
		ModelFacade.getInstance().get(ModelFacade.COMM).changeSignal.remove(this.setProgress, this);
		this.dragManager.editSignal.remove(this.onEdited, this);
		this.dragManager.destroy();
		this.dragManager = null;
		this.group.remove(this.playButton.sprite);
		this.removeTargets();
		this.removeButtons();
		AbstractCommandsPanel.prototype.destroy.call(this);
	};

	return AbstractProgCommandPanel;
});

