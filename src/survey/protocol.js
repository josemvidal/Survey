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
	    id: "ctrlgrab1", text:"CA1:  On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message <br/><br/>... grabs your attention", value: 5, minValue: 1, maxValue: 10 
	},{
	    id: "ctrlalarm1", text: "CA2:  (NOTE: ONLY REPEAT PREAMBLE IF NECESSARY: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is alarming", value: 5, minValue: 1, maxValue: 10
	},{
	    id: "ctrlfright1", text: "CA3:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is frightening", value: 5, minValue: 1, maxValue: 10
	},{
	    id: "ctrlunpleas1", text: "CA4:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is unpleasant", value: 5, minValue: 1, maxValue: 10
	},{
	    
	    id: "ctrlbeliev1", text: "CA5:  (NOTE: ONLY REPEAT PREAMBLE IF NECESSARY. On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message) <br/><br/> ...is believable", value: 5, minValue: 1, maxValue: 10 
	},{
	    id: "ctrlspeak1", text: "CA6:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...speaks to people like you", value: 5, minValue: 1, maxValue: 10 
	},{

	    id: "ctrlconc1", text: "CA7:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...makes you more concerned about the dangers of smoking", value: 5, minValue: 1, maxValue: 10
	},{
	    id: "ctrlquit1", text: "CA8:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...makes you want to quit", value: 5, minValue: 1, maxValue: 10
	},{
	    id: "ctrleff1", text: "CA9:  Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10
	}],
    [SEQUENTIAL, {
	id: "control1", type: "mc",
	text: "Control question 2. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"},{
	    id: "ctrlgrab2", text:"CB1:  On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message<br/><br/> ...grabs your attention", value: 5, minValue: 1, maxValue: 10 
	},{
	    id: "ctrlalarm2", text: "CB2:  (NOTE: ONLY REPEAT PREAMBLE IF NECESSARY: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is alarming", value: 5, minValue: 1, maxValue: 10
	},{
	    id: "ctrlfright2", text: "CB3:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is frightening", value: 5, minValue: 1, maxValue: 10
	},{
	    id: "ctrlunpleas2", text: "CB4:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is unpleasant", value: 5, minValue: 1, maxValue: 10
	},{
	    
	    id: "ctrlbeliev2", text: "CB5:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message) <br/><br/> ...is believable", value: 5, minValue: 1, maxValue: 10 
	},{
	    id: "ctrlspeak2", text: "CB6:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...speaks to people like you", value: 5, minValue: 1, maxValue: 10 
	},{
	    
	    id: "ctrlconc2", text: "CB7:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...makes you more concerned about the dangers of smoking", value: 5, minValue: 1, maxValue: 10
	},{
	    id: "ctrlquit2", text: "CB8:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...makes you want to quit", value: 5, minValue: 1, maxValue: 10
	},{
	    id: "ctrleff2", text: "CB9:  Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10
	}],
    [SEQUENTIAL,{
	id: "control2", type: "mc",
	text: "Control question 3. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"},{
	    id: "ctrlgrab3", text:"CC1:  On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message <br/><br/> ...grabs your attention", value: 5, minValue: 1, maxValue: 10 
	},{
	    id: "ctrlalarm3", text: "CC2:  (NOTE: ONLY REPEAT PREAMBLE IF NECESSARY: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is alarming", value: 5, minValue: 1, maxValue: 10
	},{
	    id: "ctrlfright3", text: "CC3:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is frightening", value: 5, minValue: 1, maxValue: 10
	},{
	    id: "ctrlunpleas3", text: "CC4:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is unpleasant", value: 5, minValue: 1, maxValue: 10
	},{
	    id: "ctrlbeliev3", text: "CC5:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message) <br/><br/> ...is believable", value: 5, minValue: 1, maxValue: 10 
	},{
	    id: "ctrlspeak3", text: "CC6:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...speaks to people like you", value: 5, minValue: 1, maxValue: 10 
	},{
	    
	    id: "ctrlconc3", text: "CC7:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...makes you more concerned about the dangers of smoking", value: 5, minValue: 1, maxValue: 10
	},{
	    id: "ctrlquit3", text: "CC8:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...makes you want to quit", value: 5, minValue: 1, maxValue: 10
	},{
	    id: "ctrleff3", text: "CC9:  Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10
	}],
    [SEQUENTIAL,{
	id: "control3", type: "mc",
	text: "Control question 4. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"},{
	    id: "ctrlgrab4", text:"CD1:  On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message... grabs your attention", value: 5, minValue: 1, maxValue: 10 
	},{
	    id: "ctrlalarm4", text: "CD2:  (NOTE: ONLY REPEAT PREAMBLE IF NECESSARY: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is alarming", value: 5, minValue: 1, maxValue: 10
	},{
	    id: "ctrlfright4", text: "CD3:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is frightening", value: 5, minValue: 1, maxValue: 10
	},{
	    id: "ctrlunpleas4", text: "CD4:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is unpleasant", value: 5, minValue: 1, maxValue: 10
	},{
	    id: "ctrlbeliev4", text: "CD5:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message) <br/><br/> ...is believable", value: 5, minValue: 1, maxValue: 10 
	},{
	    id: "ctrlspeak4", text: "CD6:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...speaks to people like you", value: 5, minValue: 1, maxValue: 10 
	},{
	    id: "ctrlconc4", text: "CD7:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...makes you more concerned about the dangers of smoking", value: 5, minValue: 1, maxValue: 10
	},{
	    id: "ctrlquit4", text: "CD8:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...makes you want to quit", value: 5, minValue: 1, maxValue: 10
	},{
	    id: "ctrleff4", text: "CD9:  Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10
	}]];

