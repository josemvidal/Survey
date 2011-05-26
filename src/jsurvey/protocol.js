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
	text: "Control question 1. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"},
	
	{
	    id: "Controlaccept0-grab", text:"CA1:  On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message <br/><br/>... grabs your attention", value: 5, minValue: 1, maxValue: 10 
	},{
	    id: "Controlaccept0-alarm", text: "CA2:  (NOTE: ONLY REPEAT PREAMBLE IF NECESSARY: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is alarming", value: 5, minValue: 1, maxValue: 10
	},{
	    id: "Controlaccept0-fright", text: "CA3:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is frightening", value: 5, minValue: 1, maxValue: 10
	},{
	    id: "Controlaccept0-unpleas", text: "CA4:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is unpleasant", value: 5, minValue: 1, maxValue: 10
	},{
	    
	    id: "Controlaccept0-believable", text: "CA5:  (NOTE: ONLY REPEAT PREAMBLE IF NECESSARY. On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message) <br/><br/> ...is believable", value: 5, minValue: 1, maxValue: 10 
	},{
	    id: "Controlaccept0-relevant", text: "CA6:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...speaks to people like you", value: 5, minValue: 1, maxValue: 10 
	},{

	    id: "Controlaccept0-concern", text: "CA7:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...makes you more concerned about the dangers of smoking", value: 5, minValue: 1, maxValue: 10
	},{
	    id: "Controlaccept0-quit", text: "CA8:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...makes you want to quit", value: 5, minValue: 1, maxValue: 10
	},{
	    id: "Controlaccept0-overall", text: "CA9:  Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10
	}],
    [SEQUENTIAL, {
	id: "control1", type: "mc",
	text: "Control question 2. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"},{
	    id: "Controlaccept1-grab", text:"CB1:  On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message<br/><br/> ...grabs your attention", value: 5, minValue: 1, maxValue: 10 
	},{
	    id: "Controlaccept1-alarm", text: "CB2:  (NOTE: ONLY REPEAT PREAMBLE IF NECESSARY: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is alarming", value: 5, minValue: 1, maxValue: 10
	},{
	    id: "Controlaccept1-fright", text: "CB3:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is frightening", value: 5, minValue: 1, maxValue: 10
	},{
	    id: "Controlaccept1-unpleas", text: "CB4:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is unpleasant", value: 5, minValue: 1, maxValue: 10
	},{
	    
	    id: "Controlaccept1-believable", text: "CB5:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message) <br/><br/> ...is believable", value: 5, minValue: 1, maxValue: 10 
	},{
	    id: "Controlaccept1-relevant", text: "CB6:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...speaks to people like you", value: 5, minValue: 1, maxValue: 10 
	},{
	    
	    id: "Controlaccept1-concern", text: "CB7:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...makes you more concerned about the dangers of smoking", value: 5, minValue: 1, maxValue: 10
	},{
	    id: "Controlaccept1-quit", text: "CB8:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...makes you want to quit", value: 5, minValue: 1, maxValue: 10
	},{
	    id: "Controlaccept1-overall", text: "CB9:  Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10
	}],
    [SEQUENTIAL,{
	id: "control2", type: "mc",
	text: "Control question 3. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"},{
	    id: "Controlaccept2-grab", text:"CC1:  On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message <br/><br/> ...grabs your attention", value: 5, minValue: 1, maxValue: 10 
	},{
	    id: "Controlaccept2-alarm", text: "CC2:  (NOTE: ONLY REPEAT PREAMBLE IF NECESSARY: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is alarming", value: 5, minValue: 1, maxValue: 10
	},{
	    id: "Controlaccept2-fright", text: "CC3:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is frightening", value: 5, minValue: 1, maxValue: 10
	},{
	    id: "Controlaccept2-unpleas", text: "CC4:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is unpleasant", value: 5, minValue: 1, maxValue: 10
	},{
	    id: "Controlaccept2-believable", text: "CC5:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message) <br/><br/> ...is believable", value: 5, minValue: 1, maxValue: 10 
	},{
	    id: "Controlaccept2-relevant", text: "CC6:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...speaks to people like you", value: 5, minValue: 1, maxValue: 10 
	},{
	    
	    id: "Controlaccept2-concern", text: "CC7:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...makes you more concerned about the dangers of smoking", value: 5, minValue: 1, maxValue: 10
	},{
	    id: "Controlaccept2-quit", text: "CC8:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...makes you want to quit", value: 5, minValue: 1, maxValue: 10
	},{
	    id: "Controlaccept2-overall", text: "CC9:  Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10
	}],
    [SEQUENTIAL,{
	id: "control3", type: "mc",
	text: "Control question 4. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"},{
	    id: "Controlaccept3-grab", text:"CD1:  On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message... grabs your attention", value: 5, minValue: 1, maxValue: 10 
	},{
	    id: "Controlaccept3-alarm", text: "CD2:  (NOTE: ONLY REPEAT PREAMBLE IF NECESSARY: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is alarming", value: 5, minValue: 1, maxValue: 10
	},{
	    id: "Controlaccept3-fright", text: "CD3:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is frightening", value: 5, minValue: 1, maxValue: 10
	},{
	    id: "Controlaccept3-unpleas", text: "CD4:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is unpleasant", value: 5, minValue: 1, maxValue: 10
	},{
	    id: "Controlaccept3-believable", text: "CD5:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message) <br/><br/> ...is believable", value: 5, minValue: 1, maxValue: 10 
	},{
	    id: "Controlaccept3-relevant", text: "CD6:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...speaks to people like you", value: 5, minValue: 1, maxValue: 10 
	},{
	    id: "Controlaccept3-concern", text: "CD7:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...makes you more concerned about the dangers of smoking", value: 5, minValue: 1, maxValue: 10
	},{
	    id: "Controlaccept3-quit", text: "CD8:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...makes you want to quit", value: 5, minValue: 1, maxValue: 10
	},{
	    id: "Controlaccept3-overall", text: "CD9:  Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10
	}]];

