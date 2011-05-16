/**
 * Protocol Representation Language.
 * 
 * Protocols are JSON objects, with a particular format. A protocol is a list, each element is either a question (an object) or another list.
 * 
 *  [SEQUENTIAL, q1, q2, 3] = ask q1,q2,q3 in sequence.
 *  [ONE_OF, [1/3, 2/3], q1, q2] = ask one of q1 or q2, ask q1 with 1/3 probability and q2 with 2/3 probability
 *  [RANDOM_ORDER, q1, q2, q3] = ask all of q1,q2,q3 but in random order.
 *  [SWITCH, cond-q, q1, q2, q3] = always show cond-q but the one after depends on the choice the user makes in cond-q
 *  They can be nested, arbitrarily deep.
 *  
 *  [SEQUENTIAL, q1, [RANDOM_ORDER, q2, q3], q4]
 * 
 * A question an abject, with an 'id', 'text', and optional 'answers'.
 * {id: "cancerGruesomeImage1", text: "Cancer Gruesome Image 1",  answers: ["alpha", "beta", "gamma", "delta"]},
 * 
 * A question can turn on/off other questions based on the choice a user makes:
 * {
             id: "switch-cond",
             text: "Which one of these is your most favorite?",
             answers: ["red", "blue", "green"],
             switches: [{
                  show: ["chose-red"],
                  hide: ["chose-blue", "chose-green"]},{
                  show: ["chose-blue"],
                  hide: ["chose-red", "chose-green"]},{
                  show: ["chose-green"],
                  hide: ["chose-red", "chose-blue"]}]}
                  
 *
 * The inserted questions (in the switches above) can be inserted after any existing card, using 'insertafter':
 * 
 * {
               id: "chose-red",
               text: "Which one of these is your most favorite?",
               answers: ["blue", "green"],
               insertafter: "sliderq"
     }
 *
 * To automatically generate all ordering questions, set switches=true, as in
 * {
          id: "ordering",
          text: "Of these, which one is your favorite?",
          answers: ["Kirby", "Mario", "Luigi", "Bowser"],
          switches: true
        }
 *                  
 * 'id's should be unique
 * 
 * . 
 */
var SEQUENTIAL = 0;  //constants
var ONE_OF = 1;
var RANDOM_ORDER = 2;

var controlGroupTemplateold = [
    SEQUENTIAL, {
     id: "control0", type: "mc",
    text: "Control question 1",
    answers: ["alpha", "beta", "gamma", "delta"]
    },{
     id: "control1", type: "mc",
    text: "Control question 2",
    answers: ["alpha", "beta", "gamma", "delta"]
    },{
     id: "control2", type: "mc",
    text: "Control question 3",
    answers: ["alpha", "beta", "gamma", "delta"]
 	},{
	id: "control3", type: "mc",
	text: "Control question 4",
	answers: ["alpha", "beta", "gamma", "delta"]}
];

