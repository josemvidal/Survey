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
    answers: ["alpha", "beta", "gamma", "delta"]}
];

var cancerGruesome = [

    SEQUENTIAL,

    [ONE_OF,

     [1/3, 1/3, 1/3],     

      {id: "cancerGruesomeImageA", text: "Cancer Gruesome Image A"},

      {id: "cancerGruesomeImageB", text: "Cancer Gruesome Image B"},

      {id: "cancerGruesomeImageC", text: "Cancer Gruesome Image C"}

     ],{

     id: "CancerGrueAccep-grab", text: "On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extemely', please tell me whether this warning message... grabs your attention", value: 5, minValue: 1, maxValue: 10 

    },{

     id: "CancerGrueAccep-believable", text: "... is believable", value: 5, minValue: 1, maxValue: 10 

    },{

     id: "CancerGrueAccep-relevant", text: "... is relevant to you", value: 5, minValue: 1, maxValue: 10 

    },{

     id: "CancerGrueAccep-alarm", text: "... is alarming", value: 5, minValue: 1, maxValue: 10

	},{

     id: "CancerGrueAccep-concern", text: "... makes people more concerned about the health risks of smoking", value: 5, minValue: 1, maxValue: 10

	},{

     id: "CancerGrueAccep-young", text: "... would help prevent young people from starting to smoke ", value: 5, minValue: 1, maxValue: 10

	},{

     id: "CancerGrueAccep-quit", text: "... would make smokers want to quit", value: 5, minValue: 1, maxValue: 10

	},{

     id: "CancerGrueAccep-overall", text: "Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10

}

];

var cancerHumanSuffering = [

    SEQUENTIAL,

    [ONE_OF,

     [1/3, 1/3, 1/3],     

      {id: "cancerHumanSufferingImageA", text: "Cancer Human Suffering Image A"},

      {id: "cancerHumanSufferingImageB", text: "Cancer Human Suffering Image B"},

      {id: "cancerHumanSufferingImageC", text: "Cancer Human Suffering Image C"}

     ],{

     id: "CancerHSAccep-grab", text: "On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extemely', please tell me whether this warning message... grabs your attention", value: 5, minValue: 1, maxValue: 10 

    },{

     id: "CancerHSAccep-believable", text: "... is believable", value: 5, minValue: 1, maxValue: 10 

    },{

     id: "CancerHSAccep-relevant", text: "... is relevant to you", value: 5, minValue: 1, maxValue: 10 

    },{

     id: "CancerHSAccep-alarm", text: "... is alarming", value: 5, minValue: 1, maxValue: 10

	},{

     id: "CancerHSAccep-concern", text: "... makes people more concerned about the health risks of smoking", value: 5, minValue: 1, maxValue: 10

	},{

     id: "CancerHSAccep-young", text: "... would help prevent young people from starting to smoke ", value: 5, minValue: 1, maxValue: 10

	},{

     id: "CancerHSAccep-quit", text: "... would make smokers want to quit", value: 5, minValue: 1, maxValue: 10

	},{

     id: "CancerHSAccep-overall", text: "Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10

}

];

	var cancerSymbolic = [

	    SEQUENTIAL,

	    [ONE_OF,

	     [1/3, 1/3, 1/3],     

	      {id: "cancerSymbolicImageA", text: "Cancer Symbolic Image A"},

	      {id: "cancerSymbolicImageB", text: "Cancer Symbolic Image B"},

	      {id: "cancerSymbolicImageC", text: "Cancer Symbolic Image C"}

	     ],{

	     id: "CancerHSAccep-grab", text: "On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extemely', please tell me whether this warning message... grabs your attention", value: 5, minValue: 1, maxValue: 10 

	    },{

	     id: "CancerSymbolicAccep-believable", text: "... is believable", value: 5, minValue: 1, maxValue: 10 

	    },{

	     id: "CancerSymbolicAccep-relevant", text: "... is relevant to you", value: 5, minValue: 1, maxValue: 10 

	    },{

	     id: "CancerSymbolicAccep-alarm", text: "... is alarming", value: 5, minValue: 1, maxValue: 10

		},{

	     id: "CancerSymbolicAccep-concern", text: "... makes people more concerned about the health risks of smoking", value: 5, minValue: 1, maxValue: 10

		},{

	     id: "CancerSymbolicAccep-young", text: "... would help prevent young people from starting to smoke ", value: 5, minValue: 1, maxValue: 10

		},{

	     id: "CancerSymbolicAccep-quit", text: "... would make smokers want to quit", value: 5, minValue: 1, maxValue: 10

		},{

	     id: "CancerSymbolicAccep-overall", text: "Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10

}

];