var cancerGruesome = [
    SEQUENTIAL,
    [ONE_OF,
     [1/3, 1/3, 1/3],     
     {id: "cgia", text: "Cancer Gruesome A. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"},
     {id: "cgib", text: "Cancer Gruesome B. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"},
     {id: "cgic", text: "Cancer Gruesome C. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"}
    ],{
	id: "cangrabg", text: "CANG1:  On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extemely', please tell me whether this warning message <br/><br/> ...grabs your attention", value: 5, minValue: 1, maxValue: 10 
    },{
	id: "canalarmg", text: "CANG2:  (NOTE: ONLY REPEAT PREAMBLE IF NECESSARY: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is alarming", value: 5, minValue: 1, maxValue: 10
    },{   id: "canfrightg", text: "CANG3:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is frightening", value: 5, minValue: 1, maxValue: 10
      },{   id: "canunpleasg", text: "CANG4:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is unpleasant", value: 5, minValue: 1, maxValue: 10
	},{
	    id: "canbelievg", text: "CANG5:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message) <br/><br/> ... is believable", value: 5, minValue: 1, maxValue: 10 
	},{
	    id: "canspeakg", text: "CANG6:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...speaks to people like you", value: 5, minValue: 1, maxValue: 10 
	},{
	    id: "canconcg", text: "CANG7:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...makes you more concerned about the dangers of smoking", value: 5, minValue: 1, maxValue: 10
	},{
	    id: "canquitg", text: "CANG8: (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...makes you want to quit", value: 5, minValue: 1, maxValue: 10
	},{
	    id: "caneffg", text: "CANG9:  Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10
	}
];

var cancerHumanSuffering = [
    SEQUENTIAL,
    [ONE_OF,
     [1/3, 1/3, 1/3],     
     {id: "chia", text: "Cancer Human A. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"},
     {id: "chib", text: "Cancer Human B. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"},
     {id: "chic", text: "Cancer Human C. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"}
    ],{
 	id: "cangrabh", text: "CANHS1:  On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extemely', please tell me whether this warning message <br/><br/> ...grabs your attention", value: 5, minValue: 1, maxValue: 10 
    },{
	id: "canalarmh", text: "CANHS2:  (NOTE: ONLY REPEAT PREAMBLE IF NECESSARY: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is alarming", value: 5, minValue: 1, maxValue: 10
    },{   id: "canfrighth", text: "CANHS3:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is frightening", value: 5, minValue: 1, maxValue: 10
      },{   id: "canunpleash", text: "CANHS4:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is unpleasant", value: 5, minValue: 1, maxValue: 10
	},{
	    id: "canbelievh", text: "CANHS5:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message) <br/><br/> ... is believable", value: 5, minValue: 1, maxValue: 10 
	},{
	    id: "canspeakh", text: "CANHS6:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...speaks to people like you", value: 5, minValue: 1, maxValue: 10 
	},{
	    id: "canconch", text: "CANHS7:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...makes you more concerned about the dangers of smoking", value: 5, minValue: 1, maxValue: 10
	},{
	    id: "canquith", text: "CANHS8: (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...makes you want to quit", value: 5, minValue: 1, maxValue: 10
	},{
	    id: "caneffh", text: "CANHS9:  Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10
	}
];

