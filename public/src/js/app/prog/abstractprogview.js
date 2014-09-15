define('app/prog/abstractprogview',

	['phasercomponents', 'phaser', 'app/views/buttons/dragbutton', 'app/prog/dropview',

	'app/prog/dragview', 'app/prog/accepter', 'app/assets'],

	function(PhaserComponents, Phaser, DragButton, DropView,

		DragView, Accepter, Assets){
	
	"use strict";

	var AbstractProgView = function(options){
		this.buttons = [];
		this.targets = [];
		PhaserComponents.Display.Container.call(this, options);
	};

	PhaserComponents.Utils.extends(AbstractProgView, PhaserComponents.Display.Container);

	AbstractProgView.prototype.clickButton = function(data){
		var type, index, tick;
		type = data.target.options.type
		index = data.target.options.index;
		if(this.dragManager && this.dragManager.enabled){
			tick = this.addDrag(type, index, {'x':data.target.sprite.x, 'y':data.target.sprite.y});
			this.dragManager.startDrag(tick);
		}
	};

	AbstractProgView.prototype.addDrag = function(type, index, bounds){
		var tick = new DragView({"type":type, "index":index, 'bounds':bounds});
		this.group.add(tick.sprite);
		this.dragManager.addDrag(tick);
		return tick;
	};

	AbstractProgView.prototype.addButtons = function(){
		var i, j, button, buttons, bounds;
		buttons = this.options.data[0];
		for(i = 0; i < buttons.length; i++){
			for(j = 0; j < buttons[i]; j++){
				bounds = {'x':this.bounds.x + 10 + 32*j, 'y':this.bounds.y + 50 + 40*i};
				button = new DragButton({'type':i, 'index':j, 'bounds':bounds});
				this.buttons.push(button);
				this.group.add(button.sprite);
				button.mouseDownSignal.add(this.clickButton, this);
			}
		}
	};

	AbstractProgView.prototype.onSaveClick = function(){
		var jsonString = JSON.stringify(this.model.toJson());
		localStorage.setItem("jsonData", jsonString);
	};

	AbstractProgView.prototype.onLoadClick = function(){
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
	};

	AbstractProgView.prototype.addTargets = function(){
		var i, target, numTargets;
		numTargets = this.options.data[1];
		for(i = 0; i < numTargets; i++){
			target = new DropView({'index':i, 'bounds':{'x':this.bounds.x + 50, 'y':this.bounds.y + 200 + 55*i}});
			this.targets.push(target);
			this.group.add(target.sprite);
		}
	};

	AbstractProgView.prototype.initDrag = function(){
		var hitZoneRow0 = new PhaserComponents.Drag.HitZoneRow([new PhaserComponents.Drag.HitZone(new Accepter([0]), {'x':0, 'y':0}), new PhaserComponents.Drag.HitZone(new Accepter([1]), {'x':35, 'y':0})]);
		var hitZoneRow1 = new PhaserComponents.Drag.HitZoneRow([new PhaserComponents.Drag.HitZone(new Accepter([0]), {'x':20, 'y':0})]);
		var hitZoneRow2 = new PhaserComponents.Drag.HitZoneRow([new PhaserComponents.Drag.HitZone(new Accepter([0]), {'x':0, 'y':0}), new PhaserComponents.Drag.HitZone(new Accepter([1]), {'x':35, 'y':0})]);
		this.dragManager.addTarget(this.targets[0], hitZoneRow0); 
		this.dragManager.addTarget(this.targets[1], hitZoneRow1); 
		this.dragManager.addTarget(this.targets[2], hitZoneRow2); 
	};

	AbstractProgView.prototype.create = function() {
		PhaserComponents.Display.Container.prototype.create.call(this);
		this.model = new PhaserComponents.Drag.DragModel();
		this.dragManager = new PhaserComponents.Drag.DragManager(this.game, {"model":this.model, "fail":PhaserComponents.Drag.DragFailTypes.FAIL_REMOVE});
		this.addButtons();
		this.addTargets();
		this.initDrag();
	};

	return AbstractProgView;
});

