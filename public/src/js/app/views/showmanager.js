
define(['phasercomponents', 'app/consts/showdirections'],

function(PhaserComponents, ShowDirections){
	
	"use strict";
	
	var ShowManager  = function(){
		PhaserComponents.Injector.getInstance().injectInto(this, "showmanager");
		this.cache = [];
		this.tweens = [];
	};
	
	ShowManager.DELAY = 250;
	ShowManager.DURATION = 600;

	ShowManager.getInstance = function(){
		if(!ShowManager.instance){
			ShowManager.instance = new ShowManager();
		}
		return ShowManager.instance;
	};

	ShowManager.prototype.show = function(key){
		if(!key){
			return true;
		}
		if(this.cache.indexOf(key) === -1){
			this.cache.push(key);
			return true;
		}
		return false;
	};

	ShowManager.prototype.add = function(view, num, dir, key){
		var x, y, ds, options, show, tween0;
		show = this.show(key);
		if(show){
			x = view.x;
			y = view.y;
			ds = ShowDirections.DIR[dir];
			view.x += ds[0] * view.width * 2;
			view.y += ds[1] * view.height * 2;
			options = {'x':x, 'y':y};
			tween0 = this.game.add.tween(view).to(options, ShowManager.DURATION, Phaser.Easing.Back.InOut, true, num*ShowManager.DELAY, false);
			this.tweens.push(tween0);
		}
	};

	ShowManager.prototype.stopTweens = function(){
		this.tweens.forEach(function(tween){
			tween.stop();
		});
	};

	ShowManager.prototype.shutdown = function(){
		this.stopTweens();
		this.cache = null;
		this.tweens = [];
	};

	ShowManager.shutdown = function(){
		if(ShowManager.instance){
			ShowManager.instance.shutdown();
		}
	};

	return ShowManager;
});
	
