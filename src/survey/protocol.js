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
     {id: "cancerGruesomeImage1", text: "Cancer Gruesome Image 1",  answers: ["alpha", "beta", "gamma", "delta"]}, 
     {id: "cancerGruesomeImage2", text: "Cancer Gruesome Image 2",  answers: ["alpha", "beta", "gamma", "delta"]}, 
     {id: "cancerGruesomeImage3", text: "Cancer Gruesome Image 3",  answers: ["alpha", "beta", "gamma", "delta"]}
     ], {
     id: "cancerGrueAccep",
    text: "Cancer Gruesome acceptance question",
    answers: ["alpha", "beta", "gamma", "delta"]
    }
];

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
];

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
];


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
];

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
];

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
];

var SHSGruesome = [
    SEQUENTIAL,
    [ONE_OF,
     [1/3, 1/3, 1/3],     
     [SEQUENTIAL, 
      {id: "SHSGruesomeImageA", text: "SHS Gruesome Image A", value: 5, minValue: 1, maxValue: 10},
      {id: "secondA", text: "this is the acceptance"}], 
    [SEQUENTIAL, 
      {id: "SHSGruesomeImageB", text: "SHS Gruesome Image B", value: 5, minValue: 1, maxValue: 10},
      {id: "secondB", text: "this is the acceptance"}],       
    [SEQUENTIAL, 
      {id: "SHSGruesomeImageC", text: "SHS Gruesome Image C", value: 5, minValue: 1, maxValue: 10},
      {id: "secondV", text: "this is the acceptance"}]
     ],{
     id: "SHSGrueAccep-grab",
        text: "Did that message grab your attention?", value: 5, minValue: 1, maxValue: 10 
    },{
    	id: "SHSGrueAccep-believable",
        text: "Was that message believable?", value: 5, minValue: 1, maxValue: 10 
    },{
    	id: "SHSGrueAccep-relevant",
        text: "Was that message relevant?", value: 5, minValue: 1, maxValue: 10 
    }
];

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
];

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
];

var healthTopicCancer = [
    SEQUENTIAL, [
      RANDOM_ORDER,
      cancerGruesome,
      cancerHumanSuffering,
      cancerSymbolic],{
     id: "mostimapactCancer", 
        text: "7. Which of these cancer images had the most impact?",  
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
         text: "7. Which of these three CVD images had the most impact?",  
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
         text: "Which of these SHS images had the most impact?",  
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
          answers: ["within the first 5 minutes", "6-30 minutes", "31-60 minutes", "more than 60 minutes","no answer"]
          
          },{

               id: "brand",
               text: "Do you have a brand of cigarettes that you usually smoke?",
               answers: ["yes","no","no answer"]
     
          },{

               id: "brand",
               text: "What is the full name of your usual cigarette brand?"
          },{
               
               id: "quitplan",
               text: "Are you planning to quit smoking cigarettes...(READ OUT LOUD)",
               answers: ["Within the next month?", "WIthin the nest 6 months","Sometime in the future, beyond 6 months?", "No, I am not planning to quit"]
          },{
          
               id: "future",
               text: "How worried are you, if at all, that smoking will damage your health in the future?",
               answers: ["Not all all worried", "A little worried", "Very worried"]
          },{
          
              id: "society",
              text: "Please tell me whether you agree, neither agree nor disagree, or disagree with each of the following: Society approves of smoking.",
               answers: ["Agree", "Neither agree not disagree","Disagree",   "no answer"]
          },{

              id: "cigsmoke",
              text: "Cigarette smoking is dangerous to non-smokers.",
              answers: ["Agree", "Neither agree not disagree","Disagree",   "no answer"]
                    
          },{
              id: "quithard",
              text: "It is very difficult to quit smoking cigarettes.",
              answers: ["Agree", "Neither agree not disagree","Disagree",   "no answer"]

          },{
          
              id: "nodamage",
              text: "Smoking a cigarette every once in a while does not damage your health.",
              answers: ["Agree", "Neither agree not disagree","Disagree",   "no answer"]

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
          }
     ]};

