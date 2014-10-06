
define(['app/views/commandpanels/abstractkeyscommandspanel',

'app/logocommands/commandtypes', 'phasercomponents', 'app/events/events'

],

function(AbstractKeysCommandsPanel,

CommandTypes, PhaserComponents, Events

){
	
	"use strict";
	
	var NSEW45KeysCommandsPanel  = function(options){
		AbstractKeysCommandsPanel.call(this, options);
	};
	
	PhaserComponents.Utils.extends(NSEW45KeysCommandsPanel, AbstractKeysCommandsPanel);

	NSEW45KeysCommandsPanel.prototype.getGridData = function() {
		return [{'num':0, 'visible':true}, {'num':1, 'visible':true}, {'num':2, 'visible':true}, {'num':3, 'visible':true}, {'num':4, 'visible':false}, {'num':5, 'visible':true}, {'num':6, 'visible':true}, {'num':7, 'visible':true}, {'num':8, 'visible':true}];
	};
	
	NSEW45KeysCommandsPanel.prototype.onKeyUp = function(event, obj) {
		var i, code;
		code = obj.data.keyCode;
		if(this.commSelected()){
			if(code === 37){
				this.selectComm({"index":3});
			}
			else if(code === 38){
				this.selectComm({"index":1});
			}
			else if(code === 39){
				this.selectComm({"index":5});
			}
			else if(code === 40){
				this.selectComm({"index":7});
			}
			else if(code <= 57 && code >= 49){
				this.selectKey({"index":code - 49});
			}
			else if(code >= 97 && code <= 105){
				if(this.recentComm()){
					this.selectKey({"index":code - 97});
				}
				else{
					i = (code - 97);
					this.selectComm({"index":[6, 7, 8, 3, 4, 5, 0, 1, 2][i]});	
				}
			}
		}
		else{
			if(code === 37){
				this.selectComm({"index":3});
			}
			else if(code === 38){
				this.selectComm({"index":1});
			}
			else if(code === 39){
				this.selectComm({"index":5});
			}
			else if(code === 40){
				this.selectComm({"index":7});
			}
			else if(code >= 97 && code <= 105){
				i = (code - 97);
				this.selectComm({"index":[6, 7, 8, 3, 4, 5, 0, 1, 2][i]});
			}
		}
	};

	NSEW45KeysCommandsPanel.prototype.selectKey = function(data){
		AbstractKeysCommandsPanel.prototype.selectKey.call(this, data);
		this.addCommands(this.getSelectedCommand(), CommandTypes.MOVE, data.index + 1);
	};
	
	NSEW45KeysCommandsPanel.prototype.setSelectedCommand = function(i) {
		AbstractKeysCommandsPanel.prototype.setSelectedCommand.call(this, i);
		this.eventDispatcher.trigger({"type":Events.ROTATE_TURTLE, "data":{"direction":i}});
	};

	return NSEW45KeysCommandsPanel;
});
	
	
