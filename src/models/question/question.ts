export interface Answer {
	answer1 : string;
	answer2 : string;
	answer3 : string;
	answer4 : string;
}

export interface Question {
	key? : string;
	question : string;
	answer : Answer;
}

export interface DiagramQuestion {
	key? : string;
	question : string;
	diagram : string;
	answer : Answer;
}


/*

export interface Question {
	key? : string;
	question : string;
	answer : [
		{  answer1 : string;  },
		{  answer2 : string;  },
		{  answer3 : string;  },
		{  answer4 : string;  }
	];
}

*/