var CVDGruesome = [

    SEQUENTIAL,

    [ONE_OF,

     [1/3, 1/3, 1/3],     

      {id: "CVDGruesomeImageA", text: "CVD Gruesome Image A"},

      {id: "CVDGruesomeImageB", text: "CVD Gruesome Image B"},

      {id: "CVDGruesomeImageC", text: "CVD Gruesome Image C"}

     ],{

     id: "CVDGrueAccep-grab", text: "On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extemely', please tell me whether this warning message... grabs your attention", value: 5, minValue: 1, maxValue: 10 

    },{

     id: "CVDGrueAccep-believable", text: "... is believable", value: 5, minValue: 1, maxValue: 10 

    },{

     id: "CVDGrueAccep-relevant", text: "... is relevant to you", value: 5, minValue: 1, maxValue: 10 

    },{

     id: "CVDGrueAccep-alarm", text: "... is alarming", value: 5, minValue: 1, maxValue: 10

	},{

     id: "CVDGrueAccep-concern", text: "... makes people more concerned about the health risks of smoking", value: 5, minValue: 1, maxValue: 10

	},{

     id: "CVDGrueAccep-young", text: "... would help prevent young people from starting to smoke ", value: 5, minValue: 1, maxValue: 10

	},{

     id: "CVDGrueAccep-quit", text: "... would make smokers want to quit", value: 5, minValue: 1, maxValue: 10

	},{

     id: "CVDGrueAccep-overall", text: "Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10

}

];

var CVDHumanSuffering = [

    SEQUENTIAL,

    [ONE_OF,

     [1/3, 1/3, 1/3],     

      {id: "CVDHumanSufferingImageA", text: "CVD Human Suffering Image A"},

      {id: "CVDHumanSufferingImageB", text: "CVD Human Suffering Image B"},

      {id: "CVDHumanSufferingImageC", text: "CVD Human Suffering Image C"}

     ],{

     id: "CVDHSAccep-grab", text: "On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extemely', please tell me whether this warning message... grabs your attention", value: 5, minValue: 1, maxValue: 10 

    },{

     id: "CVDHSAccep-believable", text: "... is believable", value: 5, minValue: 1, maxValue: 10 

    },{

     id: "CVDHSAccep-relevant", text: "... is relevant to you", value: 5, minValue: 1, maxValue: 10 

    },{

     id: "CVDHSAccep-alarm", text: "... is alarming", value: 5, minValue: 1, maxValue: 10

	},{

     id: "CVDHSAccep-concern", text: "... makes people more concerned about the health risks of smoking", value: 5, minValue: 1, maxValue: 10

	},{

     id: "CVDHSAccep-young", text: "... would help prevent young people from starting to smoke ", value: 5, minValue: 1, maxValue: 10

	},{

     id: "CVDHSAccep-quit", text: "... would make smokers want to quit", value: 5, minValue: 1, maxValue: 10

	},{

     id: "CVDHSAccep-overall", text: "Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10

}

];

	var CVDSymbolic = [

	    SEQUENTIAL,

	    [ONE_OF,

	     [1/3, 1/3, 1/3],     

	      {id: "CVDSymbolicImageA", text: "CVD Symbolic Image A"},

	      {id: "CVDSymbolicImageB", text: "CVD Symbolic Image B"},

	      {id: "CVDSymbolicImageC", text: "CVD Symbolic Image C"}

	     ],{

	     id: "CVDHSAccep-grab", text: "On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extemely', please tell me whether this warning message... grabs your attention", value: 5, minValue: 1, maxValue: 10 

	    },{

	     id: "CVDSymbolicAccep-believable", text: "... is believable", value: 5, minValue: 1, maxValue: 10 

	    },{

	     id: "CVDSymbolicAccep-relevant", text: "... is relevant to you", value: 5, minValue: 1, maxValue: 10 

	    },{

	     id: "CVDSymbolicAccep-alarm", text: "... is alarming", value: 5, minValue: 1, maxValue: 10

		},{

	     id: "CVDSymbolicAccep-concern", text: "... makes people more concerned about the health risks of smoking", value: 5, minValue: 1, maxValue: 10

		},{

	     id: "CVDSymbolicAccep-young", text: "... would help prevent young people from starting to smoke ", value: 5, minValue: 1, maxValue: 10

		},{

	     id: "CVDSymbolicAccep-quit", text: "... would make smokers want to quit", value: 5, minValue: 1, maxValue: 10

		},{

	     id: "CVDSymbolicAccep-overall", text: "Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10

}

];