var cancerGruesome = [
    SEQUENTIAL,
    [ONE_OF,
     [1/3, 1/3, 1/3],     
     {id: "cancerGruesomeImageA", text: "Cancer Gruesome A. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"},
     {id: "cancerGruesomeImageB", text: "Cancer Gruesome B. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"},
     {id: "cancerGruesomeImageC", text: "Cancer Gruesome C. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"}
    ],{
	id: "CancerGrueAccep-grab", text: "CANG1:  On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extemely', please tell me whether this warning message <br/><br/> ...grabs your attention", value: 5, minValue: 1, maxValue: 10 
    },{
	id: "CancerGrueAccep-alarm", text: "CANG2:  (NOTE: ONLY REPEAT PREAMBLE IF NECESSARY: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is alarming", value: 5, minValue: 1, maxValue: 10
    },{   id: "CancerGrueAccep-fright", text: "CANG3:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is frightening", value: 5, minValue: 1, maxValue: 10
      },{   id: "CancerGrueAccep-unpleas", text: "CANG4:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is unpleasant", value: 5, minValue: 1, maxValue: 10
	},{
	    id: "CancerGrueAccep-believable", text: "CANG5:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message) <br/><br/> ... is believable", value: 5, minValue: 1, maxValue: 10 
	},{
	    id: "CancerGrueAccep-relevant", text: "CANG6:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...speaks to people like you", value: 5, minValue: 1, maxValue: 10 
	},{
	    id: "CancerGrueAccep-concern", text: "CANG7:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...makes you more concerned about the dangers of smoking", value: 5, minValue: 1, maxValue: 10
	},{
	    id: "CancerGrueAccep-quit", text: "CANG8: (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...makes you want to quit", value: 5, minValue: 1, maxValue: 10
	},{
	    id: "CancerGrueAccep-overall", text: "CANG9:  Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10
	}
];

