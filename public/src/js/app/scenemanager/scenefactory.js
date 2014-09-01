
define('app/scenemanager/scenefactory',['app/consts/appconsts','app/scenes/loaderscene', 'app/scenes/activityscene'],

function(AppConsts, LoaderScene, ActivityScene){
	
	"use strict";
	
	var SceneFactory = function(){

	};
	
	SceneFactory.getForKey = function(key){
		var ClassRef = SceneFactory.getClassForKey(key);
		return new ClassRef(key);
	};
	
	SceneFactory.getClassForKey = function(key){
		if(key === AppConsts.LOADER_SCENE){
			return LoaderScene;
		}
		else if(key === AppConsts.ACTIVITY_SCENE){
			return ActivityScene;
		}
	};
	
	return SceneFactory;

});
	
	