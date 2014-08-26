
define(['jquery', 'app/components/buttons/navbutton', 'app/components/buttons/closebutton', 'app/game',

'app/components/buttons/listbutton', 'app/components/buttons/okbutton', 'app/components/buttons/resetbutton',

'app/components/buttons/dirbutton', 'app/scenes/activity/commands/abstractcommand',

'app/components/container', 'app/components/abstractpopup', 'app/scenes/activity/bgdataprovider',

'app/components/pager', 'app/scenes/activity/commmodel', 'app/scenes/activity/layoutmodel', 'app/scenes/activity/bgmodel', 

'app/scenes/activity/colormodel', 'app/scenes/activity/speedmodel'

],

function($, NavButton, CloseButton, Game,

ListButton, OkButton, ResetButton,

DirButton, AbstractCommand,

Container, AbstractPopup, BgDataProvider,

Pager, commModel, layoutModel, bgModel,

colorModel, speedModel

){
	
	"use strict";
		
	var Persistence = function(options){
		
	};
	
	Persistence.DEFAULT = {
		"bg":1,
		"screen":0,
		"speed":2,
		"color":2,
		"commands":[
			{index:0, color:0, i:0, num:3},
			{index:5, color:1, i:1, num:3},
			{index:3, color:2, i:2, num:3},
			{index:2, color:3, i:0, num:1}
		]
	};
	
	Persistence.prototype.loadDefaults = function(){
		var json = Persistence.DEFAULT;
		layoutModel.setData(json.screen);
		colorModel.setData(json.color);
		speedModel.setData(json.speed);
		bgModel.setData(json.bg);
		$.each(json.commands, function(i, c){
			commModel.add(AbstractCommand.fromJson(c), false);
		});
		commModel.playAll();
	};
	
	Persistence.getInstance = function(){
		if(!Persistence.instance){
			Persistence.create();
		}
		return Persistence.instance;
	};
	
	Persistence.create = function () {
		Persistence.instance = new Persistence();
	};
	
	Persistence.prototype.destroy = function () {
		
	};
	
	return Persistence;
	
});