var controlGroupTemplate = [
  RANDOM_ORDER,
  [SEQUENTIAL, {
    id: "control0", type: "mc",
    text: "Control question 1"},{
     id: "Controlaccept0-grab", text:"On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message <br/><br/>... grabs your attention", value: 5, minValue: 1, maxValue: 10 
    },{
	id: "Controlaccept0-believable", text: "(INTERVIEWER NOTE: ONLY REPEAT PREAMBLE IF NECESSARY. On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message) <br/><br/> ...is believable", value: 5, minValue: 1, maxValue: 10 
    },{
     id: "Controlaccept0-relevant", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...is relevant to you", value: 5, minValue: 1, maxValue: 10 
    },{
     id: "Controlaccept0-alarm", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...is alarming", value: 5, minValue: 1, maxValue: 10
	},{
     id: "Controlaccept0-concern", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...makes people more concerned about the health risks of smoking", value: 5, minValue: 1, maxValue: 10
	},{
     id: "Controlaccept0-young", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...would help prevent young people from starting to smoke ", value: 5, minValue: 1, maxValue: 10
	},{
     id: "Controlaccept0-quit", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...would make smokers want to quit", value: 5, minValue: 1, maxValue: 10
	},{
     id: "Controlaccept0-overall", text: "Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10
	}],
   [SEQUENTIAL, {
    id: "control1", type: "mc",
    text: "Control question 2"},{
     id: "Controlaccept1-grab", text:"On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message<br/><br/> ...grabs your attention", value: 5, minValue: 1, maxValue: 10 
    },{
	id: "Controlaccept1-believable", text: "(INTERVIEWER NOTE: ONLY REPEAT PREAMBLE IF NECESSARY. On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message) <br/><br/> ...is believable", value: 5, minValue: 1, maxValue: 10 
    },{
     id: "Controlaccept1-relevant", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...is relevant to you", value: 5, minValue: 1, maxValue: 10 
    },{
     id: "Controlaccept1-alarm", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...is alarming", value: 5, minValue: 1, maxValue: 10
	},{
     id: "Controlaccept1-concern", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...makes people more concerned about the health risks of smoking", value: 5, minValue: 1, maxValue: 10
	},{
     id: "Controlaccept1-young", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...would help prevent young people from starting to smoke ", value: 5, minValue: 1, maxValue: 10
	},{
     id: "Controlaccept1-quit", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...would make smokers want to quit", value: 5, minValue: 1, maxValue: 10
	},{
     id: "Controlaccept1-overall", text: "Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10
	}],
   [SEQUENTIAL,{
    id: "control2", type: "mc",
    text: "Control question 3"},{
     id: "Controlaccept2-grab", text:"On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message <br/><br/> ...grabs your attention", value: 5, minValue: 1, maxValue: 10 
    },{
	id: "Controlaccept2-believable", text: "(INTERVIEWER NOTE: ONLY REPEAT PREAMBLE IF NECESSARY. On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message) <br/><br/> ...is believable", value: 5, minValue: 1, maxValue: 10 
    },{
     id: "Controlaccept2-relevant", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...is relevant to you", value: 5, minValue: 1, maxValue: 10 
    },{
     id: "Controlaccept2-alarm", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...is alarming", value: 5, minValue: 1, maxValue: 10
	},{
     id: "Controlaccept2-concern", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...makes people more concerned about the health risks of smoking", value: 5, minValue: 1, maxValue: 10
	},{
     id: "Controlaccept2-young", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...would help prevent young people from starting to smoke ", value: 5, minValue: 1, maxValue: 10
	},{
     id: "Controlaccept2-quit", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...would make smokers want to quit", value: 5, minValue: 1, maxValue: 10
	},{
     id: "Controlaccept2-overall", text: "Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10
	}],
   [SEQUENTIAL,{
    id: "control3", type: "mc",
    text: "Control question 4"},{
     id: "Controlaccept3-grab", text:"On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message... grabs your attention", value: 5, minValue: 1, maxValue: 10 
    },{
	id: "Controlaccept3-believable", text: "(INTERVIEWER NOTE: ONLY REPEAT PREAMBLE IF NECESSARY. On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message) <br/><br/> ...is believable", value: 5, minValue: 1, maxValue: 10 
    },{
     id: "Controlaccept3-relevant", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...is relevant to you", value: 5, minValue: 1, maxValue: 10 
    },{
     id: "Controlaccept3-alarm", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...is alarming", value: 5, minValue: 1, maxValue: 10
	},{
     id: "Controlaccept3-concern", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...makes people more concerned about the health risks of smoking", value: 5, minValue: 1, maxValue: 10
	},{
     id: "Controlaccept3-young", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...would help prevent young people from starting to smoke ", value: 5, minValue: 1, maxValue: 10
	},{
     id: "Controlaccept3-quit", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...would make smokers want to quit", value: 5, minValue: 1, maxValue: 10
	},{
     id: "Controlaccept3-overall", text: "Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10
	}],
	[SEQUENTIAL, {
	    id: "control3", type: "mc",
	    text: "Control question 4"},{
	     id: "Controlaccept4-grab", text:"On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message <br/><br/> ...grabs your attention", value: 5, minValue: 1, maxValue: 10 
	    },{
		id: "Controlaccept4-believable", text: "(INTERVIEWER NOTE: ONLY REPEAT PREAMBLE IF NECESSARY. On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message) <br/><br/> ...is believable", value: 5, minValue: 1, maxValue: 10 
	    },{
	     id: "Controlaccept4-relevant", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...is relevant to you", value: 5, minValue: 1, maxValue: 10 
	    },{
	     id: "Controlaccept4-alarm", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...is alarming", value: 5, minValue: 1, maxValue: 10
		},{
	     id: "Controlaccept4-concern", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...makes people more concerned about the health risks of smoking", value: 5, minValue: 1, maxValue: 10
		},{
	     id: "Controlaccept4-young", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...would help prevent young people from starting to smoke ", value: 5, minValue: 1, maxValue: 10
		},{
	     id: "Controlaccept4-quit", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...would make smokers want to quit", value: 5, minValue: 1, maxValue: 10
		},{
	     id: "Controlaccept4-overall", text: "Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10
		}]

];

