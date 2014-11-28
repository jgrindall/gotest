
define(['app/assets'], function(Assets) {
	
	"use strict";
	
   	var ChallengeData = function (){
			
    };

	ChallengeData.RADIUS = 50;

	ChallengeData.MESSAGES = [];
	ChallengeData.MESSAGES.push("Guide the fish to the treasure chest");
	ChallengeData.MESSAGES.push("Drive the car to the bank, and then to the hospital");
	ChallengeData.MESSAGES.push("Visit the four island ports in order and\nthen go to the lighthouse");
	ChallengeData.MESSAGES.push("Get little red riding hood to\nGranny's cottage. Don't get\neaten on the way");
	ChallengeData.MESSAGES.push("Make the bee visit both of the poppies");
	ChallengeData.MESSAGES.push("Travel along the flight-path to\nget to the spaceman");
	ChallengeData.MESSAGES.push("Get to the cheese by finding\nyour way through the maze");
	ChallengeData.MESSAGES.push("Drive the car around the track by repeating\nthe 'turn 90 degrees' and 'move forward'\ncommands. Click on '×1' to change how\nmany times they repeat");
	
	ChallengeData.CHALLENGE_BG = 			[4, 2, 8, 3, 0, 1, 7, 5];
	ChallengeData.CHALLENGE_SCREEN = 		[0, 1, 2, 1, 2, 1, 2, 3];
	ChallengeData.CHALLENGE_COLOR = 		[0, 0, 0, 0, 2, 0, 0, 0];
	ChallengeData.CHALLENGE_STEP_LENGTH = 	[3, 2, 2, 2, 2, 2, 2, 2];
	ChallengeData.CHALLENGE_GRID = 			[1, 1, 1, 1, 1, 1, 1, 1];
	ChallengeData.CHALLENGE_PROG = 			[0, 0, 0, 1, 1, 2, 2, 3];
	ChallengeData.ANGLE = 					[0, 0, 0, 0, 0, 0, 0, 1];
	ChallengeData.CHALLENGE_ALLOW_PROG = 	[0, 0, 0, 1, 1, 1, 1, 1];
	ChallengeData.CHALLENGE_TURTLE = 		[1, 2, 4, 5, 6, 3, 7, 2];
	ChallengeData.CHALLENGE_DIAG = 			[1, 1, 1, 1, 1, 1, 1, 1];
	ChallengeData.CHALLENGE_START_POS = 	[{'x':0.8, 'y':0.1}, {'x':0.877, 'y':0.2}, {'x':0.875, 'y':0.3}, {'x':0.2, 'y':0.9}, {'x':0.2, 'y':0.9}, {'x':0.727, 'y':0.2}, {'x':0.05, 'y':0.8}, {'x':0.2, 'y':0.1}];

	ChallengeData.ORDERED = 				[false, true, true, false, false, false, false, true];

	ChallengeData.TARGETS = [];
	ChallengeData.TARGETS.push ( [{'x':280, 'y':540}] );
	ChallengeData.TARGETS.push ( [{'x':641, 'y':539}, 	{'x':280, 'y':300}] );
	ChallengeData.TARGETS.push ( [{'x':520, 'y':120}, {'x':160, 'y':240}, {'x':280, 'y':420}, {'x':640, 'y':540}, {'x':700, 'y':417}] );
	ChallengeData.TARGETS.push ( [{'x':100, 'y':57}] );
	ChallengeData.TARGETS.push ( [{'x':520, 'y':63}, 	{'x':638, 'y':423}] );
	ChallengeData.TARGETS.push ( [{'x':220, 'y':540}] );
	ChallengeData.TARGETS.push ( [{'x':460, 'y':299}] );
	ChallengeData.TARGETS.push ( [{'x':640, 'y':59}, 	{'x':640, 'y':540},		{'x':159, 'y':540}, 	{'x':159, 'y':59}] );

	ChallengeData.HELP_VOICEOVER = Assets.HELP_SOUND;

	ChallengeData.VOICEOVER = [];
	ChallengeData.VOICEOVER.push(Assets.CHALLENGE_SOUNDS[0]);
	ChallengeData.VOICEOVER.push(Assets.CHALLENGE_SOUNDS[1]);
	ChallengeData.VOICEOVER.push(Assets.CHALLENGE_SOUNDS[2]);
	ChallengeData.VOICEOVER.push(Assets.CHALLENGE_SOUNDS[3]);
	ChallengeData.VOICEOVER.push(Assets.CHALLENGE_SOUNDS[4]);
	ChallengeData.VOICEOVER.push(Assets.CHALLENGE_SOUNDS[5]);
	ChallengeData.VOICEOVER.push(Assets.CHALLENGE_SOUNDS[6]);
	ChallengeData.VOICEOVER.push(Assets.CHALLENGE_SOUNDS[7]);

	ChallengeData.WELL_DONE_MESSAGE = "Congratulations, you've cracked it!";
	ChallengeData.TOLERANCE = 50;
	ChallengeData.TOLERANCE_SQUARED = ChallengeData.TOLERANCE*ChallengeData.TOLERANCE;
	return ChallengeData;
});

