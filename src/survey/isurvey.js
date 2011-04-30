/** When there is an updateready we swap it in and reload the page. This causes
the app to 'flash' after we start it.
This does not work on chrome, which does not fire these events. chrome://appcache-internals/

webappCache.status = 
Status 0 (UNCACHED) is returned which means that there is no cache available
Status 1 (IDLE) is returned means the cache you have is currently the most up-to-date
Status 2 (CHECKING) is returned means there is a change in your manifest file and it is checking it for changes
Status 3 (DOWNLOADING) is retuned means changes have been found and they are being added to your cache
Status 4 (UPDATEREADY) is retuned means your new cache is ready to be updated and override your current cache
Status 5 (OBSOLETE) is returned means your cache is no longer valid meaning it has been removed

TODO: Have a question depend on the user's answer to a previous one: [SWITCH conditional-question case0-question case1-question....]

TODO: Add slider widget.

*/



var webappCache = window.applicationCache;
function updateCache(){
	console.log("New version available. Installing it...")
    webappCache.swapCache();
    location.reload();
}
webappCache.addEventListener("updateready", updateCache, false);
function errorCache(){
    console.log("Cache failed to update. Using local version.");
}
webappCache.addEventListener("error", errorCache, false);
function downloadinNewVersion(){
    console.log("Downloading new version...");
}
webappCache.addEventListener("progress", downloadinNewVersion, false);

var testSurvey = {
    id: "100",
    name: "Survey",
    questions: [{
	id: "q0",
	text: "What is 6 times 7?",
	answers: ['12', '44', '42', '48']
    },{
	id: "q1",
	text: "What is 4 + 4?",
	answers: ['4', '8', '12', '6']
    },{
	id: "q2",
	text: "Who designed the <b>Eiffel</b> tower?",
	answers: ['Koechlin', 'Nouguier', 'Sauvestre', 'Eiffel']
    },{
	id: "q3",
	text: "What did you think about this survey?"
    }]
}


function getStochasticChoice(probabilities){
	var r = Math.random();
	var i = 0;
	var c = probabilities[0];
	for (i = 1; i < probabilities.length; i++){
		if (r < c) {
			return i -1;
		};
		c += probabilities[i];
	}
	return probabilities.length - 1;
}

Array.prototype.chooseStochastically = function(probabilities){
	var p = probabilities.length;
	var a = this.length;
	if (p != a) {
		console.log("ERROR: chooseStochastically, probabilities don't match array length.")
	};
	return this[getStochasticChoice(probabilities)];
}

Array.prototype.shuffle = function() {
	var s = [];
	while (this.length) {s.push(this.splice(Math.random() * this.length, 1)[0])};
	while (s.length) this.push(s.pop());
	return this;
}

/** Returns a survey: an array of questions
 * t is an array of questions
 * 
 */
function flattenTemplateQuestions(t){
	var result = [];
	var chosenQuestionList;
	if (!(t instanceof Array)) {
		return t;
	}
	var type = t[0];
	if (type == ONE_OF) {
		var probabilities = t[1];
		chosenOne = t.slice(2).chooseStochastically(probabilities);
		return flattenTemplateQuestions(chosenOne);
	}
	else if (type == RANDOM_ORDER) {
		return flattenTemplateQuestions([SEQUENTIAL].concat(t.slice(1).shuffle()));
	}
	else if (type == SEQUENTIAL) {
		for (var i =1; i < t.length; i++){
			result = result.concat(flattenTemplateQuestions(t[i]));
		};
		return result;
	}
	else {console.log('ERROR: unrecognized head of list.');}
	return result;
}

function getNewSurvey(){
//	var st = surveyTemplate.clone();
	var st = {id: surveyTemplate.id, name: surveyTemplate.name};
	st.questions = flattenTemplateQuestions(surveyTemplate.questions);
	return st;
}

/** Points to the survey we are currently administering. */
var currentSurvey = null;
/** Start time of currentSurvey */
var startTime = null;
var endTime = null;

/** array of all the answers we have gotten. Also */
function setKey(key, val) { 
/** We need this function because otherwise we get 'quota exceeded error' on ipad: http://stackoverflow.com/questions/2603682 */
  localStorage.removeItem(key);
  localStorage.setItem(key, val); 
};

if (!localStorage.getItem('answers')) {
    setKey('answers',JSON.stringify([]));}

 
/**
question = 
{
 id: "0",
 "text" : "What is 6 times 7?",
 "answers": [
    "12", "45", "22", "42"]
}

*/

myLoadMask = Ext.extend(Ext.LoadMask, {
	onBeforeLoad : function() {
    if (!this.disabled) {
        this.el.mask('<div class="x-loading-msg">' + this.msg + '</div>', this.msgCls, false);
        this.fireEvent('show', this, this.el, this.store);
    }
},

	
});

