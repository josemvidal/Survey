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

var controlGroupTemplate = [
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
    answers: ["alpha", "beta", "gamma", "delta"]},
]

var cancerGruesome = [
    SEQUENTIAL,
    [ONE_OF,
     [1/3, 1/3, 1/3],
     {id: "cancerGruesomeImage1", text: "Cancer Gruesome Image 1",  answers: ["alpha", "beta", "gamma", "delta"]}, 
     {id: "cancerGruesomeImage2", text: "Cancer Gruesome Image 2",  answers: ["alpha", "beta", "gamma", "delta"]}, 
     {id: "cancerGruesomeImage3", text: "Cancer Gruesome Image 3",  answers: ["alpha", "beta", "gamma", "delta"]}
     ], {
	id: "cancerGrueAccep",
    text: "Cancer Gruesome acceptance question",
    answers: ["alpha", "beta", "gamma", "delta"]
    }
]

var cancerHumanSuffering = [
    SEQUENTIAL,
    [ONE_OF,
     [1/3, 1/3, 1/3],
     {id: "cancerHumanSuffering1", text: "Cancer Human Suffering Image 1",  answers: ["alpha", "beta", "gamma", "delta"]}, 
     {id: "cancerHumanSuffering2", text: "Cancer Human Suffering Image 2",  answers: ["alpha", "beta", "gamma", "delta"]}, 
     {id: "cancerHumanSuffering3", text: "Cancer Human Suffering Image 3",  answers: ["alpha", "beta", "gamma", "delta"]}
     ], {
	id: "cancerHSccep",
    text: "Cancer Human Suffering acceptance question",
    answers: ["alpha", "beta", "gamma", "delta"]
    }
]

var cancerSymbolic = [
    SEQUENTIAL,
    [ONE_OF,
     [1/3, 1/3, 1/3],
     {id: "cancerSymbolic1", text: "Cancer Symbolic Image 1",  answers: ["alpha", "beta", "gamma", "delta"]}, 
     {id: "cancerSymbolic2", text: "Cancer Symbolic Image 2",  answers: ["alpha", "beta", "gamma", "delta"]}, 
     {id: "cancerSymbolic3", text: "Cancer Symbolic Image 3",  answers: ["alpha", "beta", "gamma", "delta"]}
     ], {
	id: "cancerSymbAccep",
    text: "Cancer Symbolic acceptance question",
    answers: ["alpha", "beta", "gamma", "delta"]
    }
]


var CVDGruesome = [
    SEQUENTIAL,
    [ONE_OF,
     [1/3, 1/3, 1/3],     
     {id: "CVDGruesomeImage11", text: "CVD Gruesome Image 1",  answers: ["alpha", "beta", "gamma", "delta"]}, 
     {id: "CVDGruesomeImage12", text: "CVD Gruesome Image 2",  answers: ["alpha", "beta", "gamma", "delta"]}, 
     {id: "CVDGruesomeImage13", text: "CVD Gruesome Image 3",  answers: ["alpha", "beta", "gamma", "delta"]}
     ], {
	id: "CVDGrueAccep",
    text: "CVD Gruesome acceptance question",
    answers: ["alpha", "beta", "gamma", "delta"]
    }
]

var CVDHumanSuffering = [
    SEQUENTIAL,
    [ONE_OF,
     [1/3, 1/3, 1/3],     
     {id: "CVDHumanSuffering1", text: "CVD Human Suffering Image 1",  answers: ["alpha", "beta", "gamma", "delta"]}, 
     {id: "CVDHumanSuffering2", text: "CVD Human Suffering Image 2",  answers: ["alpha", "beta", "gamma", "delta"]}, 
     {id: "CVDHumanSuffering3", text: "CVD Human Suffering Image 3",  answers: ["alpha", "beta", "gamma", "delta"]}
     ], {
	id: "CVDHSccep",
    text: "CVD Human Suffering acceptance question",
    answers: ["alpha", "beta", "gamma", "delta"]
    }
]

var CVDSymbolic = [
    SEQUENTIAL,
    [ONE_OF,
     [1/3, 1/3, 1/3],     
     {id: "CVDSymbolic1", text: "CVD Symbolic Image 1",  answers: ["alpha", "beta", "gamma", "delta"]}, 
     {id: "CVDSymbolic2", text: "CVD Symbolic Image 2",  answers: ["alpha", "beta", "gamma", "delta"]}, 
     {id: "CVDSymbolic3", text: "CVD Symbolic Image 3",  answers: ["alpha", "beta", "gamma", "delta"]}
     ], {
	id: "CVDSymbAccep",
    text: "CVD Symbolic acceptance question",
    answers: ["alpha", "beta", "gamma", "delta"]
    }
]