var cancerHumanSuffering = [
    SEQUENTIAL,
    [ONE_OF,
     [1/3, 1/3, 1/3],     
     {id: "cancerHumanSufferingImageA", text: "Cancer Human A. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"},
     {id: "cancerHumanSufferingImageB", text: "Cancer Human B. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"},
     {id: "cancerHumanSufferingImageC", text: "Cancer Human C. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"}
    ],{
 	id: "CancerHSAccep-grab", text: "CANHS1:  On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extemely', please tell me whether this warning message <br/><br/> ...grabs your attention", value: 5, minValue: 1, maxValue: 10 
    },{
	id: "CancerHSAccep-alarm", text: "CANHS2:  (NOTE: ONLY REPEAT PREAMBLE IF NECESSARY: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is alarming", value: 5, minValue: 1, maxValue: 10
    },{   id: "CancerHSAccep-fright", text: "CANHS3:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is frightening", value: 5, minValue: 1, maxValue: 10
      },{   id: "CancerHSAccep-unpleas", text: "CANHS4:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is unpleasant", value: 5, minValue: 1, maxValue: 10
	},{
	    id: "CancerHSAccep-believable", text: "CANHS5:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message) <br/><br/> ... is believable", value: 5, minValue: 1, maxValue: 10 
	},{
	    id: "CancerHSAccep-relevant", text: "CANHS6:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...speaks to people like you", value: 5, minValue: 1, maxValue: 10 
	},{
	    id: "CancerHSAccep-concern", text: "CANHS7:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...makes you more concerned about the dangers of smoking", value: 5, minValue: 1, maxValue: 10
	},{
	    id: "CancerHSAccep-quit", text: "CANHS8: (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...makes you want to quit", value: 5, minValue: 1, maxValue: 10
	},{
	    id: "CancerHSAccep-overall", text: "CANHS9:  Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10
	}
];

var cancerSymbolic = [
    SEQUENTIAL,
    [ONE_OF,
     [1/3, 1/3, 1/3],     
     {id: "cancerSymbolicImageA", text: "Cancer Symbolic A. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"},
     {id: "cancerSymbolicImageB", text: "Cancer Symbolic B. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"},
     {id: "cancerSymbolicImageC", text: "Cancer Symbolic C. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"}
    ],{
	id: "CancerSymAccep-grab", text: "CANSY1:  On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extemely', please tell me whether this warning message <br/><br/> ...grabs your attention", value: 5, minValue: 1, maxValue: 10 
    },{
	id: "CancerSymAccep-alarm", text: "CANSY2:  (NOTE: ONLY REPEAT PREAMBLE IF NECESSARY: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is alarming", value: 5, minValue: 1, maxValue: 10
    },{   id: "CancerSymAccep-fright", text: "CANSY3:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is frightening", value: 5, minValue: 1, maxValue: 10
      },{   id: "CancerSymAccep-unpleas", text: "CANSY4:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is unpleasant", value: 5, minValue: 1, maxValue: 10
	},{
	    id: "CancerSymAccep-believable", text: "CANSY5:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message) <br/><br/> ... is believable", value: 5, minValue: 1, maxValue: 10 
	},{
	    id: "CancerSymAccep-relevant", text: "CANSY6:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...speaks to people like you", value: 5, minValue: 1, maxValue: 10 
	},{
	    id: "CancerSymAccep-concern", text: "CANSY7:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...makes you more concerned about the dangers of smoking", value: 5, minValue: 1, maxValue: 10
	},{
	    id: "CancerSymAccep-quit", text: "CANSY8: (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...makes you want to quit", value: 5, minValue: 1, maxValue: 10
	},{
	    id: "CancerSymAccep-overall", text: "CANSY9:  Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10
	}];

var CVDGruesome = [
    SEQUENTIAL,
    [ONE_OF,
     [1/3, 1/3, 1/3],     
     {id: "CVDGruesomeImageA", text: "CVD Gruesome A. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"},
     {id: "CVDGruesomeImageB", text: "CVD Gruesome B. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"},
     {id: "CVDGruesomeImageC", text: "CVD Gruesome C. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"}
    ],{
	id: "CVDGrueAccep-grab", text: "CVDG1:  On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extemely', please tell me whether this warning message <br/> <br/> ...grabs your attention", value: 5, minValue: 1, maxValue: 10 
    },{
	id: "CVDGrueAccep-alarm", text: "CVDG2:  (NOTE: ONLY REPEAT PREAMBLE IF NECESSARY: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is alarming", value: 5, minValue: 1, maxValue: 10
    },{
	id: "CVDGrueAccep-fright", text: "CVDG3:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is frightening", value: 5, minValue: 1, maxValue: 10
    },{
	id: "CVDGrueAccep-unpleas", text: "CVDG4:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is unpleasant", value: 5, minValue: 1, maxValue: 10
    },{
	id: "CVDGrueAccep-believable", text: "CVDG5:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message) <br/><br/> ...is believable", value: 5, minValue: 1, maxValue: 10 
    },{
	id: "CVDGrueAccep-relevant", text: "CVDG6:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...speaks to people like you", value: 5, minValue: 1, maxValue: 10 
    },{
	id: "CVDGrueAccep-concern", text: "CVDG7:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...makes you more concerned about the dangers of smoking", value: 5, minValue: 1, maxValue: 10
    },{
	id: "CVDGrueAccep-quit", text: "CVDG8:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...makes you want to quit", value: 5, minValue: 1, maxValue: 10
    },{
	id: "CVDGrueAccep-overall", text: "CVDG9:  Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10
    }];