var cancerSymbolic = [
    SEQUENTIAL,
    [ONE_OF,
     [1/3, 1/3, 1/3],     
     {id: "csia", text: "Cancer Symbolic A. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"},
     {id: "csib", text: "Cancer Symbolic B. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"},
     {id: "csic", text: "Cancer Symbolic C. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"}
    ],{
	id: "cangrabs", text: "CANSY1:  On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extemely', please tell me whether this warning message <br/><br/> ...grabs your attention", value: 5, minValue: 1, maxValue: 10 
    },{
	id: "canalarms", text: "CANSY2:  (NOTE: ONLY REPEAT PREAMBLE IF NECESSARY: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is alarming", value: 5, minValue: 1, maxValue: 10
    },{   id: "canfrights", text: "CANSY3:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is frightening", value: 5, minValue: 1, maxValue: 10
      },{   id: "canunpleass", text: "CANSY4:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is unpleasant", value: 5, minValue: 1, maxValue: 10
	},{
	    id: "canbelievs", text: "CANSY5:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message) <br/><br/> ... is believable", value: 5, minValue: 1, maxValue: 10 
	},{
	    id: "canspeaks", text: "CANSY6:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...speaks to people like you", value: 5, minValue: 1, maxValue: 10 
	},{
	    id: "canconcs", text: "CANSY7:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...makes you more concerned about the dangers of smoking", value: 5, minValue: 1, maxValue: 10
	},{
	    id: "canquits", text: "CANSY8: (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...makes you want to quit", value: 5, minValue: 1, maxValue: 10
	},{
	    id: "caneffs", text: "CANSY9:  Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10
	}];

var CVDGruesome = [
    SEQUENTIAL,
    [ONE_OF,
     [1/3, 1/3, 1/3],     
     {id: "cvdgia", text: "CVD Gruesome A. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"},
     {id: "cvdgib", text: "CVD Gruesome B. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"},
     {id: "cvdgic", text: "CVD Gruesome C. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"}
    ],{
	id: "cvdgrabg", text: "CVDG1:  On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extemely', please tell me whether this warning message <br/> <br/> ...grabs your attention", value: 5, minValue: 1, maxValue: 10 
    },{
	id: "cvdalarmg", text: "CVDG2:  (NOTE: ONLY REPEAT PREAMBLE IF NECESSARY: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is alarming", value: 5, minValue: 1, maxValue: 10
    },{
	id: "cvdfrightg", text: "CVDG3:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is frightening", value: 5, minValue: 1, maxValue: 10
    },{
	id: "cvdunpleasg", text: "CVDG4:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is unpleasant", value: 5, minValue: 1, maxValue: 10
    },{
	id: "cvdbelievg", text: "CVDG5:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message) <br/><br/> ...is believable", value: 5, minValue: 1, maxValue: 10 
    },{
	id: "cvdspeakg", text: "CVDG6:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...speaks to people like you", value: 5, minValue: 1, maxValue: 10 
    },{
	id: "cvdconcg", text: "CVDG7:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...makes you more concerned about the dangers of smoking", value: 5, minValue: 1, maxValue: 10
    },{
	id: "cvdquitg", text: "CVDG8:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...makes you want to quit", value: 5, minValue: 1, maxValue: 10
    },{
	id: "cvdeffg", text: "CVDG9:  Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10
    }];

