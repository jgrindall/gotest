
define([],

	function(){
	
		"use strict";

		var TranslationConsts = { };

		TranslationConsts.SHEET_NAME = 					"2go";
		TranslationConsts.DEFAULT_SHEET_NAME = 			"default";

		TranslationConsts.Keys = {};
		TranslationConsts.Keys.START_NEW_FILE = 				"START_NEW_FILE";
		TranslationConsts.Keys.MAKE_MY_OWN = 					"MAKE_MY_OWN";
		TranslationConsts.Keys.STRETCH_DIAGS = 					"STRETCH_DIAGS";
		TranslationConsts.Keys.ALLOW_PROG = 					"ALLOW_PROG";
		TranslationConsts.Keys.TOGGLE_GRID = 					"TOGGLE_GRID";
		TranslationConsts.Keys.STEP_LENGTH = 					"STEP_LENGTH";
		TranslationConsts.Keys.SETTINGS = 						"SETTINGS";
		TranslationConsts.Keys.CHOOSE_TURTLE =					"CHOOSE_TURTLE";
		TranslationConsts.Keys.CHALLENGES_BUTTON = 				"CHALLENGES_BUTTON";
		TranslationConsts.Keys.TRY_ANOTHER_BUTTON = 			"TRY_ANOTHER_BUTTON";
		TranslationConsts.Keys.OK_BUTTON =						"OK_BUTTON";
		TranslationConsts.Keys.PLAY_BUTTON = 					"PLAY_BUTTON";
		TranslationConsts.Keys.STOP_BUTTON = 					"STOP_BUTTON";
		TranslationConsts.Keys.KEYS0 = 							"KEYS0";
		TranslationConsts.Keys.KEYS1 = 							"KEYS1";
		TranslationConsts.Keys.KEYS2 = 							"KEYS2";
		TranslationConsts.Keys.KEYS3 = 							"KEYS3";
		TranslationConsts.Keys.TAB0 = 							"TAB0";
		TranslationConsts.Keys.TAB1 = 							"TAB1";
		TranslationConsts.Keys.CHALLENGE_TITLE =				"CHALLENGE_TITLE";
		TranslationConsts.Keys.HELP_TITLE =						"HELP_TITLE";
		TranslationConsts.Keys.MESSAGE_TITLE = 					"MESSAGE_TITLE";
		TranslationConsts.Keys.ERROR_TITLE = 					"ERROR_TITLE";
		TranslationConsts.Keys.WELL_DONE_MESSAGE = 				"WELL_DONE_MESSAGE";
		TranslationConsts.Keys.SCREENSHOT = 					"SCREENSHOT";
		TranslationConsts.Keys.SAVE_SUCCESS = 					"SAVE_SUCCESS";
		TranslationConsts.Keys.LOAD_SUCCESS = 					"LOAD_SUCCESS";
		TranslationConsts.Keys.ERROR_PREFIX =					"ERROR";
		TranslationConsts.Keys.ERROR0 =							"ERROR0";
		TranslationConsts.Keys.ERROR1 =							"ERROR1";
		TranslationConsts.Keys.ERROR2 =							"ERROR2";
		TranslationConsts.Keys.ERROR3 =							"ERROR3";
		TranslationConsts.Keys.ERROR4 =							"ERROR4";
		TranslationConsts.Keys.ERROR5 =							"ERROR5";
		TranslationConsts.Keys.ERROR6 =							"ERROR6";
		TranslationConsts.Keys.ERROR7 =							"ERROR7";
		TranslationConsts.Keys.ERROR8 =							"ERROR8";
		TranslationConsts.Keys.ERROR9 =							"ERROR9";
		TranslationConsts.Keys.ERROR10 =						"ERROR10";
		TranslationConsts.Keys.ERROR11 =						"ERROR11";
		TranslationConsts.Keys.ERROR12 =						"ERROR12";
		TranslationConsts.Keys.CHALLENGE_PREFIX =				"CHALLENGE";
		TranslationConsts.Keys.CHALLENGE0 =						"CHALLENGE0";
		TranslationConsts.Keys.CHALLENGE1 =						"CHALLENGE1";
		TranslationConsts.Keys.CHALLENGE2 =						"CHALLENGE2";
		TranslationConsts.Keys.CHALLENGE3 =						"CHALLENGE3";
		TranslationConsts.Keys.CHALLENGE4 =						"CHALLENGE4";
		TranslationConsts.Keys.CHALLENGE5 =						"CHALLENGE5";
		TranslationConsts.Keys.CHALLENGE6 =						"CHALLENGE6";
		TranslationConsts.Keys.CHALLENGE7 =						"CHALLENGE7";
		TranslationConsts.Keys.CHALLENGE_NAME0 =				"CHALLENGE_NAME0";
		TranslationConsts.Keys.CHALLENGE_NAME1 =				"CHALLENGE_NAME1";
		TranslationConsts.Keys.CHALLENGE_NAME2 =				"CHALLENGE_NAME2";
		TranslationConsts.Keys.CHALLENGE_NAME3 =				"CHALLENGE_NAME3";
		TranslationConsts.Keys.CHALLENGE_NAME4 =				"CHALLENGE_NAME4";
		TranslationConsts.Keys.CHALLENGE_NAME5 =				"CHALLENGE_NAME5";
		TranslationConsts.Keys.CHALLENGE_NAME6 =				"CHALLENGE_NAME6";
		TranslationConsts.Keys.CHALLENGE_NAME7 =				"CHALLENGE_NAME7";
		TranslationConsts.Keys.TURN_45_DEGREES =				"TURN_45_DEGREES";
		TranslationConsts.Keys.TURN_90_DEGREES =				"TURN_90_DEGREES";


		TranslationConsts.Data = {};
		TranslationConsts.Data[TranslationConsts.Keys.START_NEW_FILE] = 			"Start a new file - choose a background";
		TranslationConsts.Data[TranslationConsts.Keys.MAKE_MY_OWN] = 				"Make my own";
		TranslationConsts.Data[TranslationConsts.Keys.STRETCH_DIAGS] = 				"Stretch diagonals";
		TranslationConsts.Data[TranslationConsts.Keys.ALLOW_PROG] = 				"Allow programming";
		TranslationConsts.Data[TranslationConsts.Keys.TOGGLE_GRID] = 				"Toggle grid";
		TranslationConsts.Data[TranslationConsts.Keys.STEP_LENGTH] = 				"Step length";
		TranslationConsts.Data[TranslationConsts.Keys.SETTINGS] = 					"Settings";
		TranslationConsts.Data[TranslationConsts.Keys.CHOOSE_TURTLE] =				"Choose a turtle";
		TranslationConsts.Data[TranslationConsts.Keys.CHALLENGES_BUTTON] = 			"Challenges";
		TranslationConsts.Data[TranslationConsts.Keys.TRY_ANOTHER_BUTTON] = 		"Try another";
		TranslationConsts.Data[TranslationConsts.Keys.OK_BUTTON] =					"Ok";
		TranslationConsts.Data[TranslationConsts.Keys.PLAY_BUTTON] = 				"Play";
		TranslationConsts.Data[TranslationConsts.Keys.STOP_BUTTON] = 				"Stop";
		TranslationConsts.Data[TranslationConsts.Keys.KEYS0] = 						"Simple up down,\nleft, right";
		TranslationConsts.Data[TranslationConsts.Keys.KEYS1] = 						"Use number keys to say\nhow many steps to take";
		TranslationConsts.Data[TranslationConsts.Keys.KEYS2] = 						"Use diagonals and number\nkeys to control the turtle";
		TranslationConsts.Data[TranslationConsts.Keys.KEYS3] = 						"Program the turtle to turn on the\nspot and move forwards or backwards";
		TranslationConsts.Data[TranslationConsts.Keys.TAB0] = 						"Input";
		TranslationConsts.Data[TranslationConsts.Keys.TAB1] = 						"General";
		TranslationConsts.Data[TranslationConsts.Keys.CHALLENGE_TITLE] =			"Challenge";
		TranslationConsts.Data[TranslationConsts.Keys.MESSAGE_TITLE] = 				"Message";
		TranslationConsts.Data[TranslationConsts.Keys.HELP_TITLE] = 				"Help";
		TranslationConsts.Data[TranslationConsts.Keys.ERROR_TITLE] = 				"Error";
		TranslationConsts.Data[TranslationConsts.Keys.WELL_DONE_MESSAGE] = 			"Congratulations, you've cracked it!";
		TranslationConsts.Data[TranslationConsts.Keys.SCREENSHOT] = 				"Use your device to take a screenshot\nand save it to your camera roll.\nIf you're not sure how, ask your teacher.";
		TranslationConsts.Data[TranslationConsts.Keys.SAVE_SUCCESS] = 				"Your file has been saved";
		TranslationConsts.Data[TranslationConsts.Keys.LOAD_SUCCESS] = 				"Your file has been loaded";
		TranslationConsts.Data[TranslationConsts.Keys.ERROR0] =						"Error saving your file.";
		TranslationConsts.Data[TranslationConsts.Keys.ERROR1] =						"Format error, unable to load your file.";
		TranslationConsts.Data[TranslationConsts.Keys.ERROR2] =						"No printers found.";
		TranslationConsts.Data[TranslationConsts.Keys.ERROR3] =						"Error, unable to load your file.";
		TranslationConsts.Data[TranslationConsts.Keys.ERROR4] =						"Error loading defaults.";
		TranslationConsts.Data[TranslationConsts.Keys.ERROR5] =						"Sorry, saving images does not seem\nto be supported on your browser.";
		TranslationConsts.Data[TranslationConsts.Keys.ERROR6] =						"Error loading your file, file not found.";
		TranslationConsts.Data[TranslationConsts.Keys.ERROR7] =						"A clipboard error has occurred.";
		TranslationConsts.Data[TranslationConsts.Keys.ERROR8] =						"A clipboard error has occurred.";
		TranslationConsts.Data[TranslationConsts.Keys.ERROR9] =						"A clipboard error has occurred.";
		TranslationConsts.Data[TranslationConsts.Keys.ERROR10] =					"A clipboard error has occurred.";
		TranslationConsts.Data[TranslationConsts.Keys.ERROR11] =					"You have tried to open a file\nbelonging to an older version\nof 2Go. Launching...";
		TranslationConsts.Data[TranslationConsts.Keys.ERROR12] =					"Error sharing your file.";
		TranslationConsts.Data[TranslationConsts.Keys.CHALLENGE0] = 			 	"Guide the fish to the treasure chest";
		TranslationConsts.Data[TranslationConsts.Keys.CHALLENGE1] = 				"Drive the car to the bank,\nand then to the hospital";
		TranslationConsts.Data[TranslationConsts.Keys.CHALLENGE2] = 				"Visit the four island ports in order and\nthen go to the lighthouse";
		TranslationConsts.Data[TranslationConsts.Keys.CHALLENGE3] = 				"Get little red riding hood to\nGranny's cottage. Don't get\neaten on the way";
		TranslationConsts.Data[TranslationConsts.Keys.CHALLENGE4] = 				"Make the bee visit both of the poppies";
		TranslationConsts.Data[TranslationConsts.Keys.CHALLENGE5] = 				"Travel along the flight-path to\nget to the spaceman";
		TranslationConsts.Data[TranslationConsts.Keys.CHALLENGE6] = 				"Get to the cheese by finding\nyour way through the maze";
		TranslationConsts.Data[TranslationConsts.Keys.CHALLENGE7] = 				"Drive the car around the track by repeating\nthe 'turn 90 degrees' and 'move forward'\ncommands. Click on '×1' to change how\nmany times they repeat";
		TranslationConsts.Data[TranslationConsts.Keys.CHALLENGE_NAME0] = 			"Find the treasure";
		TranslationConsts.Data[TranslationConsts.Keys.CHALLENGE_NAME1] = 			"See the sights";
		TranslationConsts.Data[TranslationConsts.Keys.CHALLENGE_NAME2] = 			"To the lighthouse";
		TranslationConsts.Data[TranslationConsts.Keys.CHALLENGE_NAME3] = 			"Live to tell the tale";
		TranslationConsts.Data[TranslationConsts.Keys.CHALLENGE_NAME4] = 			"Get buzzy";
		TranslationConsts.Data[TranslationConsts.Keys.CHALLENGE_NAME5] = 			"Rescue the spaceman";
		TranslationConsts.Data[TranslationConsts.Keys.CHALLENGE_NAME6] = 			"Say cheese!";
		TranslationConsts.Data[TranslationConsts.Keys.CHALLENGE_NAME7] = 			"Win the race";
		TranslationConsts.Data[TranslationConsts.Keys.TURN_45_DEGREES] = 			"45 degrees";
		TranslationConsts.Data[TranslationConsts.Keys.TURN_90_DEGREES] = 			"90 degrees";
	
		return TranslationConsts;

	}
);