var CVDHumanSuffering = [
    SEQUENTIAL,
    [ONE_OF,
     [1/3, 1/3, 1/3],     
     {id: "CVDHumanSufferingImageA", text: "CVD Human A. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"},
     {id: "CVDHumanSufferingImageB", text: "CVD Human B. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"},
     {id: "CVDHumanSufferingImageC", text: "CVD Human C. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"}
    ],{
	id: "CVDHSAccep-grab", text: "CVDHS1:  On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extemely', please tell me whether this warning message <br/> <br/> ...grabs your attention", value: 5, minValue: 1, maxValue: 10 
    },{
	id: "CVDHSAccep-alarm", text: "CVDHS2:  (NOTE: ONLY REPEAT PREAMBLE IF NECESSARY: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is alarming", value: 5, minValue: 1, maxValue: 10
    },{
	id: "CVDHSAccep-fright", text: "CVDHS3:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is frightening", value: 5, minValue: 1, maxValue: 10
    },{
	id: "CVDHSAccep-unpleas", text: "CVDHS4:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is unpleasant", value: 5, minValue: 1, maxValue: 10
    },{
	id: "CVDHSAccep-believable", text: "CVDHS5:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message) <br/><br/> ...is believable", value: 5, minValue: 1, maxValue: 10 
    },{
	id: "CVDHSAccep-relevant", text: "CVDHS6:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...speaks to people like you", value: 5, minValue: 1, maxValue: 10 
    },{
	id: "CVDHSAccep-concern", text: "CVDHS7:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...makes you more concerned about the dangers of smoking", value: 5, minValue: 1, maxValue: 10
    },{
	id: "CVDHSAccep-quit", text: "CVDHS8:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...makes you want to quit", value: 5, minValue: 1, maxValue: 10
    },{
	id: "CVDHSAccep-overall", text: "CVDHS9:  Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10
    }
];

var CVDSymbolic = [
    SEQUENTIAL,
    [ONE_OF,
     [1/3, 1/3, 1/3],     
     {id: "CVDSymbolicImageA", text: "CVD Symbolic A. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"},
     {id: "CVDSymbolicImageB", text: "CVD Symbolic B. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"},
     {id: "CVDSymbolicImageC", text: "CVD Symbolic C. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"}
    ],{
	id: "CVDSYAccep-grab", text: "CVDSY1:  On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extemely', please tell me whether this warning message <br/> <br/> ...grabs your attention", value: 5, minValue: 1, maxValue: 10 
    },{
	id: "CVDSYAccep-alarm", text: "CVDSY2:  (NOTE: ONLY REPEAT PREAMBLE IF NECESSARY: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is alarming", value: 5, minValue: 1, maxValue: 10
    },{
	id: "CVDSYAccep-fright", text: "CVDSY3:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is frightening", value: 5, minValue: 1, maxValue: 10
    },{
	id: "CVDSYAccep-unpleas", text: "CVDSY4:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is unpleasant", value: 5, minValue: 1, maxValue: 10
    },{
	id: "CVDSYAccep-believable", text: "CVDGSY5:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message) <br/><br/> ...is believable", value: 5, minValue: 1, maxValue: 10 
    },{
	id: "CVDSYAccep-relevant", text: "CVDSY6:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...speaks to people like you", value: 5, minValue: 1, maxValue: 10 
    },{
	id: "CVDSYAccep-concern", text: "CVDSY7:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...makes you more concerned about the dangers of smoking", value: 5, minValue: 1, maxValue: 10
    },{
	id: "CVDSYAccep-quit", text: "CVDSY8:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...makes you want to quit", value: 5, minValue: 1, maxValue: 10
    },{
	id: "CVDSYAccep-overall", text: "CVDSY9:  Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10
    }
];