var CVDHumanSuffering = [
    SEQUENTIAL,
    [ONE_OF,
     [1/3, 1/3, 1/3],     
     {id: "cvdhia", text: "CVD Human A. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"},
     {id: "cvdhib", text: "CVD Human B. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"},
     {id: "cvdhic", text: "CVD Human C. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"}
    ],{
	id: "cvdgrabh", text: "CVDHS1:  On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extemely', please tell me whether this warning message <br/> <br/> ...grabs your attention", value: 5, minValue: 1, maxValue: 10 
    },{
	id: "cvdalarmh", text: "CVDHS2:  (NOTE: ONLY REPEAT PREAMBLE IF NECESSARY: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is alarming", value: 5, minValue: 1, maxValue: 10
    },{
	id: "cvdfrighth", text: "CVDHS3:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is frightening", value: 5, minValue: 1, maxValue: 10
    },{
	id: "cvdunpleash", text: "CVDHS4:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is unpleasant", value: 5, minValue: 1, maxValue: 10
    },{
	id: "cvdbelievh", text: "CVDHS5:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message) <br/><br/> ...is believable", value: 5, minValue: 1, maxValue: 10 
    },{
	id: "cvdspeakh", text: "CVDHS6:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...speaks to people like you", value: 5, minValue: 1, maxValue: 10 
    },{
	id: "cvdconch", text: "CVDHS7:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...makes you more concerned about the dangers of smoking", value: 5, minValue: 1, maxValue: 10
    },{
	id: "cvdquith", text: "CVDHS8:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...makes you want to quit", value: 5, minValue: 1, maxValue: 10
    },{
	id: "cvdeffh", text: "CVDHS9:  Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10
    }
];

var CVDSymbolic = [
    SEQUENTIAL,
    [ONE_OF,
     [1/3, 1/3, 1/3],     
     {id: "cvdsia", text: "CVD Symbolic A. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"},
     {id: "cvdsib", text: "CVD Symbolic B. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"},
     {id: "cvdsic", text: "CVD Symbolic C. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"}
    ],{
	id: "cvdgrabs", text: "CVDSY1:  On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extemely', please tell me whether this warning message <br/> <br/> ...grabs your attention", value: 5, minValue: 1, maxValue: 10 
    },{
	id: "cvdalarms", text: "CVDSY2:  (NOTE: ONLY REPEAT PREAMBLE IF NECESSARY: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is alarming", value: 5, minValue: 1, maxValue: 10
    },{
	id: "cvdfrights", text: "CVDSY3:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is frightening", value: 5, minValue: 1, maxValue: 10
    },{
	id: "cvdunpleass", text: "CVDSY4:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is unpleasant", value: 5, minValue: 1, maxValue: 10
    },{
	id: "cvdbelievs", text: "CVDGSY5:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message) <br/><br/> ...is believable", value: 5, minValue: 1, maxValue: 10 
    },{
	id: "cvdspeaks", text: "CVDSY6:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...speaks to people like you", value: 5, minValue: 1, maxValue: 10 
    },{
	id: "cvdconcs", text: "CVDSY7:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...makes you more concerned about the dangers of smoking", value: 5, minValue: 1, maxValue: 10
    },{
	id: "cvdquits", text: "CVDSY8:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...makes you want to quit", value: 5, minValue: 1, maxValue: 10
    },{
	id: "cvdeffs", text: "CVDSY9:  Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10
    }
];