var cancerGruesome = [

    SEQUENTIAL,

    [ONE_OF,

     [1/3, 1/3, 1/3],     

      {id: "cancerGruesomeImageA", text: "Cancer Gruesome A"},

      {id: "cancerGruesomeImageB", text: "Cancer Gruesome B"},

      {id: "cancerGruesomeImageC", text: "Cancer Gruesome C"}

     ],{

     id: "CancerGrueAccep-grab", text: "On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extemely', please tell me whether this warning message <br/><br/> ...grabs your attention", value: 5, minValue: 1, maxValue: 10 

    },{

     id: "CancerGrueAccep-believable", text: "(INTERVIEWER NOTE: ONLY REPEAT PREAMBLE IF NECESSARY. On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message) <br/><br/> ... is believable", value: 5, minValue: 1, maxValue: 10 

    },{

     id: "CancerGrueAccep-relevant", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...is relevant to you", value: 5, minValue: 1, maxValue: 10 

    },{

     id: "CancerGrueAccep-alarm", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...is alarming", value: 5, minValue: 1, maxValue: 10

	},{

     id: "CancerGrueAccep-concern", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...makes people more concerned about the health risks of smoking", value: 5, minValue: 1, maxValue: 10

	},{

     id: "CancerGrueAccep-young", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...would help prevent young people from starting to smoke ", value: 5, minValue: 1, maxValue: 10

	},{

     id: "CancerGrueAccep-quit", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...would make smokers want to quit", value: 5, minValue: 1, maxValue: 10

	},{

     id: "CancerGrueAccep-overall", text: "Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10

}

];

var cancerHumanSuffering = [

    SEQUENTIAL,

    [ONE_OF,

     [1/3, 1/3, 1/3],     

      {id: "cancerHumanSufferingImageA", text: "Cancer Human A"},

      {id: "cancerHumanSufferingImageB", text: "Cancer Human B"},

      {id: "cancerHumanSufferingImageC", text: "Cancer Human C"}

     ],{

     id: "CancerHSAccep-grab0", text: "On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extemely', please tell me whether this warning message... grabs your attention", value: 5, minValue: 1, maxValue: 10 

    },{

     id: "CancerHSAccep-believable", text: "(INTERVIEWER NOTE: ONLY REPEAT PREAMBLE IF NECESSARY. On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message) <br/><br/> ...is believable", value: 5, minValue: 1, maxValue: 10 

    },{

     id: "CancerHSAccep-relevant", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...is relevant to you", value: 5, minValue: 1, maxValue: 10 

    },{

     id: "CancerHSAccep-alarm", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...is alarming", value: 5, minValue: 1, maxValue: 10

	},{

     id: "CancerHSAccep-concern", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...makes people more concerned about the health risks of smoking", value: 5, minValue: 1, maxValue: 10

	},{

     id: "CancerHSAccep-young", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...would help prevent young people from starting to smoke ", value: 5, minValue: 1, maxValue: 10

	},{

     id: "CancerHSAccep-quit", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...would make smokers want to quit", value: 5, minValue: 1, maxValue: 10

	},{

     id: "CancerHSAccep-overall", text: "Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10

}

];

	var cancerSymbolic = [

	    SEQUENTIAL,

	    [ONE_OF,

	     [1/3, 1/3, 1/3],     

	      {id: "cancerSymbolicImageA", text: "Cancer Symbolic A"},

	      {id: "cancerSymbolicImageB", text: "Cancer Symbolic B"},

	      {id: "cancerSymbolicImageC", text: "Cancer Symbolic C"}

	     ],{

	     id: "CancerHSAccep-grab", text: "On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extemely', please tell me whether this warning message <br/><br/> ...grabs your attention", value: 5, minValue: 1, maxValue: 10 

	    },{

	     id: "CancerSymbolicAccep-believable", text: "(INTERVIEWER NOTE: ONLY REPEAT PREAMBLE IF NECESSARY. On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message) <br/><br/> ...is believable", value: 5, minValue: 1, maxValue: 10 

	    },{

	     id: "CancerSymbolicAccep-relevant", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...is relevant to you", value: 5, minValue: 1, maxValue: 10 

	    },{

	     id: "CancerSymbolicAccep-alarm", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...is alarming", value: 5, minValue: 1, maxValue: 10

		},{

	     id: "CancerSymbolicAccep-concern", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...makes people more concerned about the health risks of smoking", value: 5, minValue: 1, maxValue: 10

		},{

	     id: "CancerSymbolicAccep-young", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...would help prevent young people from starting to smoke ", value: 5, minValue: 1, maxValue: 10

		},{

	     id: "CancerSymbolicAccep-quit", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...would make smokers want to quit", value: 5, minValue: 1, maxValue: 10

		},{

	     id: "CancerSymbolicAccep-overall", text: "Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10

}

];