var SHSGruesome = [
    SEQUENTIAL,
    [ONE_OF,
     [1/3, 1/3, 1/3],     
     {id: "SHSGruesomeImageA", text: "SHS Gruesome A. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"},
     {id: "SHSGruesomeImageB", text: "SHS Gruesome B. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"},
     {id: "SHSGruesomeImageC", text: "SHS Gruesome C. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"}
    ],{
	id: "SHSGrueAccep-grab", text: "SHSG1:  On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extemely', please tell me whether this warning message <br/><br/> ...grabs your attention", value: 5, minValue: 1, maxValue: 10 
    },{
	id: "SHSGrueAccep-alarm", text: "SHSG2:  (NOTE: ONLY REPEAT PREAMBLE IF NECESSARY: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is alarming", value: 5, minValue: 1, maxValue: 10
    },{
	id: "SHSGrueAccep-fright", text: "SHSG3:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is frightening", value: 5, minValue: 1, maxValue: 10
    },{
	id: "SHSGrueAccep-unpleas", text: "SHSG4:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is unpleasant", value: 5, minValue: 1, maxValue: 10
    },{
	id: "SHSGrueAccep-believable", text: "SHSG5:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message) <br/><br/> ...is believable", value: 5, minValue: 1, maxValue: 10 
    },{
	id: "SHSGrueAccep-relevant", text: "SHSG6:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...speaks to people like you", value: 5, minValue: 1, maxValue: 10 
    },{
	id: "SHSGrueAccep-concern", text: "SHSG7:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...makes you more concerned about the dangers of smoking", value: 5, minValue: 1, maxValue: 10
    },{
	id: "SHSGrueAccep-quit", text: "SHSG8:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...makes you want to quit", value: 5, minValue: 1, maxValue: 10
    },{
	id: "SHSGrueAccep-overall", text: "SHSG9:  Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10
    }];

var SHSHumanSuffering = [
    SEQUENTIAL,
    [ONE_OF,
     [1/3, 1/3, 1/3],     
     {id: "SHSHumanSufferingImageA", text: "SHS Human A. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"},
     {id: "SHSHumanSufferingImageB", text: "SHS Human B. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"},
     {id: "SHSHumanSufferingImageC", text: "SHS Human C. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"}
    ],{
	id: "SHSHSAccep-grab", text: "SHSHS1: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extemely', please tell me whether this warning message <br/><br/> ...grabs your attention", value: 5, minValue: 1, maxValue: 10 
    },{
	id: "SHSHSAccep-alarm", text: "SHSHS2:  (NOTE: ONLY REPEAT PREAMBLE IF NECESSARY: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is alarming", value: 5, minValue: 1, maxValue: 10
    },{
	id: "SHSHSAccep-fright", text: "SHSHS3:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is frightening", value: 5, minValue: 1, maxValue: 10
    },{
	id: "SHSHSAccep-unpleas", text: "SHSHS4:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is unpleasant", value: 5, minValue: 1, maxValue: 10
    },{
	id: "SHSHSAccep-believable", text: "SHSHS5: (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message) <br/><br/> ...is believable", value: 5, minValue: 1, maxValue: 10 
    },{
	id: "SHSHSAccep-relevant", text: "SHSHS6:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...speaks to people like you", value: 5, minValue: 1, maxValue: 10 
    },{
	id: "SHSHSAccep-concern", text: "SHSHS7:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...makes you more concerned about the dangers of smoking", value: 5, minValue: 1, maxValue: 10
    },{
	id: "SHSHSAccep-quit", text: "SHSHS8:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...makes you want to quit", value: 5, minValue: 1, maxValue: 10
    },{
	id: "SHSHSAccep-overall", text: "SHSHS9:  Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10
    }
];

