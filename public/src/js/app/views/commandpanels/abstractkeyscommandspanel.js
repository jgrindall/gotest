
define(['app/views/buttons/keybutton',

'phasercomponents',

'app/views/commandpanels/abstractexecutecommandpanel'

],

function(KeyButton,

PhaserComponents, AbstractExecuteCommandsPanel

){
	
	"use strict";
	
	var AbstractKeysCommandsPanel  = function(options){
		AbstractExecuteCommandsPanel.call(this, options);
	};
	
	PhaserComponents.Utils.extends(AbstractKeysCommandsPanel, AbstractExecuteCommandsPanel);

	AbstractKeysCommandsPanel.prototype.init = function() {
		var comm = this.getSelectedCommand();
		this.selectComm({"index":comm});
	};

	AbstractKeysCommandsPanel.prototype.create = function() {
		AbstractExecuteCommandsPanel.prototype.create.call(this);
		this.addKeys();
		this.disableKeys();
	};
	
	AbstractKeysCommandsPanel.prototype.getKeyData = function() {
		return [{'num':0}, {'num':1}, {'num':2}, {'num':3}, {'num':4}, {'num':5}, {'num':6}, {'num':7}, {'num':8}];
	};
	
	AbstractKeysCommandsPanel.prototype.addKeys = function() {
		var options, bounds, w, h, data;
		data = this.getKeyData();
		w = this.game.w;
		h = this.game.h;
		bounds = {"x":this.bounds.x + (this.bounds.w - AbstractExecuteCommandsPanel.GRID_SIZE)/2, "y":this.bounds.y + AbstractExecuteCommandsPanel.GRID_SIZE, "w":AbstractExecuteCommandsPanel.GRID_SIZE, "h":AbstractExecuteCommandsPanel.GRID_SIZE};
		options = {"bounds":bounds, "numX": 3, "numY": 3, "buttonClass": KeyButton, "data":data};
		this.keys = new PhaserComponents.Display.ButtonGrid(options);
		this.keys.clickSignal.add(this.selectKey, this);
		this.group.add(this.keys.group);
	};
	
	AbstractKeysCommandsPanel.prototype.disableKeys = function() {
		if(this.keys){
			this.keys.disableInput();
			this.keys.alpha = 0.1;
		}
	};
	
	AbstractKeysCommandsPanel.prototype.enableKeys = function() {
		if(this.keys && this.getSelectedCommand() !== null && this.getSelectedCommand() !== 4){
			this.keys.enableInput();
			this.keys.alpha = 1;
		}
	};
	
	AbstractKeysCommandsPanel.prototype.disableInput = function() {
		AbstractExecuteCommandsPanel.prototype.disableInput.call(this);
		this.disableKeys();
	};
	
	AbstractKeysCommandsPanel.prototype.enableInput = function() {
		AbstractExecuteCommandsPanel.prototype.enableInput.call(this);
		this.enableKeys();
	};
	
	AbstractKeysCommandsPanel.prototype.setSelectedCommand = function(i) {
		AbstractExecuteCommandsPanel.prototype.setSelectedCommand.call(this, i);
		this.enableKeys();
	};
	
	AbstractKeysCommandsPanel.prototype.selectComm = function(data){
		this.setSelectedCommand(data.index);
	};
	
	AbstractKeysCommandsPanel.prototype.destroy = function() {
		if(this.keys){
			this.keys.destroy();
		}
		AbstractExecuteCommandsPanel.prototype.destroy.call(this);
	};
	
	return AbstractKeysCommandsPanel;
});
	
	