var CVDGruesome = [

    SEQUENTIAL,

    [ONE_OF,

     [1/3, 1/3, 1/3],     

      {id: "CVDGruesomeImageA", text: "CVD Gruesome A"},

      {id: "CVDGruesomeImageB", text: "CVD Gruesome B"},

      {id: "CVDGruesomeImageC", text: "CVD Gruesome C"}

     ],{

     id: "CVDGrueAccep-grab", text: "On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extemely', please tell me whether this warning message <br/> <br/> ...grabs your attention", value: 5, minValue: 1, maxValue: 10 

    },{

     id: "CVDGrueAccep-believable", text: "(INTERVIEWER NOTE: ONLY REPEAT PREAMBLE IF NECESSARY. On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message) <br/><br/> ...is believable", value: 5, minValue: 1, maxValue: 10 

    },{

     id: "CVDGrueAccep-relevant", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...is relevant to you", value: 5, minValue: 1, maxValue: 10 

    },{

     id: "CVDGrueAccep-alarm", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...is alarming", value: 5, minValue: 1, maxValue: 10

	},{

     id: "CVDGrueAccep-concern", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...makes people more concerned about the health risks of smoking", value: 5, minValue: 1, maxValue: 10

	},{

     id: "CVDGrueAccep-young", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...would help prevent young people from starting to smoke ", value: 5, minValue: 1, maxValue: 10

	},{

     id: "CVDGrueAccep-quit", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...would make smokers want to quit", value: 5, minValue: 1, maxValue: 10

	},{

     id: "CVDGrueAccep-overall", text: "Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10

}

];