var o;
function makeQuestion(q){
    var answerItems = [];
    if (q.answers) {
	for (var i = 0; i < q.answers.length; i++){
	    answerItems.push(
		{ name: "answer", label: q.answers[i], value: String(i)});
	};
    }
    else {
	answerItems = [ new Ext.form.TextArea({
	    name: 'answer',
	})];
    }
    return  {
	xtype: 'form',
	id: q["id"],
    listeners: {
	     check: function(e,t) {
    		var children = this.items.items[0].items.items
    		o = children;
    		for (var i=0;i<children.length;i++){
    			//children[i].setLoading(false);
    			Ext.destroy(children[i].loadMask);
    			children[i].loadMask = null;
    		}
    		e.loadMask = e.loadMask || new myLoadMask(e.el, Ext.applyIf({msgCls: 'selected', msg: ''}));
            e.loadMask.show();
    	    },
	     uncheck: function() {this.setLoading(false)},},
	items: [{
	    xtype: 'fieldset',
	    defaults: {margin: 10, xtype: 'radiofield', labelWidth: '70%', bubbleEvents: ['check']},
        title: q["text"],
	    items: answerItems
	}]};
}
/**
 * 	    defaults: {margin: 10, xtype: 'radiofield', labelWidth: '70%', bubbleEvents: ['check']},
    	listeners: {
			   check: function(item){console.log('checked');
			     o = this;
			     console.debug(this);
			     for (var i=0; i< this.items.items.length; i++){
			    	 this.items.items[i].el.dom.style.setProperty('color', 'red');
			         this.items.items[i].el.dom.style.setProperty('border', 'solid');
			    	 this.items.items[i].el.dom.style.setProperty('border', '10px');
			    	 console.debug(this.items.items[i]);
			     }
			   },
			   uncheck: function(){console.log('unchecked')}},
			   
 */

/**
function makeSurveyCarousel(){
    return new Ext.Carousel({
	id: 'survey',
	name: currentSurvey['name'],
	indicator: false,
	items: currentSurvey['questions'].map(makeQuestion)
    });
}
*/

function makeSurveyCarousel(){
    return new Ext.Carousel({
	id: 'survey',
	name: 'none yet',
	indicator: false,
    });
}

function resetQuestions(carous){
	carous.removeAll();
	currentSurvey['questions'].map(makeQuestion).map(function(q){carous.add(q);});
}
/** Returns a json object representing the answers to currentSurvey.
*/
function getAnswers(){
    var result = {};
    for (var i =0; i < currentSurvey.questions.length; i++){
	var id = currentSurvey.questions[i].id;
	var ans = Ext.getCmp(id).getValues().answer;
	result[id] = ans instanceof Array ? null : ans;
    };
    return {
	surveyId: currentSurvey.id,
	surveyName: currentSurvey.name,
	start: startTime,
	end: endTime,
	answers: result
    };
}

function resetAnswers(){
    for (var i =0; i < currentSurvey.questions.length; i++){
	var id = currentSurvey.questions[i].id;
	Ext.getCmp(id).reset();
    }
}

function updateAnswerCount(){
    Ext.getCmp('surveyCount').setText('' + JSON.parse(localStorage.getItem('answers')).length);
}