var SHSGruesome = [
    SEQUENTIAL,
    [ONE_OF,
     [1/3, 1/3, 1/3],     
     [SEQUENTIAL, 
      {id: "SHSGruesomeImage11", text: "SHS Gruesome Image 1",   value: 5, minValue: 1, maxValue: 10},
      {id: "second1", text: "this is the acceptance"}], 
    [SEQUENTIAL, 
      {id: "SHSGruesomeImage12", text: "SHS Gruesome Image 1",   value: 5, minValue: 1, maxValue: 10},
      {id: "second2", text: "this is the acceptance"}],       
    [SEQUENTIAL, 
      {id: "SHSGruesomeImage13", text: "SHS Gruesome Image 1",   value: 5, minValue: 1, maxValue: 10},
      {id: "second3", text: "this is the acceptance"}],             
     ], {
	id: "SHSGrueAccep",
    text: "SHS Gruesome acceptance question",
    answers: ["alpha", "beta", "gamma", "delta"]
    }
]

var SHSHumanSuffering = [
    SEQUENTIAL,
    [ONE_OF,
     [1/3, 1/3, 1/3],     
     {id: "SHSHumanSuffering1", text: "SHS Human Suffering Image 1",   value: 5, minValue: 1, maxValue: 10}, 
     {id: "SHSHumanSuffering2", text: "SHS Human Suffering Image 2",  answers: ["alpha", "beta", "gamma", "delta"]}, 
     {id: "SHSHumanSuffering3", text: "SHS Human Suffering Image 3",  answers: ["alpha", "beta", "gamma", "delta"]}
     ], {
	id: "SHSHSccep",
    text: "SHS Human Suffering acceptance question",
    answers: ["alpha", "beta", "gamma", "delta"]
    }
]

var SHSSymbolic = [
    SEQUENTIAL,
    [ONE_OF,
     [1/3, 1/3, 1/3],     
     {id: "SHSSymbolic1", text: "SHS Symbolic Image 1",  value: 5, minValue: 1, maxValue: 10}, 
     {id: "SHSSymbolic2", text: "SHS Symbolic Image 2",  answers: ["alpha", "beta", "gamma", "delta"]}, 
     {id: "SHSSymbolic3", text: "SHS Symbolic Image 3",  answers: ["alpha", "beta", "gamma", "delta"]}
     ], {
	id: "SHSSymbAccep",
    text: "SHS Symbolic acceptance question",
    answers: ["alpha", "beta", "gamma", "delta"]
    }
]

var healthTopicCancer = [
    SEQUENTIAL, [
      RANDOM_ORDER,
      cancerGruesome,
      cancerHumanSuffering,
      cancerSymbolic],
      {
    	id: "mostimapactCancer", 
    	text: "7. Which of these cancer images had the most impact?",  
    	answers: ["gruesome img", "human suffering image", "symbolic image"],
    	switches: true
      }
]

var healthTopicCVD = [
    SEQUENTIAL, [
      RANDOM_ORDER,
      CVDGruesome,
      CVDHumanSuffering,
      CVDSymbolic], 
      {
    	id: "mostimapactCVD", 
    	text: "7. Which of these three CVD images had the most impact?",  
    	answers: ["gruesome img", "human suffering image", "symbolic image"],
    	switches: true
      }
]

var healthTopicSHS = [
    SEQUENTIAL, [
      RANDOM_ORDER,
      SHSGruesome,
      SHSHumanSuffering,
      SHSSymbolic],
      {
    	id: "mostimapactSHS", 
    	text: "Which of these SHS images had the most impact?",  
    	answers: ["gruesome img", "human suffering image", "symbolic image"],
    	switches: true
      }
]

var experimentalGroupTemplate = [
    RANDOM_ORDER,
	healthTopicCancer,
	healthTopicCVD,
	healthTopicSHS
]

var surveyTemplate = {
	id: "100",
	name: "Smoking Survey",
	questions: [
	    SEQUENTIAL, {
		id: "q0",
		text: "How old are you?",
		answers: ["<25", "26 to 40", "41 to 60", "61 or over"]
	   },{
		   id: "switch-cond",
		   text: "Which one of these is your most favorite?",
		   answers: ["red", "blue", "green"],
		   switches: [{
			   show: ["chose-red"],
			   hide: ["chose-blue", "chose-green"]},{
			   show: ["chose-blue"],
			   hide: ["chose-red", "chose-green"]},{
			   show: ["chose-green"],
			   hide: ["chose-red", "chose-blue"]}]
		},{
			id: "chose-red",
			text: "Which one of these is your most favorite?",
			answers: ["blue", "green"],
			starthidden: true
		},{
			id: "chose-blue",
			text: "Which one of these is your most favorite?",
			answers: ["red", "green"],
			starthidden: true			
		},{
			id: "chose-green",
			text: "Which one of these is your most favorite?",
			answers: ["red", "blue"],
			starthidden: true,
		},{
		   id: "sampletext",
		   text: "Sample text question 1"
	},
	   [
	      ONE_OF,
		  [0.2, 0.8],
		  controlGroupTemplate,
		  experimentalGroupTemplate
		],{
		id: "sliderq",
		text: "Test slider question. How much do you like the slider?<br/>0=Not at all, 10=Excellent!",
		value: 5,
		minValue: 0,
		maxValue: 10
	   },{
		   id: "finalq1",
		   text: "Final common question 1"
		},
		{
		   id: "finalq2",
		   text: "Final common question 2"
		}
	]
}

