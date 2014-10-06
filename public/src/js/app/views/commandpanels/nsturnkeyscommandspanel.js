
define(['app/views/commandpanels/abstractkeyscommandspanel',

'app/logocommands/commandtypes', 'phasercomponents'

],

function(AbstractKeysCommandsPanel,

CommandTypes, PhaserComponents){
	
	"use strict";
	
	var NSTurnKeysCommandsPanel  = function(options){
		AbstractKeysCommandsPanel.call(this, options);
	};
	
	PhaserComponents.Utils.extends(NSTurnKeysCommandsPanel, AbstractKeysCommandsPanel);

	NSTurnKeysCommandsPanel.prototype.getGridData = function() {
		return [{'num':0, 'visible':false}, {'num':1, 'visible':true}, {'num':2, 'visible':false}, {'num':3, 'visible':true, 'turn':true}, {'num':4, 'visible':false}, {'num':5, 'visible':true, 'turn':true}, {'num':6, 'visible':false}, {'num':7, 'visible':true}, {'num':8, 'visible':false}];
	};
	
	NSTurnKeysCommandsPanel.prototype.onKeyUp = function(event, obj) {
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
			else if(code === 97 || code === 99  || code === 101  || code === 103  || code === 105){
				this.selectKey({"index":code - 97});
			}
			else if(code === 98 || code === 100  || code === 102  || code === 104){
				if(this.recentComm()){
					this.selectKey({"index":code - 97});
				}
				else{
					i = (code - 98)/2;
					this.selectComm({"index":[7, 3, 5, 1][i]});	
				}
			}
		}
		else{
			if(code === 37 || code === 100){
				this.selectComm({"index":3});
			}
			else if(code === 38 || code === 104){
				this.selectComm({"index":1});
			}
			else if(code === 39 || code === 102){
				this.selectComm({"index":5});
			}
			else if(code === 40 || code === 98){
				this.selectComm({"index":7});
			}
		}
	};

	NSTurnKeysCommandsPanel.prototype.selectKey = function(data){
		AbstractKeysCommandsPanel.prototype.selectKey.call(this, data);
		var type, comm;
		comm = this.getSelectedCommand();
		if(comm === 1 || comm === 7){
			type = CommandTypes.FD;
		}
		else{
			type = CommandTypes.TURN;
		}
		this.addCommands(comm, type, data.index + 1);
	};
	
	return NSTurnKeysCommandsPanel;
});
	
	