var SHSSymbolic = [
    SEQUENTIAL,
    [ONE_OF,
     [1/3, 1/3, 1/3],     
     {id: "SHSSymbolicImageA", text: "SHS Symbolic A. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"},
     {id: "SHSSymbolicImageB", text: "SHS Symbolic B. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"},
     {id: "SHSSymbolicImageC", text: "SHS Symbolic C. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"}
    ],{
	id: "SHSSSAccep-grab", text: "SHSSY1:  On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extemely', please tell me whether this warning message <br/><br/> ...grabs your attention", value: 5, minValue: 1, maxValue: 10 
    },{
	id: "SHSSymbolicAccep-alarm", text: "SHSSY2:  (NOTE: ONLY REPEAT PREAMBLE IF NECESSARY: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is alarming", value: 5, minValue: 1, maxValue: 10
    },{
	id: "SHSSymbolicAccep-fright", text: "SHSSY3:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is frightening", value: 5, minValue: 1, maxValue: 10
    },{
	id: "SHSSymbolicAccep-unpleas", text: "SHSSY4:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is unpleasant", value: 5, minValue: 1, maxValue: 10
    },{
	id: "SHSSymbolicAccep-believable", text: "SHSSY5:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message) <br/><br/> ...is believable", value: 5, minValue: 1, maxValue: 10 
    },{
	id: "SHSSymbolicAccep-relevant", text: "SHSSY6:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...speaks to people like you", value: 5, minValue: 1, maxValue: 10 
    },{
	id: "SHSSymbolicAccep-concern", text: "SHSSY7:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...makes you more concerned about the dangers of smoking", value: 5, minValue: 1, maxValue: 10
    },{
	id: "SHSSymbolicAccep-quit", text: "SHSSY8:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...makes you want to quit", value: 5, minValue: 1, maxValue: 10
    },{
	id: "SHSSymbolicAccep-overall", text: "SHSSY9:  Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10
    }];


