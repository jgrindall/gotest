
define([], function() {
	
	"use strict";
	
   	var ChallengeData = function (){
			
    };

	ChallengeData.RADIUS = 50;

	ChallengeData.MESSAGES = [];
	ChallengeData.MESSAGES.push("Guide the fish to the treasure!");
	ChallengeData.MESSAGES.push("Guide the car to bank, and then to the hospital!");
	ChallengeData.MESSAGES.push("Fly to both of the poppies!");
	ChallengeData.MESSAGES.push("Get to the cheese!");
	ChallengeData.MESSAGES.push("Drive the car around the track!");
	ChallengeData.MESSAGES.push("Write a program to draw a star shape!");
	
	ChallengeData.CHALLENGE_BG = 			[4, 2, 0, 6, 5, 10];
	ChallengeData.CHALLENGE_SCREEN = 		[0, 1, 2, 2, 3, 3];
	ChallengeData.CHALLENGE_COLOR = 		[0, 0, 2, 0, 0, 2];
	ChallengeData.CHALLENGE_STEP_LENGTH = 	[3, 2, 2, 2, 2, 2];
	ChallengeData.CHALLENGE_GRID = 			[1, 1, 1, 1, 1, 0];
	ChallengeData.CHALLENGE_PROG = 			[0, 0, 1, 2, 2, 3];
	ChallengeData.CHALLENGE_ALLOW_PROG = 	[0, 0, 1, 1, 1, 1];
	ChallengeData.CHALLENGE_TURTLE = 		[1, 2, 6, 7, 2, 8];
	ChallengeData.CHALLENGE_DIAG = 			[1, 1, 1, 1, 1, 1];
	ChallengeData.CHALLENGE_START_POS = 	[{'x':0.8, 'y':0.1}, {'x':0.8, 'y':0.2}, {'x':0.2, 'y':0.9}, {'x':0.05, 'y':0.8}, {'x':0.5, 'y':0.1}, {'x':0.5, 'y':0.5}];

	ChallengeData.ORDERED = 				[false, true, false, false, true, false];

	ChallengeData.TARGETS = [];
	ChallengeData.TARGETS.push ( [{'x':280, 'y':540}] );
	ChallengeData.TARGETS.push ( [{'x':641, 'y':539}, 	{'x':280, 'y':300}] );
	ChallengeData.TARGETS.push ( [{'x':520, 'y':63}, 	{'x':638, 'y':423}] );
	ChallengeData.TARGETS.push ( [{'x':460, 'y':299}] );
	ChallengeData.TARGETS.push ( [{'x':640, 'y':59}, 	{'x':640, 'y':300},		{'x':279, 'y':300},		{'x':279, 'y':540},		{'x':159, 'y':540}, 	{'x':159, 'y':300}, 	{'x':159, 'y':59}, 	{'x':280, 'y':59}] );
	ChallengeData.TARGETS.push ( [] );

	ChallengeData.WELL_DONE_MESSAGE = "Well done, you've cracked it!";
	ChallengeData.TOLERANCE = 50;
	ChallengeData.TOLERANCE_SQUARED = ChallengeData.TOLERANCE*ChallengeData.TOLERANCE;
	return ChallengeData;
});