var SHSGruesome = [
    SEQUENTIAL,
    [ONE_OF,
     [1/3, 1/3, 1/3],     
     {id: "shsgia", text: "SHS Gruesome A. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"},
     {id: "shsgib", text: "SHS Gruesome B. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"},
     {id: "shsgic", text: "SHS Gruesome C. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"}
    ],{
	id: "shsgrabg", text: "SHSG1:  On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extemely', please tell me whether this warning message <br/><br/> ...grabs your attention", value: 5, minValue: 1, maxValue: 10 
    },{
	id: "shsalarmg", text: "SHSG2:  (NOTE: ONLY REPEAT PREAMBLE IF NECESSARY: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is alarming", value: 5, minValue: 1, maxValue: 10
    },{
	id: "shsfrightg", text: "SHSG3:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is frightening", value: 5, minValue: 1, maxValue: 10
    },{
	id: "shsunpleasg", text: "SHSG4:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is unpleasant", value: 5, minValue: 1, maxValue: 10
    },{
	id: "shsbelievg", text: "SHSG5:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message) <br/><br/> ...is believable", value: 5, minValue: 1, maxValue: 10 
    },{
	id: "shsspeakg", text: "SHSG6:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...speaks to people like you", value: 5, minValue: 1, maxValue: 10 
    },{
	id: "shsconcg", text: "SHSG7:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...makes you more concerned about the dangers of smoking", value: 5, minValue: 1, maxValue: 10
    },{
	id: "shsquitg", text: "SHSG8:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...makes you want to quit", value: 5, minValue: 1, maxValue: 10
    },{
	id: "shseffg", text: "SHSG9:  Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10
    }];

var SHSHumanSuffering = [
    SEQUENTIAL,
    [ONE_OF,
     [1/3, 1/3, 1/3],     
     {id: "shshia", text: "SHS Human A. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"},
     {id: "shshib", text: "SHS Human B. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"},
     {id: "shshic", text: "SHS Human C. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"}
    ],{
	id: "shsgrabh", text: "SHSHS1: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extemely', please tell me whether this warning message <br/><br/> ...grabs your attention", value: 5, minValue: 1, maxValue: 10 
    },{
	id: "shsalarmh", text: "SHSHS2:  (NOTE: ONLY REPEAT PREAMBLE IF NECESSARY: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is alarming", value: 5, minValue: 1, maxValue: 10
    },{
	id: "shsfrighth", text: "SHSHS3:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is frightening", value: 5, minValue: 1, maxValue: 10
    },{
	id: "shsunpleash", text: "SHSHS4:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is unpleasant", value: 5, minValue: 1, maxValue: 10
    },{
	id: "shsbelievh", text: "SHSHS5: (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message) <br/><br/> ...is believable", value: 5, minValue: 1, maxValue: 10 
    },{
	id: "shsspeakh", text: "SHSHS6:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...speaks to people like you", value: 5, minValue: 1, maxValue: 10 
    },{
	id: "shsconch", text: "SHSHS7:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...makes you more concerned about the dangers of smoking", value: 5, minValue: 1, maxValue: 10
    },{
	id: "shsquith", text: "SHSHS8:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...makes you want to quit", value: 5, minValue: 1, maxValue: 10
    },{
	id: "shseffh", text: "SHSHS9:  Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10
    }
];

var SHSSymbolic = [
    SEQUENTIAL,
    [ONE_OF,
     [1/3, 1/3, 1/3],     
     {id: "shssia", text: "SHS Symbolic A. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"},
     {id: "shssib", text: "SHS Symbolic B. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"},
     {id: "shssic", text: "SHS Symbolic C. <br/><br> (NOTE: Give the participant the cigarette package and make sure that they take the time to view BOTH sides of the pack. Some packs have different images on both sides, whereas others do not)"}
    ],{
	id: "shsgrabs", text: "SHSSY1:  On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extemely', please tell me whether this warning message <br/><br/> ...grabs your attention", value: 5, minValue: 1, maxValue: 10 
    },{
	id: "shsalarms", text: "SHSSY2:  (NOTE: ONLY REPEAT PREAMBLE IF NECESSARY: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is alarming", value: 5, minValue: 1, maxValue: 10
    },{
	id: "shsfrights", text: "SHSSY3:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is frightening", value: 5, minValue: 1, maxValue: 10
    },{
	id: "shsunpleass", text: "SHSSY4:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...is unpleasant", value: 5, minValue: 1, maxValue: 10
    },{
	id: "shsbelievs", text: "SHSSY5:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell me whether this warning message) <br/><br/> ...is believable", value: 5, minValue: 1, maxValue: 10 
    },{
	id: "shsspeaks", text: "SHSSY6:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...speaks to people like you", value: 5, minValue: 1, maxValue: 10 
    },{
	id: "shsconcs", text: "SHSSY7:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...makes you more concerned about the dangers of smoking", value: 5, minValue: 1, maxValue: 10
    },{
	id: "shsquits", text: "SHSSY8:  (NOTE: On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extremely', please tell whether this warning message) <br/><br/> ...makes you want to quit", value: 5, minValue: 1, maxValue: 10
    },{
	id: "shseffs", text: "SHSSY9:  Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10
    }];