var healthTopicCancer  = [
    SEQUENTIAL, [
	RANDOM_ORDER,
	cancerGruesome,
	cancerHumanSuffering,
	cancerSymbolic],{
	    id: "mostimapactCancer", 
	    text: "MI1: (NOTE: Show the participant the packs that they just evaluated) <br/><br/>  Overall, which warning do you think is the <u>most effective</u> for motivating you to quit?",  
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
        text: "MI: (NOTE: Show the participant the packs that they just evaluated) <br/><br/>  Overall, which warning do you think is the <u>most effective</u> for motivating you to quit?",  
        answers: ["Gruesome image", "Human suffering image", "Symbolic image"],
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
        text: "MI: (NOTE: Show the participant the packs that they just evaluated) <br/><br/> Overall, which warning do you think is the <u>most effective</u> for motivating you to quit?",  
        answers: ["Gruesome image", "Human suffering image", "Symbolic image"],
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
	    text: "D1:  Select gender of respondent (NOTE: Do not read)",
	    answers: ["MALE", "FEMALE"]
        },{
	    id: "age",
	    text: "D2:  To begin, may I ask your age? (NOTE: If younger that 18, say, 'Unfortunately, we can only include people age 18 and older in this study. Sorry, you are not eligible to participate, but thank you for your time' and Terminate.)"
        },{
	    id: "education",
	    text: "D3:  What is the highest level of education that you have completed?",
	    answers: ["Less than high school", "High school or GED completed", "Technical or vocational school completed", "University (incomplete)", "University (complete)", "Post graduate"]
        },{
	    id: "race",
	    multiplechoice: true,
	    text: "D4:  Which racial or ethnic group <u>best</u> describes you? (NOTE: Read responses. Respondent can check more than one, if they want, but should be encouraged to select the <u>best</u> one for them)",
	    answers: ["White", "Black or African American", "Hispanic or Latino", "American Indian", "Other"]
        },{
	    
	    id: "consume1",
	    text: "D5:  In the past 30 days, on how many days did you smoke? <br/><br/> (ENTER NUMBER)"
        },{
	    
	    id: "consume2",
	    text: "D6:  On the days that you smoke, how many cigarettes do you smoke on average? <br/><br/> (ENTER NUMBER)"
        },{

	    id: "waking",
	    text: "D7:  How soon after waking do you usually have your first cigarette? <br/><br/> (NOTE: Read responses)",
	    answers: ["Within the first 5 minutes", "6-30 minutes", "31-60 minutes", "More than 60 minutes"]
	    
        },{
	    id: "brand0",
	    text: "D8:  Do you have a brand of cigarettes that you usually smoke?",
	    answers: ["Yes","No (Skip to D10)"]
        },{

	    id: "brand1",
	    text: "D9:  What is the full name of your usual cigarette brand? <br/><br/> (NOTE: Enter response, prompting for brand name, strength (i.e., lights or regular), and flavour of usual brand (menthol or regular))"
        },{
	    id: "quit",
	    text: "D10.  During the <u>PAST 12 MONTHS</u>, have you stopped smoking for more than one day <u>BECAUSE YOU WERE TRYING TO QUIT SMOKING</u>",
	    answers: ["Yes", "No"]
        },{
	    id: "quitattempt",
	    text: "D11.  On your <u>most recent attempt</u> to quit smoking, did you get any help, like counselling or using stop-smoking medicines?",
	    answers: ["Yes", "No (Skip to D13)", "Has never attempted to quit (Skip to D13)"]
        },{
	    id: "quithelp",
	    text: "D12.  What kind of help did you get? (NOTE: Check <u>all</u> the responses that the respondent mentions)",
	    multiplechoice: true,
	    answers: ["Nicotine replacement (gum, patch, or lozenge)", "Other medications (Bupropion, Zyban, Wellbutrin, Verenicline, Champix)", "Individual or group support sessions", "Telephone quitline or help line", "advice from a doctor or other health professional", "Other"]
        },{
	    
	    id: "confidence",
	    text: "D13. (NOTE: Show participant 1 to 10 scale on the back of the information sheet) For the next few questions we are going to use a scale that goes from 1 to 10, where 1 means 'not at all' and 10 means 'extremely'. <br/><br/>  Using the scale, how confident are you that you could sucessfully quit smoking <u>right now</u>?", value: 5, minValue: 1, maxValue: 10 

        },{
	    id: "intendmo",
	    text: "D14.  (NOTE:  If participant does not use 1 to 10 response format, read the following statement: For this question, you should use a number from one to 10, where 1 means 'not at all' and 10 means 'extremely'.) <br/><br/> Using the same scale, where 1 is 'not at all' and 10 is 'extremely', how much would you say that you intend to quit <u>in the next month</u>?", value: 5, minValue: 1, maxValue: 10 
        },{

	    id: "intendsix",
	    text: "D15.  (NOTE:  If participant does not use 1 to 10 response format, read the following statement: For this question, you should use a number from one to 10, where 1 means 'not at all' and 10 means 'extremely'.) <br/><br/> Using the same scale, where 1 is 'not at all' and 10 is 'extremely', how much would you say that you intend to quit <u>in the next 6 months</u>? ", value: 5, minValue: 1, maxValue: 10 
        },{

	    id: "quitassist",
	    text: "D16.  (NOTE:  If participant does not use 1 to 10 response format, read the following statement: For this question, you should use a number from one to 10, where 1 means 'not at all' and 10 means 'extremely'.) <br/><br/> Using the same scale, where 1 is 'not at all' and 10 is 'extremely', how likely are you to get help, like medications or counselling, the <u>next time</u> you try to quit? ", value: 5, minValue: 1, maxValue: 10 
        },{

	    id: "quitimprove",
	    text: "D17. (NOTE:  If participant does not use 1 to 10 response format, read the following statement: For this question, you should use a number from one to 10, where 1 means 'not at all' and 10 means 'extremely'.) <br/><br/> Using the same scale, where 1 is 'not at all' and 10 is 'extremely', how much would quitting smoking improve your health?", value: 5, minValue: 1, maxValue: 10 
        },{

	    id: "quitns",
	    text: "D18. (NOTE:  If participant does not use 1 to 10 response format, read the following statement: For this question, you should use a number from one to 10, where 1 means 'not at all' and 10 means 'extremely'.) <br/><br/> Using the same scale, where 1 is 'not at all' and 10 is 'extremely', how dangerous is it for non-smokers to breathe cigarette smoke?", value: 5, minValue: 1, maxValue: 10 
        },{

	    id: "society",
	    text: "D19. (NOTE:  If participant does not use 1 to 10 response format, read the following statement: For this question, you should use a number from one to 10, where 1 means 'not at all' and 10 means 'extremely'.) <br/><br/> Using the same scale, where 1 is 'not at all' and 10 is 'extremely', how much does society <u>disapprove</u> of smoking?", value: 5, minValue: 1, maxValue: 10 
        },{
	    
	    id: "notice",
	    text: "D20.  The next set of questions asks about the health warning labels on cigarette packages, which contain information about the health risks of smoking. <br/><br/> In the last month, how often, if at all, have you noticed health warnings on cigarette packages? <br/><br/> (NOTE: Read responses)",
	    answers: ["Never","Rarely","Sometimes","Often","Very often"]

        },{
	    id: "think",
	    text: "D21.  To what extent, if at all, do the warning labels make you think about the health risks of smoking? <br/><br/> (NOTE: Read responses)",
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
    	text:"PE1.  Thinking about <u>ALL</u> of the warning labels that you have viewed in this study, would you say that these warning labels go too far, are just about right, or that they should do more to communicate information about smoking.  Do they:  (NOTE: Read responses)",
    	answers: ["They go too far", "They are just right", "They should do more"]
    },{
    	id: "conquit",
    	text: "PE2.  (NOTE:  Show participant 1 to 10 scale on the back of the information sheet) <br/><br/>  For the next few questions we will again use the scale that goes from 1 to 10, where 1 means 'not at all' and 10 means 'extremely'. <br/><br/> Using this scale, how <u>confident</u> are you that you could successfully quit smoking <u>right now</u>?",value: 5, minValue: 1, maxValue: 10 
    },{
    	id: "intendmo2",
    	text: "PE3.  (NOTE:  If participant does not use 1 to 10 response format, read the following statement: For this question, you should use a number from one to 10, where 1 means 'not at all' and 10 means 'extremely'.), <br/><br/> Using that same scale, where 1 is 'not at all' and 10 is 'extremely', how much would you say that you intend to quit <u>in the next month</u>?", value: 5, minValue: 1, maxValue: 10 
    },{
    	id:"intendsix2",
    	text: "PE4.  (NOTE:  If participant does not use 1 to 10 response format, read the following statement: For this question, you should use a number from one to 10, where 1 means 'not at all' and 10 means 'extremely'.), <br/><br/> How much would you say that you intend to quit <u>in the next six months</u>?", value: 5, minValue: 1, maxValue: 10
    },{
    	id:"quitassist2",
    	text: "PE5.  (NOTE:  If participant does not use 1 to 10 response format, read the following statement: For this question, you should use a number from one to 10, where 1 means 'not at all' and 10 means 'extremely'.), <br/><br/> Using the same scale, How likely are you to get help, like medications or counselling, the <u>next time</u> you try to quit? ", value: 5, minValue: 1, maxValue: 10
    },{
    	id: "damage",
    	text: "PE6.  (NOTE:  If participant does not use 1 to 10 response format, read the following statement: For this question, you should use a number from one to 10, where 1 means 'not at all' and 10 means 'extremely'.), <br/><br/> How worried are you, if at all, that smoking will damage your health in the future?", value: 5, minValue: 1, maxValue: 10
    },{
    	id: "quitimprove2",
    	text:"PE7. (NOTE:  If participant does not use 1 to 10 response format, read the following statement: For this question, you should use a number from one to 10, where 1 means 'not at all' and 10 means 'extremely'.), <br/><br/> Using the same scale, How much would quitting smoking improve your health?",value: 5, minValue: 1, maxValue: 10
    },{
    id: "icecream",
    text: "HL1.  Just one more set of questions, and we will be done. Please take a look at this information, which is found on the back of a container of a pint of ice cream. <br/><br/> (NOTE:Do not let participants see response options)<br/><br/> If you eat all of the ice cream in the container, how many calories will you eat?",
    answers: ["Correct response (i.e., 1000 calories)","Incorrect response"]
    },{
    id: "cals",
    text: "HL2.  If you were allowed to eat 60 grams of carbohydrates as a snack, how much ice cream could you eat? <br/><br/> (NOTE: If patient answers '2 servings', ask 'How much ice cream would that be if you were to measure it into a bowl?')",
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
    text: "HL6.  (NOTE:  Ask only if the patient correctly responds 'No' to the previous question) <br/><br/> Why would it not be safe to eat this ice cream?",
    answers: ["Correct response (i.e., because it contains peanut oil)","Incorrect (SKIP TO HL7)"]
    },{
    id: "work",
    text: "HL7.  Just three more questions and we will be done. <br/><br/> Are you currently...? (NOTE: Read responses)",
    answers: ["Employed for wages-full time","Employed for wages- part time", "Self-employed", "Unemployed", "Homemaker","Student","Retired","Unable to work"]
    },{
    id: "income",
    text: "HL8. (NOTE: Show respondent the options on the screen)<br/><br/> What was your annual household income from all sources during 2010? ",
    answers: ["Less than $10,000","$10,000- $15,000", "$15,000-$25,000", "$25,000-$35,000", "$35,000-$45,000", "$45,000-$55,000", "$55,000-$75,000", "$75,000-$95,000","More than $95,000"]
    },{
    	id: "zipcode",
    	text: "HL9. Finally, can you tell me the zip code for the place where you live most of the time?"
    }
    ]};