var CVDHumanSuffering = [

    SEQUENTIAL,

    [ONE_OF,

     [1/3, 1/3, 1/3],     

      {id: "CVDHumanSufferingImageA", text: "CVD Human A"},

      {id: "CVDHumanSufferingImageB", text: "CVD Human B"},

      {id: "CVDHumanSufferingImageC", text: "CVD Human C"}

     ],{

     id: "CVDHSAccep-grab", text: "On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extemely', please tell me whether this warning message <br/><br/> ...grabs your attention", value: 5, minValue: 1, maxValue: 10 

    },{

     id: "CVDHSAccep-believable", text: "(INTERVIEWER NOTE: ONLY REPEAT PREAMBLE IF NECESSARY. On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message) <br/><br/> ...is believable", value: 5, minValue: 1, maxValue: 10 

    },{

     id: "CVDHSAccep-relevant", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...is relevant to you", value: 5, minValue: 1, maxValue: 10 

    },{

     id: "CVDHSAccep-alarm", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...is alarming", value: 5, minValue: 1, maxValue: 10

	},{

     id: "CVDHSAccep-concern", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...makes people more concerned about the health risks of smoking", value: 5, minValue: 1, maxValue: 10

	},{

     id: "CVDHSAccep-young", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...would help prevent young people from starting to smoke ", value: 5, minValue: 1, maxValue: 10

	},{

     id: "CVDHSAccep-quit", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...would make smokers want to quit", value: 5, minValue: 1, maxValue: 10

	},{

     id: "CVDHSAccep-overall", text: "Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10

}

];

	var CVDSymbolic = [

	    SEQUENTIAL,

	    [ONE_OF,

	     [1/3, 1/3, 1/3],     

	      {id: "CVDSymbolicImageA", text: "CVD Symbolic A"},

	      {id: "CVDSymbolicImageB", text: "CVD Symbolic B"},

	      {id: "CVDSymbolicImageC", text: "CVD Symbolic C"}

	     ],{

	     id: "CVDSAccep-grab", text: "On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extemely', please tell me whether this warning message<br/><br/> ...grabs your attention", value: 5, minValue: 1, maxValue: 10 

	    },{

	     id: "CVDSymbolicAccep-believable", text: "(INTERVIEWER NOTE: ONLY REPEAT PREAMBLE IF NECESSARY. On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message) <br/><br/> ... is believable", value: 5, minValue: 1, maxValue: 10 

	    },{

	     id: "CVDSymbolicAccep-relevant", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...is relevant to you", value: 5, minValue: 1, maxValue: 10 

	    },{

	     id: "CVDSymbolicAccep-alarm", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...is alarming", value: 5, minValue: 1, maxValue: 10

		},{

	     id: "CVDSymbolicAccep-concern", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...makes people more concerned about the health risks of smoking", value: 5, minValue: 1, maxValue: 10

		},{

	     id: "CVDSymbolicAccep-young", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...would help prevent young people from starting to smoke ", value: 5, minValue: 1, maxValue: 10

		},{

	     id: "CVDSymbolicAccep-quit", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...would make smokers want to quit", value: 5, minValue: 1, maxValue: 10

		},{

	     id: "CVDSymbolicAccep-overall", text: "Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10

}

];

var SHSGruesome = [

    SEQUENTIAL,

    [ONE_OF,

     [1/3, 1/3, 1/3],     

      {id: "SHSGruesomeImageA", text: "SHS Gruesome A"},

      {id: "SHSGruesomeImageB", text: "SHS Gruesome B"},

      {id: "SHSGruesomeImageC", text: "SHS Gruesome C"}

     ],{

     id: "SHSGrueAccep-grab", text: "On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extemely', please tell me whether this warning message <br/><br/> ...grabs your attention", value: 5, minValue: 1, maxValue: 10 

    },{

     id: "SHSGrueAccep-believable", text: "(INTERVIEWER NOTE: ONLY REPEAT PREAMBLE IF NECESSARY. On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message) <br/><br/> ...is believable", value: 5, minValue: 1, maxValue: 10 

    },{

     id: "SHSGrueAccep-relevant", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...is relevant to you", value: 5, minValue: 1, maxValue: 10 

    },{

     id: "SHSGrueAccep-alarm", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...is alarming", value: 5, minValue: 1, maxValue: 10

	},{

     id: "SHSGrueAccep-concern", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...makes people more concerned about the health risks of smoking", value: 5, minValue: 1, maxValue: 10

	},{

     id: "SHSGrueAccep-young", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...would help prevent young people from starting to smoke ", value: 5, minValue: 1, maxValue: 10

	},{

     id: "SHSGrueAccep-quit", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...would make smokers want to quit", value: 5, minValue: 1, maxValue: 10

	},{

     id: "SHSGrueAccep-overall", text: "Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10

}

];