new Ext.Application({
	launch: function() {
	car = makeSurveyCarousel(testSurvey); //global for debugging

	car.on("cardswitch", function(){
		if (this.getActiveIndex() + 1 == this.items.items.length) { //at the last one
//			console.log("last one");
//			Ext.getCmp('nextButton').hide();
//			Ext.getCmp('doneButton').show();
		}
		else {
//			console.log(this.getActiveIndex());
//			Ext.getCmp('nextButton').show();
//			Ext.getCmp('doneButton').hide();
		}
	});

	var nextButton = new Ext.Button({
		text: 'Next',
		ui: 'action',
		hidden: true,
		id: 'nextButton',
		handler: function(){ car.next();},
	}
	);

	var doneButton = new Ext.Button({
		text: 'Done',
		ui: 'confirm',
		hidden: true,
		id: 'doneButton',
		handler: function(){
		//TODO: add an overlay Y/Cancel "Are you sure you want to quit and save?"
		Ext.Msg.confirm("Save Answers?", "Are you sure you want to finish and save this survey?", function(response){
			if (response == "yes"){
				endTime = new Date();
				var pastAnswers = JSON.parse(localStorage.getItem('answers'));
				pastAnswers.push(getAnswers());
				setKey('answers', JSON.stringify(pastAnswers));
				console.log('saved it');
				var content = Ext.getCmp('content');
				content.remove(car,false);
				car.hide();
				content.add(buttons);
				buttons.show();
				Ext.getCmp('backButton').hide();
				nextButton.hide();
				Ext.getCmp('doneButton').hide();
				content.doLayout();
				currentSurvey = null;
				updateAnswerCount();
			}
		});
	}});

	buttons = new Ext.Panel({ //For the first panel.
		layout: {type: 'vbox', 
		pack: 'center',
	},
	defaults: {
		cls: 'demobtn'
	},
	id: 'buttons',
	items: [{
		xtype: 'button', //start survey Button
		margin: 10,
		text: 'Start ' + testSurvey.name,
		handler: function() {
			currentSurvey = getNewSurvey();
			car.removeAll();
			currentSurvey['questions'].map(makeQuestion).map(function(q){car.add(q);});
			var content = Ext.getCmp('content');
			content.remove(buttons,false);
			//mainPanel.setActiveItem('survey');
			buttons.hide();
			content.add(car);
			content.doLayout();
			car.show();
			Ext.getCmp('backButton').show();
			resetAnswers();
			nextButton.show();
			doneButton.show();
			startTime = new Date();
			car.update();
			car.setActiveItem(0);
		}
	}, 
	//{
//	xtype: 'button', //view Answers button
//	margin: 10,
//	text: 'View Answers',
//	handler: function(){
//	var content = Ext.getCmp('content');
//	content.remove(buttons,false);
//	buttons.hide();
//	content.add({
//	id: 'jsonanswers', 
//	html: '<p>Answers:</p><code style="width:100%;-webkit-user-select:text">' + localStorage.getItem('answers') + '</code>'});
//	content.doLayout();
//	Ext.getCmp('backButton').show();
//	}
//	},
	{
		xtype: 'button', //delete surveys button
		margin: 10,
		text: 'Delete Answers',
		handler: function() {
		Ext.Msg.confirm("Erase all Data?", "Are you sure you want to erase all the survey answers?", function(response){
			if (response == "yes"){
				setKey('answers',JSON.stringify([]));
				updateAnswerCount();
			};
		});}
	},{
		xtype: 'button',
		margin: 10,
		text: 'Upload Answers',
		handler: function(){
		Ext.Msg.prompt("Filename", "Give this upload a name:", function(resp, fname) {
			if (resp == "ok"){
				Ext.Ajax.request({
					url: '/data/',
					params: {
					filename: fname,
					file: localStorage.getItem('answers'),
					keys: JSON.stringify(surveyTemplate.questionIds)},
					timeout: 5000, //5 seconds
					success: function(){
						Ext.Msg.alert('Success', 'Data file "' + fname + '" has been uploaded.', Ext.emptyFn);	    							
					},
					failure: function(resp,opt){
						if (resp.status == 401) {
							Ext.Msg.alert('Error', 'You are logged out. Use your browser to log into <a href="http://carolinasurvey.appspot.com">carolinasurvey.appspot.com</a>', Ext.emptyFn);
						}
						else if (resp.status == 0) {
							Ext.Msg.alert('Error', 'Your Internet access is turned off.', Ext.emptyFn);
						} 
						else {
						   Ext.Msg.alert('Error', 'Unable to upload data. Error code: ' + resp.status, Ext.emptyFn);
						}
					}
				});
			};
		});
	}
	}
	]
	});

	var backButton = {
			text: 'Back',
			ui: 'back',
			id: 'backButton',
			xtype: 'button',
			hidden: true,
			handler: function() {
		if (currentSurvey) {
			Ext.Msg.confirm("Discard Survey?", 
					"All the answers you have entered will be lost if you quit now.",
					function(response){
				if (response == "yes"){
					var content = Ext.getCmp('content');
					content.removeAll(false);
					car.hide();
					if (Ext.getCmp('jsonanswers')) { Ext.getCmp('jsonanswers').hide();}
					content.add(buttons);
					buttons.show();
					Ext.getCmp('backButton').hide();
					Ext.getCmp('doneButton').hide();
					nextButton.hide();
					content.doLayout();
					currentSurvey = null;
				};
			});
		}
		else { //we are not doing a survey, so just go back to buttons
			var content = Ext.getCmp('content');
			content.removeAll(false);
			car.hide();
			if (Ext.getCmp('jsonanswers')) { Ext.getCmp('jsonanswers').hide();}
			content.add(buttons);
			buttons.show();
			Ext.getCmp('backButton').hide();
			nextButton.hide();
			content.doLayout();
			updateAnswerCount();
		}
	}
	}

//	Use Ext.getCmp('content').update(new panel);  to update the content (items) of the main panel.
//	flip back to this.button on quit.
	mainPanel = new Ext.Panel({
		fullscreen: true,
		layout: {
		type: 'card', //vbox
		align: 'strech'
	},
	id: 'content',
	defaults: {flex: 1},
	items: [buttons,car],
	dockedItems: [{
		dock: 'top',
		xtype: 'toolbar',
		title: 'Survey v.11',
		items: [backButton,
		        {xtype: 'spacer'},
		        {text: '', id: 'surveyCount'}]
	},{
		dock: 'bottom',
		xtype: 'toolbar',
		items: [doneButton, {xtype: 'spacer'}, nextButton ]}
	]

	});
	updateAnswerCount();
	}	
});