var healthTopicCancer  = [
    SEQUENTIAL, [
	RANDOM_ORDER,
	cancerGruesome,
	cancerHumanSuffering,
	cancerSymbolic],{
	    id: "mostimpactCancer", 
	    text: "MI: (NOTE: Show the participant the packs that they just evaluated) <br/><br/>  Overall, which warning do you think is the <u>most effective</u> for motivating you to quit?",  
	    answers: ["gruesome img", "human suffering image", "symbolic image"]},{
	    id: "mostimpactCancer2", 
	    text: "MI: (NOTE: Show the participant the packs that they just evaluated) <br/><br/>  Overall, which warning do you think is the <u>second-most effective</u> for motivating you to quit?",  
	    answers: ["gruesome img", "human suffering image", "symbolic image"]}
];

var healthTopicCVD = [
    SEQUENTIAL, [
	RANDOM_ORDER,
	CVDGruesome,
	CVDHumanSuffering,
	CVDSymbolic], 
    {
        id: "mostimpactCVD", 
        text: "MI: (NOTE: Show the participant the packs that they just evaluated) <br/><br/>  Overall, which warning do you think is the <u>most effective</u> for motivating you to quit?",  
        answers: ["Gruesome image", "Human suffering image", "Symbolic image"]
    },{
        id: "mostimpactCVD2", 
        text: "MI: (NOTE: Show the participant the packs that they just evaluated) <br/><br/>  Overall, which warning do you think is the <u>second-most effective</u> for motivating you to quit?",  
        answers: ["Gruesome image", "Human suffering image", "Symbolic image"]
    }
];

