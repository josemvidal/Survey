/**
 * Protocol Representation Language.
 * 
 * Protocols are JSON objects, with a particular format. A protocol is a list, each element is either a question (an object) or another list.
 * 
 *  [SEQUENTIAL, q1, q2, 3] = ask q1,q2,q3 in sequence.
 *  [ONE_OF, [1/3, 2/3], q1, q2] = ask one of q1 or q2, ask q1 with 1/3 probability and q2 with 2/3 probability
 *  [RANDOM_ORDER, q1, q2, q3] = ask all of q1,q2,q3 but in random order.
 *  
 *  They can be nested, arbitrarily deep.
 *  
 *  [SEQUENTIAL, q1, [RANDOM_ORDER, q2, q3], q4]
 * 
 * A question an abject, with an 'id', 'text', and optional 'answers'.
 * {id: "cancerGruesomeImage1", text: "Cancer Gruesome Image 1",  answers: ["alpha", "beta", "gamma", "delta"]},
 * 
 * 'id's should be unique. 
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
     {id: "CVDGruesomeImage1", text: "CVD Gruesome Image 1",  answers: ["alpha", "beta", "gamma", "delta"]}, 
     {id: "CVDGruesomeImage2", text: "CVD Gruesome Image 2",  answers: ["alpha", "beta", "gamma", "delta"]}, 
     {id: "CVDGruesomeImage3", text: "CVD Gruesome Image 3",  answers: ["alpha", "beta", "gamma", "delta"]}
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
     {id: "SHSGruesomeImage1", text: "SHS Gruesome Image 1",  answers: ["alpha", "beta", "gamma", "delta"]}, 
     {id: "SHSGruesomeImage2", text: "SHS Gruesome Image 2",  answers: ["alpha", "beta", "gamma", "delta"]}, 
     {id: "SHSGruesomeImage3", text: "SHS Gruesome Image 3",  answers: ["alpha", "beta", "gamma", "delta"]}
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
     {id: "SHSHumanSuffering1", text: "SHS Human Suffering Image 1",  answers: ["alpha", "beta", "gamma", "delta"]}, 
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
     {id: "SHSSymbolic1", text: "SHS Symbolic Image 1",  answers: ["alpha", "beta", "gamma", "delta"]}, 
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
    	id: "mostimapactCancer1", 
    	text: "7. Which of the three cancer images had the most impact?",  
    	answers: ["gruesome img", "human suffering image", "symbolic image"]
      },{
    	id: "mostimapactCancer2", 
    	text: "7. Which of the three cancer images had the second-most impact?",  
    	answers: ["gruesome img", "human suffering image", "symbolic image"]}       
]

var healthTopicCVD = [
    SEQUENTIAL, [
      RANDOM_ORDER,
      CVDGruesome,
      CVDHumanSuffering,
      CVDSymbolic], 
      {
    	id: "mostimapactCVD1", 
    	text: "7. Which of the three CVD images had the most impact?",  
    	answers: ["gruesome img", "human suffering image", "symbolic image"]
      },{
    	id: "mostimapactCVD2", 
    	text: "7. Which of the three CVD images had the second-most impact?",  
    	answers: ["gruesome img", "human suffering image", "symbolic image"]} 
]

var healthTopicSHS = [
    SEQUENTIAL, [
      RANDOM_ORDER,
      SHSGruesome,
      SHSHumanSuffering,
      SHSSymbolic],
      {
    	id: "mostimapactSHS1", 
    	text: "7. Which of the three SHS images had the most impact?",  
    	answers: ["gruesome img", "human suffering image", "symbolic image"]
      },{
    	id: "mostimapactSHS2", 
    	text: "7. Which of the three SHS images had the second-most impact?",  
    	answers: ["gruesome img", "human suffering image", "symbolic image"]} 
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
	   }, {
		id: "sliderq",
		text: "Test slider question. How much do you like the slider?<br/>0=Not at all, 10=Excellent!",
		value: 5,
		minValue: 0,
		maxValue: 10
	   },{
		   id: "sampletext",
		   text: "Sample text question 1"
	},
	   [
	      ONE_OF,
		  [0.2, 0.8],
		  controlGroupTemplate,
		  experimentalGroupTemplate
		],
		{
		   id: "finalq1",
		   text: "Final common question 1"
		},
		{
		   id: "finalq2",
		   text: "Final common question 2"
		}
	]
}

surveyTemplate.keys = {}

function getAllQuestionIds(t){
	var result = [];
    var chosenQuestionList;
	if (!(t instanceof Array)) {
		if (surveyTemplate.keys[t.id]){
			console.log("ERROR: surveyTemplate has repeated question id=" + t.id);
		}
		surveyTemplate.keys[t.id] = true;
		return t.id;
	}
	var type = t.shift();
	if (type == ONE_OF) {
		t.shift();
	}
	for (var i =0; i < t.length; i++){
		result = result.concat(getAllQuestionIds(t[i]));
	};
	return result;
}


Object.prototype.clone = function() {
	return JSON.parse(JSON.stringify(this));
}

surveyTemplate.questionIds = getAllQuestionIds(surveyTemplate.questions.clone());

