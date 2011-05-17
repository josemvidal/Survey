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
     id: "Controlaccept0-grab", text:"CA1:  On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message <br/><br/>... grabs your attention", value: 5, minValue: 1, maxValue: 10 
    },{
	id: "Controlaccept0-believable", text: "CA2:  (INTERVIEWER NOTE: ONLY REPEAT PREAMBLE IF NECESSARY. On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message) <br/><br/> ...is believable", value: 5, minValue: 1, maxValue: 10 
    },{
     id: "Controlaccept0-relevant", text: "CA3:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...is relevant to you", value: 5, minValue: 1, maxValue: 10 
    },{
     id: "Controlaccept0-alarm", text: "CA4:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...is alarming", value: 5, minValue: 1, maxValue: 10
	},{
     id: "Controlaccept0-concern", text: "CA5:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...makes people more concerned about the health risks of smoking", value: 5, minValue: 1, maxValue: 10
	},{
     id: "Controlaccept0-young", text: "CA6:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...would help prevent young people from starting to smoke ", value: 5, minValue: 1, maxValue: 10
	},{
     id: "Controlaccept0-quit", text: "CA7:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...would make smokers want to quit", value: 5, minValue: 1, maxValue: 10
	},{
     id: "Controlaccept0-overall", text: "CA8:  Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10
	}],
   [SEQUENTIAL, {
    id: "control1", type: "mc",
    text: "Control question 2"},{
     id: "Controlaccept1-grab", text:"CB1:  On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message<br/><br/> ...grabs your attention", value: 5, minValue: 1, maxValue: 10 
    },{
	id: "Controlaccept1-believable", text: "CB2:  (INTERVIEWER NOTE: ONLY REPEAT PREAMBLE IF NECESSARY. On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message) <br/><br/> ...is believable", value: 5, minValue: 1, maxValue: 10 
    },{
     id: "Controlaccept1-relevant", text: "CB3:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...is relevant to you", value: 5, minValue: 1, maxValue: 10 
    },{
     id: "Controlaccept1-alarm", text: "CB4:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...is alarming", value: 5, minValue: 1, maxValue: 10
	},{
     id: "Controlaccept1-concern", text: "CB5:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...makes people more concerned about the health risks of smoking", value: 5, minValue: 1, maxValue: 10
	},{
     id: "Controlaccept1-young", text: "CB6:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...would help prevent young people from starting to smoke ", value: 5, minValue: 1, maxValue: 10
	},{
     id: "Controlaccept1-quit", text: "CB7:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...would make smokers want to quit", value: 5, minValue: 1, maxValue: 10
	},{
     id: "Controlaccept1-overall", text: "CB8:  Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10
	}],
   [SEQUENTIAL,{
    id: "control2", type: "mc",
    text: "Control question 3"},{
     id: "Controlaccept2-grab", text:"CC1:  On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message <br/><br/> ...grabs your attention", value: 5, minValue: 1, maxValue: 10 
    },{
	id: "Controlaccept2-believable", text: "CC2:  (INTERVIEWER NOTE: ONLY REPEAT PREAMBLE IF NECESSARY. On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message) <br/><br/> ...is believable", value: 5, minValue: 1, maxValue: 10 
    },{
     id: "Controlaccept2-relevant", text: "CC3:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...is relevant to you", value: 5, minValue: 1, maxValue: 10 
    },{
     id: "Controlaccept2-alarm", text: "CC4:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...is alarming", value: 5, minValue: 1, maxValue: 10
	},{
     id: "Controlaccept2-concern", text: "CC5:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...makes people more concerned about the health risks of smoking", value: 5, minValue: 1, maxValue: 10
	},{
     id: "Controlaccept2-young", text: "CC6:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...would help prevent young people from starting to smoke ", value: 5, minValue: 1, maxValue: 10
	},{
     id: "Controlaccept2-quit", text: "CC7:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...would make smokers want to quit", value: 5, minValue: 1, maxValue: 10
	},{
     id: "Controlaccept2-overall", text: "CC8:  Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10
	}],
   [SEQUENTIAL,{
    id: "control3", type: "mc",
    text: "Control question 4"},{
     id: "Controlaccept3-grab", text:"CD1:  On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message... grabs your attention", value: 5, minValue: 1, maxValue: 10 
    },{
	id: "Controlaccept3-believable", text: "CD2:  (INTERVIEWER NOTE: ONLY REPEAT PREAMBLE IF NECESSARY. On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message) <br/><br/> ...is believable", value: 5, minValue: 1, maxValue: 10 
    },{
     id: "Controlaccept3-relevant", text: "CD3:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...is relevant to you", value: 5, minValue: 1, maxValue: 10 
    },{
     id: "Controlaccept3-alarm", text: "CD4:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...is alarming", value: 5, minValue: 1, maxValue: 10
	},{
     id: "Controlaccept3-concern", text: "CD5:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...makes people more concerned about the health risks of smoking", value: 5, minValue: 1, maxValue: 10
	},{
     id: "Controlaccept3-young", text: "CD6:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...would help prevent young people from starting to smoke ", value: 5, minValue: 1, maxValue: 10
	},{
     id: "Controlaccept3-quit", text: "CD7:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...would make smokers want to quit", value: 5, minValue: 1, maxValue: 10
	},{
     id: "Controlaccept3-overall", text: "CD8:  Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10
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
     id: "CancerGrueAccep-grab", text: "CANG1:  On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extemely', please tell me whether this warning message <br/><br/> ...grabs your attention", value: 5, minValue: 1, maxValue: 10 
    },{
     id: "CancerGrueAccep-believable", text: "CANG2:  (INTERVIEWER NOTE: ONLY REPEAT PREAMBLE IF NECESSARY. On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message) <br/><br/> ... is believable", value: 5, minValue: 1, maxValue: 10 
    },{
     id: "CancerGrueAccep-relevant", text: "CANG3:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...is relevant to you", value: 5, minValue: 1, maxValue: 10 
    },{
     id: "CancerGrueAccep-alarm", text: "CANG4:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...is alarming", value: 5, minValue: 1, maxValue: 10
	},{
     id: "CancerGrueAccep-concern", text: "CANG5:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...makes people more concerned about the health risks of smoking", value: 5, minValue: 1, maxValue: 10
	},{
     id: "CancerGrueAccep-young", text: "CANG6:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...would help prevent young people from starting to smoke ", value: 5, minValue: 1, maxValue: 10
	},{
     id: "CancerGrueAccep-quit", text: "CANG7: (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...would make smokers want to quit", value: 5, minValue: 1, maxValue: 10
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
     id: "CancerHSAccep-grab0", text: "CANHS1: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extemely', please tell me whether this warning message... grabs your attention", value: 5, minValue: 1, maxValue: 10 
    },{
     id: "CancerHSAccep-believable", text: "CANHS2:  (INTERVIEWER NOTE: ONLY REPEAT PREAMBLE IF NECESSARY. On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message) <br/><br/> ...is believable", value: 5, minValue: 1, maxValue: 10 
    },{
     id: "CancerHSAccep-relevant", text: "CANHS3:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...is relevant to you", value: 5, minValue: 1, maxValue: 10 
    },{
     id: "CancerHSAccep-alarm", text: "CANHS4:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...is alarming", value: 5, minValue: 1, maxValue: 10
	},{
     id: "CancerHSAccep-concern", text: "CANHS5:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...makes people more concerned about the health risks of smoking", value: 5, minValue: 1, maxValue: 10
	},{
     id: "CancerHSAccep-young", text: "CANHS6:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...would help prevent young people from starting to smoke ", value: 5, minValue: 1, maxValue: 10
	},{
     id: "CancerHSAccep-quit", text: "CANHS7:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...would make smokers want to quit", value: 5, minValue: 1, maxValue: 10
	},{
     id: "CancerHSAccep-overall", text: "CANHS8:  Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10
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
	     id: "CancerHSAccep-grab", text: "CANSY1: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extemely', please tell me whether this warning message <br/><br/> ...grabs your attention", value: 5, minValue: 1, maxValue: 10 
	    },{
	     id: "CancerSymbolicAccep-believable", text: "CANSY2:  (INTERVIEWER NOTE: ONLY REPEAT PREAMBLE IF NECESSARY. On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message) <br/><br/> ...is believable", value: 5, minValue: 1, maxValue: 10 
	    },{
	     id: "CancerSymbolicAccep-relevant", text: "CANSY3:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...is relevant to you", value: 5, minValue: 1, maxValue: 10 
	    },{
	     id: "CancerSymbolicAccep-alarm", text: "CANSY4:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...is alarming", value: 5, minValue: 1, maxValue: 10
		},{
	     id: "CancerSymbolicAccep-concern", text: "CANSY5:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...makes people more concerned about the health risks of smoking", value: 5, minValue: 1, maxValue: 10
		},{
	     id: "CancerSymbolicAccep-young", text: "CANSY6:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...would help prevent young people from starting to smoke ", value: 5, minValue: 1, maxValue: 10
		},{
	     id: "CancerSymbolicAccep-quit", text: "CANSY7:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...would make smokers want to quit", value: 5, minValue: 1, maxValue: 10
		},{
	     id: "CancerSymbolicAccep-overall", text: "CANSY8:  Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10
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
     id: "CVDGrueAccep-grab", text: "CVDG1:  On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extemely', please tell me whether this warning message <br/> <br/> ...grabs your attention", value: 5, minValue: 1, maxValue: 10 
    },{
     id: "CVDGrueAccep-believable", text: "CVDG2:  (INTERVIEWER NOTE: ONLY REPEAT PREAMBLE IF NECESSARY. On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message) <br/><br/> ...is believable", value: 5, minValue: 1, maxValue: 10 
    },{
     id: "CVDGrueAccep-relevant", text: "CVDG3:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...is relevant to you", value: 5, minValue: 1, maxValue: 10 
    },{
     id: "CVDGrueAccep-alarm", text: "CVDG4:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...is alarming", value: 5, minValue: 1, maxValue: 10
	},{
     id: "CVDGrueAccep-concern", text: "CVDG5:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...makes people more concerned about the health risks of smoking", value: 5, minValue: 1, maxValue: 10
	},{
     id: "CVDGrueAccep-young", text: "CVDG6:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...would help prevent young people from starting to smoke ", value: 5, minValue: 1, maxValue: 10
	},{
     id: "CVDGrueAccep-quit", text: "CVDG7:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...would make smokers want to quit", value: 5, minValue: 1, maxValue: 10
	},{
     id: "CVDGrueAccep-overall", text: "CVDG8:  Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10
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
     id: "CVDHSAccep-grab", text: "CVDHS1:  On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extemely', please tell me whether this warning message <br/><br/> ...grabs your attention", value: 5, minValue: 1, maxValue: 10 
    },{
     id: "CVDHSAccep-believable", text: "CVDHS2:  (INTERVIEWER NOTE: ONLY REPEAT PREAMBLE IF NECESSARY. On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message) <br/><br/> ...is believable", value: 5, minValue: 1, maxValue: 10 
    },{
     id: "CVDHSAccep-relevant", text: "CVDHS3:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...is relevant to you", value: 5, minValue: 1, maxValue: 10 
    },{
     id: "CVDHSAccep-alarm", text: "CVDHS4:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...is alarming", value: 5, minValue: 1, maxValue: 10
	},{
     id: "CVDHSAccep-concern", text: "CVDHS5:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...makes people more concerned about the health risks of smoking", value: 5, minValue: 1, maxValue: 10
	},{
     id: "CVDHSAccep-young", text: "CVDHS6:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...would help prevent young people from starting to smoke ", value: 5, minValue: 1, maxValue: 10
	},{
     id: "CVDHSAccep-quit", text: "CVDHS7:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...would make smokers want to quit", value: 5, minValue: 1, maxValue: 10
	},{
     id: "CVDHSAccep-overall", text: "CVDHS8:  Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10
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
	     id: "CVDSAccep-grab", text: "CVDSY1:  On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extemely', please tell me whether this warning message<br/><br/> ...grabs your attention", value: 5, minValue: 1, maxValue: 10 
	    },{
	     id: "CVDSymbolicAccep-believable", text: "CVDSY2:  (INTERVIEWER NOTE: ONLY REPEAT PREAMBLE IF NECESSARY. On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message) <br/><br/> ... is believable", value: 5, minValue: 1, maxValue: 10 
	    },{
	     id: "CVDSymbolicAccep-relevant", text: "CVDSY3:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...is relevant to you", value: 5, minValue: 1, maxValue: 10 
	    },{
	     id: "CVDSymbolicAccep-alarm", text: "CVDSY4:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...is alarming", value: 5, minValue: 1, maxValue: 10
		},{
	     id: "CVDSymbolicAccep-concern", text: "CVDSY5:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...makes people more concerned about the health risks of smoking", value: 5, minValue: 1, maxValue: 10
		},{
	     id: "CVDSymbolicAccep-young", text: "CVDSY6:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...would help prevent young people from starting to smoke ", value: 5, minValue: 1, maxValue: 10
		},{
	     id: "CVDSymbolicAccep-quit", text: "CVDSY7:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...would make smokers want to quit", value: 5, minValue: 1, maxValue: 10
		},{
	     id: "CVDSymbolicAccep-overall", text: "CVDSY8:  Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10
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
     id: "SHSGrueAccep-grab", text: "SHSG1:  On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extemely', please tell me whether this warning message <br/><br/> ...grabs your attention", value: 5, minValue: 1, maxValue: 10 
    },{
     id: "SHSGrueAccep-believable", text: "SHSG2:  (INTERVIEWER NOTE: ONLY REPEAT PREAMBLE IF NECESSARY. On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message) <br/><br/> ...is believable", value: 5, minValue: 1, maxValue: 10 
    },{
     id: "SHSGrueAccep-relevant", text: "SHSG3:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...is relevant to you", value: 5, minValue: 1, maxValue: 10 
    },{
     id: "SHSGrueAccep-alarm", text: "SHSG4:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...is alarming", value: 5, minValue: 1, maxValue: 10
	},{
     id: "SHSGrueAccep-concern", text: "SHSG5:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...makes people more concerned about the health risks of smoking", value: 5, minValue: 1, maxValue: 10
	},{
     id: "SHSGrueAccep-young", text: "SHSG6:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...would help prevent young people from starting to smoke ", value: 5, minValue: 1, maxValue: 10
	},{
     id: "SHSGrueAccep-quit", text: "SHSG7:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...would make smokers want to quit", value: 5, minValue: 1, maxValue: 10
	},{
     id: "SHSGrueAccep-overall", text: "SHSG8:  Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10
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
     id: "SHSHSAccep-grab", text: "SHSHS1: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extemely', please tell me whether this warning message <br/><br/> ...grabs your attention", value: 5, minValue: 1, maxValue: 10 
    },{
     id: "SHSHSAccep-believable", text: "SHSHS2: (INTERVIEWER NOTE: ONLY REPEAT PREAMBLE IF NECESSARY. On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message) <br/><br/> ...is believable", value: 5, minValue: 1, maxValue: 10 
    },{
     id: "SHSHSAccep-relevant", text: "SHSHS3:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...is relevant to you", value: 5, minValue: 1, maxValue: 10 
    },{
     id: "SHSHSAccep-alarm", text: "SHSHS4:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...is alarming", value: 5, minValue: 1, maxValue: 10
	},{
     id: "SHSHSAccep-concern", text: "SHSHS5:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...makes people more concerned about the health risks of smoking", value: 5, minValue: 1, maxValue: 10
	},{
     id: "SHSHSAccep-young", text: "SHSHS6:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...would help prevent young people from starting to smoke ", value: 5, minValue: 1, maxValue: 10
	},{
     id: "SHSHSAccep-quit", text: "SHSHS7:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...would make smokers want to quit", value: 5, minValue: 1, maxValue: 10
	},{
     id: "SHSHSAccep-overall", text: "SHSHS8:  Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10
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
	     id: "SHSSSAccep-grab", text: "SHSSY1:  On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extemely', please tell me whether this warning message <br/><br/> ...grabs your attention", value: 5, minValue: 1, maxValue: 10 
	    },{
	     id: "SHSSymbolicAccep-believable", text: "SHSSY2:  (INTERVIEWER NOTE: ONLY REPEAT PREAMBLE IF NECESSARY. On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message) <br/><br/> ...is believable", value: 5, minValue: 1, maxValue: 10 
	    },{
	     id: "SHSSymbolicAccep-relevant", text: "SHSSY3:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...is relevant to you", value: 5, minValue: 1, maxValue: 10 
	    },{
	     id: "SHSSymbolicAccep-alarm", text: "SHSSY4:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...is alarming", value: 5, minValue: 1, maxValue: 10
		},{
	     id: "SHSSymbolicAccep-concern", text: "SHSSY5:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...makes people more concerned about the health risks of smoking", value: 5, minValue: 1, maxValue: 10
		},{
	     id: "SHSSymbolicAccep-young", text: "SHSSY6:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...would help prevent young people from starting to smoke ", value: 5, minValue: 1, maxValue: 10
		},{
	     id: "SHSSymbolicAccep-quit", text: "SHSSY7:  (ON A SCALE OF 1 TO 10, WHERE 1 IS 'NOT AT ALL' AND 10 IS 'EXTREMELY', PLEASE TELL ME WHETHER THIS WARNING MESSAGE) <br/><br/> ...would make smokers want to quit", value: 5, minValue: 1, maxValue: 10
		},{
	     id: "SHSSymbolicAccep-overall", text: "SHSSY8:  Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10
}
]