var SHSGruesome = [

    SEQUENTIAL,

    [ONE_OF,

     [1/3, 1/3, 1/3],     

      {id: "SHSGruesomeImageA", text: "SHS Gruesome Image A"},

      {id: "SHSGruesomeImageB", text: "SHS Gruesome Image B"},

      {id: "SHSGruesomeImageC", text: "SHS Gruesome Image C"}

     ],{

     id: "SHSGrueAccep-grab", text: "On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extemely', please tell me whether this warning message... grabs your attention", value: 5, minValue: 1, maxValue: 10 

    },{

     id: "SHSGrueAccep-believable", text: "... is believable", value: 5, minValue: 1, maxValue: 10 

    },{

     id: "SHSGrueAccep-relevant", text: "... is relevant to you", value: 5, minValue: 1, maxValue: 10 

    },{

     id: "SHSGrueAccep-alarm", text: "... is alarming", value: 5, minValue: 1, maxValue: 10

	},{

     id: "SHSGrueAccep-concern", text: "... makes people more concerned about the health risks of smoking", value: 5, minValue: 1, maxValue: 10

	},{

     id: "SHSGrueAccep-young", text: "... would help prevent young people from starting to smoke ", value: 5, minValue: 1, maxValue: 10

	},{

     id: "SHSGrueAccep-quit", text: "... would make smokers want to quit", value: 5, minValue: 1, maxValue: 10

	},{

     id: "SHSGrueAccep-overall", text: "Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10

}

];

var SHSHumanSuffering = [

    SEQUENTIAL,

    [ONE_OF,

     [1/3, 1/3, 1/3],     

      {id: "SHSHumanSufferingImageA", text: "SHS Human Suffering Image A"},

      {id: "SHSHumanSufferingImageB", text: "SHS Human Suffering Image B"},

      {id: "SHSHumanSufferingImageC", text: "SHS Human Suffering Image C"}

     ],{

     id: "SHSHSAccep-grab", text: "On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extemely', please tell me whether this warning message... grabs your attention", value: 5, minValue: 1, maxValue: 10 

    },{

     id: "SHSHSAccep-believable", text: "... is believable", value: 5, minValue: 1, maxValue: 10 

    },{

     id: "SHSHSAccep-relevant", text: "... is relevant to you", value: 5, minValue: 1, maxValue: 10 

    },{

     id: "CVDHSAccep-alarm", text: "... is alarming", value: 5, minValue: 1, maxValue: 10

	},{

     id: "SHSHSAccep-concern", text: "... makes people more concerned about the health risks of smoking", value: 5, minValue: 1, maxValue: 10

	},{

     id: "SHSHSAccep-young", text: "... would help prevent young people from starting to smoke ", value: 5, minValue: 1, maxValue: 10

	},{

     id: "SHSHSAccep-quit", text: "... would make smokers want to quit", value: 5, minValue: 1, maxValue: 10

	},{

     id: "SHSHSAccep-overall", text: "Overall, on a scale of 1 to 10, how effective is this health warning?", value: 5, minValue: 1, maxValue: 10

}

];

	var SHSSymbolic = [

	    SEQUENTIAL,

	    [ONE_OF,

	     [1/3, 1/3, 1/3],     

	      {id: "SHSSymbolicImageA", text: "SHS Symbolic Image A"},

	      {id: "SHSSymbolicImageB", text: "SHS Symbolic Image B"},

	      {id: "SHSSymbolicImageC", text: "SHS Symbolic Image C"}

	     ],{

	     id: "SHSHSAccep-grab", text: "On a scale of 1 to 10, where 1 is 'not at all' and 10 is 'extemely', please tell me whether this warning message... grabs your attention", value: 5, minValue: 1, maxValue: 10 

	    },{

	     id: "SHSSymbolicAccep-believable", text: "... is believable", value: 5, minValue: 1, maxValue: 10 

	    },{

	     id: "SHSSymbolicAccep-relevant", text: "... is relevant to you", value: 5, minValue: 1, maxValue: 10 

	    },{

	     id: "SHSSymbolicAccep-alarm", text: "... is alarming", value: 5, minValue: 1, maxValue: 10

		},{

	     id: "SHSSymbolicAccep-concern", text: "... makes people more concerned about the health risks of smoking", value: 5, minValue: 1, maxValue: 10

		},{

	     id: "SHSSymbolicAccep-young", text: "... would help prevent young people from starting to smoke ", value: 5, minValue: 1, maxValue: 10

		},{

	     id: "SHSSymbolicAccep-quit", text: "... would make smokers want to quit", value: 5, minValue: 1, maxValue: 10

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
         answers: ["gruesome img", "human suffering image", "symbolic image"],
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
         answers: ["gruesome img", "human suffering image", "symbolic image"],
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
               answers: ["Within the next month?", "Within the nest 6 months","Sometime in the future, beyond 6 months?", "No, I am not planning to quit"]
          },{
          
               id: "future",
               text: "How worried are you, if at all, that smoking will damage your health in the future?",
               answers: ["Not all all worried", "A little worried", "Very worried"]
          },{
          
              id: "society",
              text: "Please tell me whether you agree, neither agree nor disagree, or disagree with each of the following: Society approves of smoking.",
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
          }, experimentalGroupTemplate
     ]};
