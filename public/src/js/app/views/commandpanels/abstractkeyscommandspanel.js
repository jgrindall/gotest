
define('app/views/commandpanels/abstractkeyscommandspanel',['app/game', 'app/components/buttons/keybutton',

'phasercomponents',

'app/views/commandpanels/abstractcommandspanel'

],

function(Game, KeyButton,

PhaserComponents, AbstractCommandsPanel

){
	
	"use strict";
	
	var AbstractKeysCommandsPanel  = function(options){
		AbstractCommandsPanel.call(this, options);
	};
	
	AbstractKeysCommandsPanel.prototype = Object.create(AbstractCommandsPanel.prototype);
	AbstractKeysCommandsPanel.prototype.constructor = AbstractKeysCommandsPanel;
	
	AbstractKeysCommandsPanel.prototype.create = function() {
		AbstractCommandsPanel.prototype.create.call(this);
		this.addKeys();
		this.disableKeys();
	};
	
	AbstractKeysCommandsPanel.prototype.getKeyData = function() {
		return [{'num':0}, {'num':1}, {'num':2}, {'num':3}, {'num':4}, {'num':5}, {'num':6}, {'num':7}, {'num':8}];
	};
	
	AbstractKeysCommandsPanel.prototype.addKeys = function() {
		var options, bounds, w, h, data, size, model;
		data = this.getKeyData();
		w = Game.w();
		h = Game.h();
		size = Math.min(this.options.bounds.w, this.options.bounds.h/2);
		bounds = {"x":this.options.bounds.x, "y":this.options.bounds.y + size, "w":size, "h":size};
		options = {"bounds":bounds, "numX": 3, "numY": 3, "buttonClass": KeyButton, "data":data};
		this.keys = new PhaserComponents.ButtonGrid(Game.getInstance(), options);
		this.keys.clickSignal.add(this.selectKey, this);
		this.group.add(this.keys.group);
	};
	
	AbstractKeysCommandsPanel.prototype.disableKeys = function() {
		if(this.keys){
			this.keys.disableAll();
			this.keys.alpha = 0.1;
		}
	};
	
	AbstractKeysCommandsPanel.prototype.enableKeys = function() {
		if(this.keys){
			this.keys.enableAll();
			this.keys.alpha = 1;
		}
	};
	
	AbstractKeysCommandsPanel.prototype.disableAllInput = function() {
		AbstractCommandsPanel.prototype.disableAllInput.call(this);
		this.disableKeys();
	};
	
	AbstractKeysCommandsPanel.prototype.enableAllInput = function() {
		AbstractCommandsPanel.prototype.enableAllInput.call(this);
		this.enableKeys();
	};
	
	AbstractKeysCommandsPanel.prototype.setSelectedCommand = function(i) {
		AbstractCommandsPanel.prototype.setSelectedCommand.call(this, i);
		this.enableKeys();
	};
	
	AbstractKeysCommandsPanel.prototype.selectComm = function(data){
		this.setSelectedCommand(data.index);
	};
	
	AbstractKeysCommandsPanel.prototype.destroy = function() {
		if(this.keys){
			this.keys.destroy();
		}
		AbstractCommandsPanel.prototype.destroy.call(this);
	};
	
	return AbstractKeysCommandsPanel;
});
	
	