var SHSHumanSuffering = [

    SEQUENTIAL,

    [ONE_OF,

     [1/3, 1/3, 1/3],     

      {id: "SHSHumanSufferingImageA", text: "SHS Human A"},

      {id: "SHSHumanSufferingImageB", text: "SHS Human B"},

      {id: "SHSHumanSufferingImageC", text: "SHS Human C"}

     ],{

     id: "SHSHSAccep-grab", text: "On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extemely', please tell me whether this warning message <br/><br/> ...grabs your attention", value: 5, minValue: 1, maxValue: 10 

    },{

     id: "SHSHSAccep-believable", text: "(INTERVIEWER NOTE: ONLY REPEAT PREAMBLE IF NECESSARY. On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message) <br/><br/> ...is believable", value: 5, minValue: 1, maxValue: 10 

    },{

     id: "SHSHSAccep-relevant", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...is relevant to you", value: 5, minValue: 1, maxValue: 10 

    },{

     id: "SHSHSAccep-alarm", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...is alarming", value: 5, minValue: 1, maxValue: 10

	},{

     id: "SHSHSAccep-concern", text: "... makes people more concerned about the health risks of smoking", value: 5, minValue: 1, maxValue: 10

	},{

     id: "SHSHSAccep-young", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...would help prevent young people from starting to smoke ", value: 5, minValue: 1, maxValue: 10

	},{

     id: "SHSHSAccep-quit", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...would make smokers want to quit", value: 5, minValue: 1, maxValue: 10

	},{

     id: "SHSHSAccep-overall", text: "Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10

}

];

	var SHSSymbolic = [

	    SEQUENTIAL,

	    [ONE_OF,

	     [1/3, 1/3, 1/3],     

	      {id: "SHSSymbolicImageA", text: "SHS Symbolic A"},

	      {id: "SHSSymbolicImageB", text: "SHS Symbolic B"},

	      {id: "SHSSymbolicImageC", text: "SHS Symbolic C"}

	     ],{

	     id: "SHSSSAccep-grab", text: "On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extemely', please tell me whether this warning message <br/><br/> ...grabs your attention", value: 5, minValue: 1, maxValue: 10 

	    },{

	     id: "SHSSymbolicAccep-believable", text: "(INTERVIEWER NOTE: ONLY REPEAT PREAMBLE IF NECESSARY. On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message) <br/><br/> ...is believable", value: 5, minValue: 1, maxValue: 10 

	    },{

	     id: "SHSSymbolicAccep-relevant", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...is relevant to you", value: 5, minValue: 1, maxValue: 10 

	    },{

	     id: "SHSSymbolicAccep-alarm", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...is alarming", value: 5, minValue: 1, maxValue: 10

		},{

	     id: "SHSSymbolicAccep-concern", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...makes people more concerned about the health risks of smoking", value: 5, minValue: 1, maxValue: 10

		},{

	     id: "SHSSymbolicAccep-young", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...would help prevent young people from starting to smoke ", value: 5, minValue: 1, maxValue: 10

		},{

	     id: "SHSSymbolicAccep-quit", text: "(ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...would make smokers want to quit", value: 5, minValue: 1, maxValue: 10

		},{

	     id: "SHSSymbolicAccep-overall", text: "Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10

}

]


var healthTopicCancer  = [
    SEQUENTIAL, [
      RANDOM_ORDER,
      cancerGruesome,
      cancerHumanSuffering,
      cancerSymbolic],{
     id: "mostimapactCancer", 
        text: "7. Overall, which warning do you think is the most effective for motivating you to quit?",  
        answers: ["gruesome img", "human suffering image", "symbolic image"],
        switches: true}
];

var healthTopicCVD = [
    SEQUENTIAL, [
      RANDOM_ORDER,
      CVDGruesome,
      CVDHumanSuffering,
      CVDSymbolic], 
      {
        id: "mostimapactCVD", 
         text: "7. Overall, which warning do you think is the most effective for motivating you to quit?",  
         answers: ["gruesome image", "human suffering image", "symbolic image"],
         switches: true
      }
];

var healthTopicSHS = [
    SEQUENTIAL, [
      RANDOM_ORDER,
      SHSGruesome,
      SHSHumanSuffering,
      SHSSymbolic],
      {
         id: "mostimapactSHS", 
         text: "Overall, which warning do you think is the most effective for motivating you to quit?",  
         answers: ["gruesome image", "human suffering image", "symbolic image"],
         switches: true
      }
];

