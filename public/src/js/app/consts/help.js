
define([],

function(){
	
	"use strict";
	
	var Help  = function(){
		
	};

	Help.VIDEO_LABELS = [];
	Help.VIDEO_LABELS.push("Introduction");
	Help.VIDEO_LABELS.push("Challenges");
	Help.VIDEO_LABELS.push("Programming (Part 1)");
	Help.VIDEO_LABELS.push("Programming (Part 2)");
	Help.VIDEO_LABELS.push("Programming (Part 3)");
	Help.VIDEO_LABELS.push("Settings");

	Help.VIDEO_URLS = [];
	Help.VIDEO_URLS.push("/mashcontent/videos/2GoHTML5/2go_intro.mp4");
	Help.VIDEO_URLS.push("/mashcontent/videos/2GoHTML5/2go_challenges.mp4");
	Help.VIDEO_URLS.push("/mashcontent/videos/2GoHTML5/2go_programing_p1.mp4");
	Help.VIDEO_URLS.push("/mashcontent/videos/2GoHTML5/2go_programing_p2.mp4");
	Help.VIDEO_URLS.push("/mashcontent/videos/2GoHTML5/2go_programing_p3.mp4");
	Help.VIDEO_URLS.push("/mashcontent/videos/2GoHTML5/2go_settings.mp4");
	
	Help.VIDEO_TITLE = ["2Go - Help Videos"];

	Help.SETTINGS_VIDEO_LABELS = [];
	Help.SETTINGS_VIDEO_LABELS.push("Settings");

	Help.SETTINGS_VIDEO_URLS = [];
	Help.VIDEO_URLS.push("/mashcontent/videos/2GoHTML5/2go_settings.mp4");
	
	Help.SETTINGS_VIDEO_TITLE = ["2Go - Settings help"];

	Help.getArgs = function(){
		var i, obj, r = [];
		for(i = 0; i < Help.VIDEO_LABELS.length; i++){
			obj = {};
			obj.label = Help.VIDEO_LABELS[i];
			obj.url = Help.VIDEO_URLS[i];
			r.push(obj);
		}
		return r;
	};

	Help.getOptions = function(){
		return {"title": Help.VIDEO_TITLE};
	};

	Help.getSettingsArgs = function(){
		var i, obj, r = [];
		for(i = 0; i < Help.SETTINGS_VIDEO_LABELS.length; i++){
			obj = {};
			obj.label = Help.SETTINGS_VIDEO_LABELS[i];
			obj.url = Help.SETTINGS_VIDEO_URLS[i];
			r.push(obj);
		}
		return r;
	};

	Help.getSettingsOptions = function(){
		return {"title": Help.SETTINGS_VIDEO_TITLE};
	};

	return Help;

});