var healthTopicSHS = [
    SEQUENTIAL, [
	RANDOM_ORDER,
	SHSGruesome,
	SHSHumanSuffering,
	SHSSymbolic],
    {
        id: "mostimpactSHS", 
        text: "MI: (NOTE: Show the participant the packs that they just evaluated) <br/><br/> Overall, which warning do you think is the <u>most effective</u> for motivating you to quit?",  
        answers: ["Gruesome image", "Human suffering image", "Symbolic image"]
    },{
        id: "mostimpactSHS2", 
        text: "MI: (NOTE: Show the participant the packs that they just evaluated) <br/><br/> Overall, which warning do you think is the <u>second-most effective</u> for motivating you to quit?",  
        answers: ["Gruesome image", "Human suffering image", "Symbolic image"]
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
	    id: "quitatt",
	    text: "D11.  On your <u>most recent attempt</u> to quit smoking, did you get any help, like counselling or using stop-smoking medicines?",
	    answers: ["Yes", "No (Skip to D13)", "Has never attempted to quit (Skip to D13)"]
        },{
	    id: "quithelp",
		multiplechoice: true,
	    text: "D12.  What kind of help did you get? (NOTE: Check <u>all</u> the responses that the respondent mentions)",
	    answers: ["Nicotine replacement (gum, patch, or lozenge)", "Other medications (Bupropion, Zyban, Wellbutrin, Verenicline, Champix)", "Individual or group support sessions", "Telephone quitline or help line", "advice from a doctor or other health professional", "Other"]
        },{
	    
	    id: "confid",
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

    id: "quitfuture",
    text: "D17.  (NOTE:  If participant does not use 1 to 10 response format, read the following statement: For this question, you should use a number from one to 10, where 1 means 'not at all' and 10 means 'extremely'.) <br/><br/> Using the same scale, where 1 is 'not at all' and 10 is 'extremely', How worried are you that smoking will damage your health in the future? ", value: 5, minValue: 1, maxValue: 10

        },{

	    id: "quitimp",
	    text: "D18. (NOTE:  If participant does not use 1 to 10 response format, read the following statement: For this question, you should use a number from one to 10, where 1 means 'not at all' and 10 means 'extremely'.) <br/><br/> Using the same scale, where 1 is 'not at all' and 10 is 'extremely', how much would quitting smoking improve your health?", value: 5, minValue: 1, maxValue: 10 
        },{

	    id: "quitns",
	    text: "D19. (NOTE:  If participant does not use 1 to 10 response format, read the following statement: For this question, you should use a number from one to 10, where 1 means 'not at all' and 10 means 'extremely'.) <br/><br/> Using the same scale, where 1 is 'not at all' and 10 is 'extremely', how dangerous is it for non-smokers to breathe cigarette smoke?", value: 5, minValue: 1, maxValue: 10 
        },{

	    id: "society",
	    text: "D20. (NOTE:  If participant does not use 1 to 10 response format, read the following statement: For this question, you should use a number from one to 10, where 1 means 'not at all' and 10 means 'extremely'.) <br/><br/> Using the same scale, where 1 is 'not at all' and 10 is 'extremely', how much does society <u>disapprove</u> of smoking?", value: 5, minValue: 1, maxValue: 10 
        },{
	    
	    id: "notice",
	    text: "D21.  The next set of questions asks about the health warning labels on cigarette packages, which contain information about the health risks of smoking. <br/><br/> In the last month, how often, if at all, have you noticed health warnings on cigarette packages? <br/><br/> (NOTE: Read responses)",
	    answers: ["Never","Rarely","Sometimes","Often","Very often"]

        },{
	    id: "think",
	    text: "D22.  To what extent, if at all, do the warning labels make you think about the health risks of smoking? <br/><br/> (NOTE: Read responses)",
	    answers: ["Not at all","A little","Somewhat","A lot"]
        },{
	    
	    id: "healthinfo",
	    text: "D23.  Do you think cigarette packages should have more health information than they do now, less information, or about the same amount as they do now?",
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
    	id: "confquit",
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
    	id: "quitfuture2",
    	text: "PE6.  (NOTE:  If participant does not use 1 to 10 response format, read the following statement: For this question, you should use a number from one to 10, where 1 means 'not at all' and 10 means 'extremely'.), <br/><br/> How worried are you, if at all, that smoking will damage your health in the future?", value: 5, minValue: 1, maxValue: 10
    },{
    	id: "quitimp2",
    	text:"PE7. (NOTE:  If participant does not use 1 to 10 response format, read the following statement: For this question, you should use a number from one to 10, where 1 means 'not at all' and 10 means 'extremely'.), <br/><br/> Using the same scale, How much would quitting smoking improve your health?",value: 5, minValue: 1, maxValue: 10
    },{
    id: "cals",
    text: "HL1.  Just one more set of questions, and we will be done. Please take a look at this information, which is found on the back of a container of a pint of ice cream. <br/><br/> (NOTE:Do not let participants see response options)<br/><br/> If you eat all of the ice cream in the container, how many calories will you eat?",
    answers: ["Correct response (i.e., 1000 calories)","Incorrect response"]
    },{
    id: "carbs",
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
	multiplechoice: true,
    text: "HL7.  Just three more questions and we will be done. <br/><br/> Are you currently...? (NOTE: Read responses)",
    answers: ["Employed for wages-full time","Employed for wages- part time", "Self-employed", "Unemployed", "Homemaker","Student","Retired","Unable to work"]
    },{
    id: "income",
    text: "HL8. (NOTE: Show respondent the options on the screen)<br/><br/> What was your annual household income from all sources during 2010? ",
    answers: ["No Response", "Less than $10,000","$10,000- $15,000", "$15,000-$25,000", "$25,000-$35,000", "$35,000-$45,000", "$45,000-$55,000", "$55,000-$75,000", "$75,000-$95,000","More than $95,000"]
    },{
    	id: "zipcode",
    	text: "HL9. Finally, can you tell me the zip code for the place where you live most of the time?"
    }
    ]};
