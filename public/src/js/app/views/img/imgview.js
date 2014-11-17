
define(['phasercomponents', 'app/events/events'],

function(PhaserComponents, Events){
	
	"use strict";
		
	var ImgView = function(data){
		console.log("ImgView, ", data);
		this.data = data;
		this.body = $("body");
		PhaserComponents.Injector.getInstance().injectInto(this, "imgview");
		this.addElements();
		this.addListeners();
	};

	ImgView.HEIGHT = 	400;
	ImgView.BOTTOM = 	60;
	ImgView.TOP = 		40;

	ImgView.prototype.addElements = function(){
		var left, w, ratio;
		this.img = $("<img class='img_download' src='"+this.data+"'/>");
		this.container = $("<div class='img_container'></div>");
		this.bg = $("<div class='img_bg'></div>");
		this.imgPanel = $("<div class='img_panel'></div>");
		this.close = $("<div class='img_close'></div>");
		this.mouse = $("<div class='img_mouse'></div>");
		this.top = $("<div class='img_panel_top'><span>Your image</span></div>");
		this.container.append(this.bg);
		this.container.append(this.imgPanel);
		this.imgPanel.append(this.top);
		this.imgPanel.append(this.img);
		this.imgPanel.append(this.close);
		this.imgPanel.append(this.mouse);
		console.log("add container");
		this.body.append(this.container);
	};
	
	ImgView.prototype.addListeners = function(){
		this.close.on("mousedown touchstart", this.onCloseClick.bind(this));
	};

	ImgView.prototype.onCloseClick = function(){
		this.eventDispatcher.trigger({"type":Events.CLOSE_IMG});
	};

	ImgView.prototype.close = function(){
		this.destroy();
	};

	ImgView.prototype.destroy = function() {
		this.close.off("mousedown touchstart");
		this.container.empty().remove();
		this.body = null;
		this.container = null;
		this.img = null;
		this.bg = null;
		this.eventDispatcher = null;
		this.imgPanel = null;
		this.close = null;
		this.mouse = null;
		this.data = null;
	};

	return ImgView;
	
});
	