var experimentalGroupTemplate = [
    RANDOM_ORDER,
     healthTopicCancer,
     healthTopicCVD,
     healthTopicSHS
];

var surveyTemplate = {
     id: "100",
     name: "Smoking Survey",
     questions: [
         SEQUENTIAL, {
          id: "gender",
          text: "Select gender of respondent (DO NOT READ)",
          answers: ["MALE", "FEMALE"]
        },{
     
             id: "age",
             text: "To begin, may I ask your age? (IF AGE<18- UNFORTUNATELY, WE CAN ONLY INCLUDE PEOPLE WHO ARE 18 AND OLDER IN THIS STUDY. SORRY, YOU ARE NOT ELIGIBLE TO PARTICIPATE, BUT THANK YOU FOR YOUR TIME.)"
        },{
               id: "education",
               text: "What is the highest level of education that you have completed?",
            answers: ["Did not attend school", "Primary school completed", "Middle school completed", "High school or GED", "Technical or vocational school", "University (incomplete)", "University (complete)", "Post graduate", "Other", "Don't know"]
        },{
     
          id: "consume1",
             text: "In the past 30 days, on how many days did you smoke?"
        },{
          
          id: "consume2",
             text: "On the days that you smoke, how many cigarettes do you smoke on average?"
        },{

          id: "waking",
          text: "How soon after waking do you usually have your first cigarette?",
          answers: ["Within the first 5 minutes", "6-30 minutes", "31-60 minutes", "More than 60 minutes"]
          
          },{

               id: "brand0",
               text: "Do you have a brand of cigarettes that you usually smoke?",
               answers: ["Yes","No"]
     
          },{

               id: "brand1",
               text: "What is the full name of your usual cigarette brand?"
          },{
               
               id: "quitplan",
               text: "Are you planning to quit smoking cigarettes...(READ OUT LOUD)",
               answers: ["Within the next month?", "Within the next 6 months","Sometime in the future, beyond 6 months?", "No, I am not planning to quit"]
          },{
          
               id: "future",
               text: "How worried are you, if at all, that smoking will damage your health in the future?",
               answers: ["Not all all worried", "A little worried", "Very worried"]
          },{
          
              id: "society",
              text: "Please tell me whether you agree, neither agree nor disagree, or disagree with each of the following: <br/><br/> Society approves of smoking.",
               answers: ["Agree", "Neither agree not disagree","Disagree"]
          },{

              id: "cigsmoke",
              text: "Cigarette smoking is dangerous to non-smokers.",
              answers: ["Agree", "Neither agree not disagree","Disagree"]
                    
          },{
              id: "quithard",
              text: "It is very difficult to quit smoking cigarettes.",
              answers: ["Agree", "Neither agree not disagree","Disagree"]

          },{
          
              id: "nodamage",
              text: "Smoking a cigarette every once in a while does not damage your health.",
              answers: ["Agree", "Neither agree not disagree","Disagree"]

          },{
              id: "healthinfo",
              text: "Do you think that cigarette packaging should have more health information than they do now, less information, or about the same amount as they do no?",
              answers: ["Less health information", "About the same","More health information"]
          
          },{

              id: "healthgra",
              text: "Do you think that cigarette packages should have more graphic pictures on them than they do now, less information, or about the same amount as they do now?",
              answers: ["Less health information", "About the same","More health information"]
               
          },{
              id: "notice",
              text: "In the last month, how often, if at all, have you noticed health warnings on cigarette packages?",
               answers: ["Never","Rarely","Sometimes","Often","Very often"]

          },{
              id: "avoid",
              text: "In the last month, have you made any effort to avoid looking at or thinking about the warning labels?  For example, covering them up, keeping them out of sight, using a cigarette case, avoiding certain warnings, or any other way?",
              answers: ["Yes","No"]

          },{
              id: "think",
              text: "To what extent, if at all, do the warning labels make you think about the health risks of smoking?",
              answers: ["Not at all","A little","Somewhat","A lot"]
          },[
              ONE_OF,
              [.8, .2],
              experimentalGroupTemplate,
              controlGroupTemplate
             ]
     ]};