var healthTopicCancer  = [
    SEQUENTIAL, [
      RANDOM_ORDER,
      cancerGruesome,
      cancerHumanSuffering,
      cancerSymbolic],{
     id: "mostimapactCancer", 
        text: "7. MI1:  Overall, which warning do you think is the most effective for motivating you to quit?",  
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
         text: "7. MI2:  Overall, which warning do you think is the most effective for motivating you to quit?",  
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
         text: "MI3:  Overall, which warning do you think is the most effective for motivating you to quit?",  
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
          text: "D1:  Select gender of respondent (DO NOT READ)",
          answers: ["MALE", "FEMALE"]
        },{
             id: "age",
             text: "D2:  To begin, may I ask your age? (IF AGE<18- UNFORTUNATELY, WE CAN ONLY INCLUDE PEOPLE WHO ARE 18 AND OLDER IN THIS STUDY. SORRY, YOU ARE NOT ELIGIBLE TO PARTICIPATE, BUT THANK YOU FOR YOUR TIME.)"
        },{
               id: "education",
               text: "D3:  What is the highest level of education that you have completed?",
            answers: ["Less than high school", "High school or GED completed", "Technical or vocational school completed", "University (incomplete)", "University (complete)", "Post graduate"]
        },{
		    id: "race",
            text: "D4:  Which racial or ethnic group BEST describes you? (READ RESPONSES, CHECK MORE THAN ONE)",
            multiplechoice: true,
            answers: ["White", "Black or African American", "Hispanic or Latino", "American Indian", "Other"]
        },{
     
          id: "consume1",
             text: "D5:  In the past 30 days, on how many days did you smoke? (ENTER NUMBER)"
        },{
          
          id: "consume2",
             text: "D6:  On the days that you smoke, how many cigarettes do you smoke on average? (ENTER NUMBER)"
        },{

          id: "waking",
          text: "D7:  How soon after waking do you usually have your first cigarette?",
          answers: ["Within the first 5 minutes", "6-30 minutes", "31-60 minutes", "More than 60 minutes"]
          
          },{

               id: "brand0",
               text: "D8:  Do you have a brand of cigarettes that you usually smoke?",
               answers: ["Yes","No"]
     
          },{

               id: "brand1",
               text: "D9:  What is the full name of your usual cigarette brand? (NOTE: PROMPT FOR BRAND NAME, STRENGTH--I.E. LIGHTS OR REGULARS--, AND FLAVOUR OF USUAL BRAND -- MENTHOL OR REGULAR) (ENTER TEXT)"
          },{
			id: "quit",
               text: "D10.  During the past 12 months, have you stopped smoking for more than one day because you were trying to quit smoking?",
               answers: ["Yes", "No (Skip to D12)"]
          },{
			id: "quitattempt",
               text: "D11.  On your most recent attempt to quit smoking, did you get any help, like counselling or using stop-smoking medicines?",
               answers: ["Yes", "No (Skip to D12)", "Has never attempted to quit (Skip to D12)"]
          },{
			id: "quithelp",
               text: "D12.  What kind of help did you get? (CHECK ALL RESPONSES THAT THE RESPONDENT MENTIONS) ",
               answers: ["Nicotine replacement (gum, patch, or lozenge)", "Other medications (Bupropion, Zyban, Wellbutrin, Verenicline, Champix)", "Individual or group support sessions", "Telephone quitline or help line", "advice from a doctor or other health professional", "Other"]
          },{
	
			id: "confidence",
               text: "D13. For the next few questions we are going to use a scale that goes from 1 to 10, where 1 means 'not at all' and 10 means 'extremely'. <br/><br/>  Using the scale, how confident are you that you could sucessfully quit smoking right now?", value: 5, minValue: 1, maxValue: 10 

          },{
               id: "intendmo",
               text: "D14.  Using the same scale, where 1 is 'not at all' and 10 is 'extremely', how much would you say that you intend to quit in the next month?", value: 5, minValue: 1, maxValue: 10 
          },{

			id: "intendsix",
               text: "D15.  Using the same scale, where 1 is 'not at all' and 10 is 'extremely', how much would you say that you intend to quit in the next 6 months? ", value: 5, minValue: 1, maxValue: 10 
          },{

			id: "quitassist",
               text: "D16.  Using the same scale, where 1 is 'not at all' and 10 is 'extremely', how likely are you to get help, like medications or counselling, the next time you try to quit? ", value: 5, minValue: 1, maxValue: 10 
          },{

			id: "quitimprove",
               text: "D17.  Using the same scale, where 1 is 'not at all' and 10 is 'extremely', how much would quitting smoking improve your health", value: 5, minValue: 1, maxValue: 10 
          },{

			id: "quitns",
               text: "D18.  Using the same scale, where 1 is 'not at all' and 10 is 'extremely', how dangerous is it for non-smokers to breathe cigarette smoke?", value: 5, minValue: 1, maxValue: 10 
          },{

			id: "society",
               text: "D19.  Using the same scale, where 1 is 'not at all' and 10 is 'extremely', how much does society disapprove of smoking?", value: 5, minValue: 1, maxValue: 10 
          },{
        
              id: "notice",
              text: "D20.  The next set of questions asks about the health warning labels on cigarette packages, which contain information about the health risks of smoking. <br/><br/> In the last month, how often, if at all, have you noticed health warnings on cigarette packages? (NOTE: READ RESPONSES)",
               answers: ["Never","Rarely","Sometimes","Often","Very often"]

          },{
			id: "think",
              text: "D21.  To what extent, if at all, do the warning labels make you think about the health risks of smoking? (NOTE: READ RESPONSES)",
              answers: ["Not at all","A little","Somewhat","A lot"]
          },{
	
              id: "healthinfo",
              text: "D22.  Do you think cigarette packages should have more health information than they do now, less information, or about the same amount as they do now?",
              answers: ["Less information","About the same", "More health information"]

        },[
              ONE_OF,
              [.8, .2],
              experimentalGroupTemplate,
              controlGroupTemplate
        ],{
        	id: "comminfo",
        	text:"PE1.  Thinking about ALL of the warning labels that you have viewed in this study, would you say that these warning labels go too far, are just about right, or that they should do more to communicate information about smoking.  Do they:  (NOTE: READ RESPONSES)",
        	answers: ["They go too far", "They are just right", "They should do more"]
        },{
        	id: "conquit",
        	text: "PE2.  (NOTE:  SHOW PARTICIPANT 1 TO 10 SCALE ON BACK OF INFORMATION SHEET) <br/><br/>  For the next few questions we will again use the scale that goes from 1 to 10, where 1 means 'not at all' and 10 means 'extremely'. <br/><br/> Using this scale, how confident are you that you could successfully quit smoking right now?",value: 5, minValue: 1, maxValue: 10 
        },{
        	id: "intendmo2",
        	text: "PE3.  Using that same scale, where 1 is 'not at all' and 10 is 'extremely', how much would you say that you intend to quit in the next month?", value: 5, minValue: 1, maxValue: 10 
        },{
        	id:"intendsix2",
        	text: "PE4.  Using the same scale, where 1 is 'not at all' and 10 is 'extremely', how much would you say that you intend to quit in the next six months?", value: 5, minValue: 1, maxValue: 10
        },{
        	id:"quitassist2",
        	text: "PE5.  Using the same scale, where 1 is 'not at all' and 10 is 'extremely', how likely are you to get help, like medications or counselling, the next time you try to quit? ", value: 5, minValue: 1, maxValue: 10
        },{
        	id: "damage",
        	text: "PE6.  Using the same scale, where 1 is 'not at all' and 10 is 'extremely', how worried are you, if at all, that smoking will damage your health in the future?", value: 5, minValue: 1, maxValue: 10
        },{
        	id: "quitimprove2",
        	text:"PE7. Using the same scale, where 1 is 'not at all' and 10 is 'extremely', how much would quitting smoking improve your health?",value: 5, minValue: 1, maxValue: 10
        },{
        	id: "icecream",
        	text: "HL1.  Just one more set of questions, and we will be done. Please take a look at this information, which is found on the back of a container of a pint of ice cream. <br/><br/> (NOTE: DO NOT LET PARTICIPANT SEE RESPONSE OPTIONS)<br/><br/> If you eat all of the ice cream in the container, how many calories will you eat?",
        	answers: ["Correct response (i.e., 1000 calories)","Incorrect response"]
        },{
        	id: "cals",
        	text: "HL2.  If you were allowed to eat 60 grams of carbohydrates as a snack, how much ice cream could you eat? <br/><br/> (NOTE: IF PATIENT ANSWERS '2 SERVINGS'. ASK 'HOW MUCH ICE CREAM WOULD THAT BE IF YOU WERE TO MEASURE IT IN A BOWL?')",
        	answers: ["Correct response (i.e., 1 cup, or any amount up to 1 cup, or half the container)","Incorrect response"]
        },{
        	id: "satfat",
        	text: "HL3.  Imagine that your doctor advises you to reduce the amount of saturated fat in your diet. You usually have 42 g of saturated fat each day, which includes 1 serving of ice cream. <br/><br/> If you stop eating ice cream, how many grams of saturated fat would you be consuming each day?",
        	answers: ["Correct response (i.e., 33 grams)","Incorrect response"]
        },{
        	id: "dailyval",
        	text: "HL4.  If you usually eat 2500 calories in a day, what percentage of your daily value of calories will you be eating if you eat one serving of ice cream?",
        	answers: ["Correct response (i.e., 10%)","Incorrect response"]
        },{
        	id: "allergic",
        	text: "HL5.  Pretend that you are allergic to the following substances:  Penicillin, peanuts, latex gloves, and bee stings.  Is it safe for you to eat this ice cream?",
        	answers: ["Correct response (i.e., No)","Incorrect (SKIP TO HL7)"]
        },{
        	id: "allergic2",
        	text: "HL6.  (NOTE:  ASK ONLY IF THE PATIENT CORRECTLY RESPONDS 'NO' TO THE PREVIOUS QUESTION) <br/><br/> Why would it not be safe to eat this ice cream?",
        	answers: ["Correct response (i.e., because it contains peanut oil)","Incorrect (SKIP TO HL7)"]
        },{
        	id: "work",
        	text: "HL7.  Just three more questions and we will be done. <br/><br/> Are you currently...? (READ RESPONSES)",
        	answers: ["Employed for wages-full time","Employed for wages- part time", "Self-employed", "Unemployed", "Homemaker","Student","Retired","Unable to work"]
        },{
        	id: "income",
        	text: "HL8. (NOTE: SHOW RESPONDENT RESPONSE OPTIONS ON THE SCREEN)<br/><br/> What was your annual household income from all sources during 2010? ",
        	answers: ["Less than $10,000","$10,000- $15,000", "$15,000Ð$25,000", "$25,000Ð$35,000", "$35,000Ð$45,000", "$45,000Ð$55,000", "$55,000Ð$75,000", "$75,000Ð$95,000","More than $95,000"]
        }
]};
