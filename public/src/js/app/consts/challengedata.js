
define([], function() {
	
	"use strict";
	
   	var ChallengeData = function (){
			
    };

	ChallengeData.MESSAGES = 				[];
	ChallengeData.MESSAGES.push("Guide the fish to the treasure!");
	ChallengeData.MESSAGES.push("Guide the car to bank, and then to the hospital!");
	ChallengeData.MESSAGES.push("Fly to both of the poppies!");
	ChallengeData.MESSAGES.push("Get to the cheese!");
	ChallengeData.MESSAGES.push("Drive the car around the track!");
	ChallengeData.MESSAGES.push("Write a program to draw a star shape!");
	

	ChallengeData.CHALLENGE_BG = 			[4, 2, 0, 6, 5, 10];
	ChallengeData.CHALLENGE_SCREEN = 		[0, 1, 2, 2, 3, 3];
	ChallengeData.CHALLENGE_COLOR = 		[0, 0, 2, 0, 0, 9];
	ChallengeData.CHALLENGE_STEP_LENGTH = 	[4, 2, 2, 2, 2, 2];
	ChallengeData.CHALLENGE_GRID = 			[1, 1, 1, 1, 1, 0];
	ChallengeData.CHALLENGE_PROG = 			[0, 0, 1, 2, 2, 3];
	ChallengeData.CHALLENGE_ALLOW_PROG = 	[0, 0, 1, 1, 1, 1];
	ChallengeData.CHALLENGE_TURTLE = 		[1, 2, 6, 7, 2, 8];
	ChallengeData.CHALLENGE_DIAG = 			[1, 1, 1, 1, 1, 1];
	ChallengeData.CHALLENGE_START_POS = 	[{'x':0.8, 'y':0.1}, {'x':0.8, 'y':0.2}, {'x':0.2, 'y':0.9}, {'x':0.05, 'y':0.8}, {'x':0.5, 'y':0.1}, {'x':0.5, 'y':0.5}];

	return ChallengeData;
});

