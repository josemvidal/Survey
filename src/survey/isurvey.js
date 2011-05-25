/** When there is an updateready we swap it in and reload the page. This causes
the app to 'flash' after we start it.
This does not work on chrome, which does not fire these events. chrome://appcache-internals/

webappCache.status = 
Status 0 (UNCACHED) is returned which means that there is no cache available
Status 1 (IDLE) is returned means the cache you have is currently the most up-to-date
Status 2 (CHECKING) is returned means there is a change in your manifest file and it is checking it for changes
Status 3 (DOWNLOADING) is returned means changes have been found and they are being added to your cache
Status 4 (UPDATEREADY) is returned means your new cache is ready to be updated and override your current cache
Status 5 (OBSOLETE) is returned means your cache is no longer valid meaning it has been removed

TODO: save state in localStorage so current survey can be re-loaded if user hits home button 

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

Array.prototype.minus = function(e){
	return this.filter(function(x){
		return ! (x == e);
	});
}

Array.prototype.shuffle = function() {
	var s = [];
	while (this.length) {s.push(this.splice(Math.random() * this.length, 1)[0])};
	while (s.length) this.push(s.pop());
	return this;
}

/**
 * returns all subsets of size 'min' or more of the array
 */
Array.prototype.combine = function(min) {
    var fn = function(n, src, got, all) {
        if (n == 0) {
            if (got.length > 0) {
                all[all.length] = got;
            }
            return;
        }
        for (var j = 0; j < src.length; j++) {
            fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
        }
        return;
    }
    var all = [];
    for (var i = min; i < this.length ; i++) {
        fn(i, this, [], all);
    }
    all.push(this);
    return all;
}

Array.prototype.toID = function(){
	result = "";
	for (var i=0; i < this.length; i++){
		result += this[i];
	}
	return result;
}

Array.prototype.contains = function (x){
	for (var i=0;i<this.length;i++){
		if (x == this[i]) {return true;}};
	return false;
}

Array.prototype.equals = function (a){
	if (this.length != a.length) {return false;}
	for (var i = 0; i < a.length; i++){
		if (this[i] != a[i]) {return false;}}
	return true;
}

q =  {
		id: "ordering",
		text: "Of these, which one is your favorite?",
		answers: ["Kirby", "Mario", "Luigi", "Bowser"]
	   };


/**
 * Given a question t with t.switches == true return a [SEQUENTIAL ...] which expands it into a series of questions
 * which result in the user rank-ordering the choices in t.answers.
 * @param t a question from the template
 * @return [SEQUENTIAL ...] expansion
 */
function expandQuestion(t){
	var choices = [];
	var switches = [];
	var result = [];
	for (var i=0; i<t.answers.length;i++){
		choices.push(i);};
	var allchoices = choices.combine(2);
	var choice;
	var nextChoices;
	var nextChoicesToShow;
	var nextChoicesToHide;
	for (var i=0; i< allchoices.length; i++){
		switches = [];
		if (allchoices[i].length > 2){ // we need to add switches
			for (var c=0; c < allchoices[i].length;c++){
				choice = allchoices[i][c];
				nextChoices = allchoices.filter(function(x){return x.length == allchoices[i].length - 1});
				nextChoicesToShow = nextChoices.filter(function (l){return (l.equals(allchoices[i].minus(choice)))});
				nextChoicesToHide = nextChoices.filter(function (l){return (! l.equals(allchoices[i].minus(choice)))});
				switches.push({
					show: nextChoicesToShow.map(function(x){return t.id + x.toID();}),
					hide: nextChoicesToHide.map(function(x){return t.id + x.toID();})
				});}};
		var newq = {
				id: t.id + allchoices[i].toID(),
				text: t.text,
				answers: allchoices[i].map(function(idx){return t.answers[idx]}),
		};
		if (switches.length > 0) {newq.switches = switches;};
		if (newq.answers.length < t.answers.length) { //all but the first question should be hidden at first
			newq.starthidden = true;
		};
		result.unshift(newq);
	}
	result.unshift(SEQUENTIAL);
	return result;
}

/**
 * Expands all the macro questions (switches = true) in t
 * @param t
 * @return
 */
function expandAllQuestions(t){
	var result = [];
	if (!(t instanceof Array)) {
		if (t.switches && (t.switches == true)){
			return expandQuestion(t);
		}
		return t;
	}
	for (var i =0; i < t.length; i++){
		result.push(expandAllQuestions(t[i]));
	};
	return result;
}


/**
 * 
 * @param t
 * @return a list of all the question IDs, in order 
 */
function getAllQuestionIds(t){
	var result = [];
    var chosenQuestionList;
	if (!(t instanceof Array)) {
		if (surveyTemplate.keys[t.id]){
			console.log("ERROR: surveyTemplate has repeated question id=" + t.id);
		}
		if (t.id == 'answers' || t.id == 'currentSurvey' || t.id == 'length' || t.id == 'activeIndex') {
			console.log('ERROR: surveyTemplate has illegal id name = ' + t.id);
		}
		surveyTemplate.keys[t.id] = t;
		surveyTemplate.forms[t.id] = makeQuestion(t);
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

/**
 * Expand the surveyTemplate and get all the questionIDs and set the .forms[id] to point to each form.
 */
surveyTemplate.questions = expandAllQuestions(surveyTemplate.questions); //expand switches=true questions
surveyTemplate.keys = {}
surveyTemplate.forms = {}
surveyTemplate.questionIds = getAllQuestionIds(surveyTemplate.questions.clone());


/** Returns a survey: an array of questions.
 * @param t is an array of questions
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

/**
 * 
 * @param theID
 * @return the ID of the question with theID in the carousel. null if not there.
 */
function getQuestionIndex(theID){
	for (var i=0; i< car.items.items.length;i++){
		if (car.items.items[i].id == theID){
			return i;
		}
	}
	return null;
}

/** Points to the survey we are currently administering. */
/** var currentSurvey = null; */
/** Start time of currentSurvey */
/** var startTime = null;
var endTime = null; */ 

/** We need this function because otherwise we get 'quota exceeded error' on ipad: http://stackoverflow.com/questions/2603682 */
function setKey(key, val) { 
  localStorage.removeItem(key);
  localStorage.setItem(key, val); 
};

/** array of all the answers we have gotten. */
if (!localStorage.getItem('answers')) {
    setKey('answers',JSON.stringify([]));}

if (!localStorage.getItem('currentSurvey')) {
    setKey('currentSurvey',JSON.stringify(null)); }

function currentSurvey(){
	return JSON.parse(localStorage.getItem('currentSurvey'));
}

function resetCurrentSurvey(){
	var questions = currentSurvey().questions;
	for (var i=0; i < questions.length; i++){
		localStorage.removeItem(questions[i].id); 
	}
	localStorage.removeItem('activeIndex'); 
	setKey('currentSurvey',JSON.stringify(null)); 
}

function setCurrentSurvey(newSurvey){
	setKey('currentSurvey',JSON.stringify(newSurvey));
}

function setStartTime(){
	var cs = currentSurvey();
	cs.startTime = new Date();
	setCurrentSurvey(cs);
}

function setEndTime(){
	var cs = currentSurvey();
	cs.endTime = new Date();
	setCurrentSurvey(cs);
}

/**
 * My own load mask which is just a gray screen. Part of an ugly hack to get the whole selection to 
 * change color when a user clicks on a checkbox.
 */
myLoadMask = Ext.extend(Ext.LoadMask, {
	onBeforeLoad : function() {
    if (!this.disabled) {
        this.el.mask('<div class="x-loading-msg">' + this.msg + '</div>', this.msgCls, false);
        this.fireEvent('show', this, this.el, this.store);
    }},
});

/**
 * Makes handler function for the 'switches' questions. Sets up the needed event handlers.
 * @param switches
 * @return
 */
function makeHandleChoiceCheck(switches){
	return function(){
//		console.log(switches);
		var card;
		for (var i=0; i < switches.show.length;i++){
//			console.log(switches.show[i]);
//			card = Ext.getCmp(switches.show[i]);
			card = surveyTemplate.forms[switches.show[i]];
//			console.log(card);
			delete card.removed;
			var question = surveyTemplate.keys[card.id];
			if (question.insertafter){
				var position = getQuestionIndex(question.insertafter);
				if (position) {
					car.insert(position + 1,card);}
				else {
					console.log('ERROR: inserafter=' + question.insertafter + ' not found.');
					car.insert(car.getActiveIndex() + 1,card);}
			}
			else { //if no insertafter, then insert after this card.
				car.insert(car.getActiveIndex() + 1,card);
			}
		}
		for (var i=0; i < switches.hide.length;i++){
//			console.log('removing ' + switches.hide[i]);
			card = car.getComponent(switches.hide[i]);
//			card = Ext.getCmp(switches.hide[i]);
//			card = surveyTemplate.forms[switches.hide[i]];
			if (card && ! card.removed){
				car.remove(card, false);
				card.removed = true;
			}
		}
		car.update();
	}
}

/**
 * Get the saved form for question q
 * @param q
 * @return
 */
function getQuestionForm(q){
	var comp = Ext.getCmp(q.id);
	if (comp) {
		comp.reset();};
    if (!(surveyTemplate.forms[q.id])) {
    	console.log("ERROR: -" + q.id + "- is undefined question id");
    };
	return surveyTemplate.forms[q.id];
}

function saveCurrentQuestionState(){
	var item = car.getActiveItem();
	var values = item.getValues();
//	console.log('saving ' + item.id + " = " + JSON.stringify(values));
	setKey(item.id, JSON.stringify(values));
}

function restoreAllQuestionStates(){
	var questions = currentSurvey().questions;
	var values;
	for (var i=0; i < questions.length; i++){
		values = localStorage.getItem(questions[i].id); 
		if (values) {
			Ext.getCmp(questions[i].id).setValues(JSON.parse(values));
		}
	}
	car.setActiveItem(Number(localStorage.getItem('activeIndex')));
}


var o;
function makeQuestion(q){
	var answerItems = [];
	var xtype = (q.multiplechoice) ? 'checkboxfield' : 'radiofield'; 
	var baseName = 'answer';
	var name = baseName;
	if (q.answers) {
		for (var i = 0; i < q.answers.length; i++){
			if (q.switches){ //multiple questions
				answerItems.push({ 
					name: 'answer', labelWidth: '70%', label: q.answers[i], value: String(i),
					listeners: {
						check: makeHandleChoiceCheck(q.switches[i])
					}});
			}
			else {
				answerItems.push({ 
					name: name, labelWidth: '70%', xtype: xtype, label: q.answers[i], value: String(i)});
			}
		};
//		answerItems.push({name: "answer", labelWidth: '70%', componentCls: "noanswer", label: "No Answer", value: String(i)});
	}
	else if (q.value){ //its a slider
		var startValue = q.value;
		//need to do this cse of sencha bug: slider know is not set on setValues().
		if (localStorage.getItem(q["id"])) { startValue = localStorage.getItem(q["id"]);};  
		answerItems = [ new Ext.form.Slider({
			name: "answer",
			labelWidth: '20%',			
			label: startValue,
			value: startValue,
			minValue: q.minValue,
			maxValue: q.maxValue,
			listeners: {
			change: function(slider, thum, newValue, oldValue){
				if (! (creatingSurvey)) {saveCurrentQuestionState();};
		    	this.labelEl.update('<b>' + newValue + '</b>');},
		    drag: function(slider, thum, newValue, oldValue){
			    this.labelEl.update('<b>' + newValue + '</b>');
		    }
			}
		})];
	}
	else // its a text question
		answerItems = [ new Ext.form.TextArea({
			name: 'answer',
			listeners: {blur: function(e,t){
				if (!( creatingSurvey)) {saveCurrentQuestionState();};
			}}})];
	return {
		xtype: 'form',
		scroll: 'vertical',
		id: q["id"],
		listeners: {			
			check: function(e,t) {
		    	if (!(creatingSurvey)) {saveCurrentQuestionState();};
		    	//now color the background of the selection, ugly hack.
				var children = this.items.items[0].items.items 
				if (children[0].xtype == 'radiofield') {
					for (var i=0;i<children.length;i++){
						Ext.destroy(children[i].loadMask);
						children[i].loadMask = null;
					}
					e.loadMask = e.loadMask || new myLoadMask(e.el, Ext.applyIf({msgCls: 'selected', msg: ''}));
					e.loadMask.show();
				}
			},
			uncheck: function() { this.setLoading(false);
			 },},
		items: [{
			xtype: 'fieldset',
			defaults: {margin: 20, xtype: 'radiofield', bubbleEvents: ['check']},
			title: q["text"],
			items: answerItems
	}]};
}

function makeSurveyCarousel(){
    return new Ext.Carousel({
	id: 'survey',
	indicator: false,
	listeners: {
    	cardswitch: function(){
    	setKey('activeIndex', this.getActiveIndex());
		if (this.getActiveIndex() + 1 == this.items.items.length) { //at the last one
			Ext.getCmp('nextButton').hide();
		}
		else {
			Ext.getCmp('nextButton').show();
		}
    }}
	});
}
/**
function resetQuestions(carous){
	carous.removeAll();
	currentSurvey['questions'].map(makeQuestion).map(function(q){carous.add(q);});
}
*/
/** Returns a json object representing the answers to currentSurvey.
*/
function getAnswers(){
    var result = {};
    var csurvey = currentSurvey();
    for (var i =0; i < csurvey.questions.length; i++){
    	var id = csurvey.questions[i].id;
    	var comp = Ext.getCmp(id);
    	var ans;
    	if (comp) {
    		ans = comp.getValues().answer;
    		if (ans instanceof Array) {
    			ans = ans.map(function(x){return Number(x) + 1});
    		}
    		else if (csurvey.questions[i].answers){ //it is a checkbox question
    			ans = 1 + Number(ans);
    		}
    	}
    	else {
    		ans = 'N/A';};
    	result[id] = ans instanceof Array ? ans.toString() : ans;
    };
    return {
    	protocolId: csurvey.id,
    	surveyName: csurvey.name,
    	start: csurvey.startTime,
    	end: csurvey.endTime,
    	answers: result
    };
}

/** No longer used, but might come in handy later.
 * 
function resetAnswers(){
    for (var i =0; i < currentSurvey.questions.length; i++){
    	var id = currentSurvey.questions[i].id;
    	var comp = Ext.getCmp(id);
    	if (comp) {	Ext.getCmp(id).reset(); };
    }
}
*/

function updateAnswerCount(){
    Ext.getCmp('surveyCount').setText('' + JSON.parse(localStorage.getItem('answers')).length);
}
var creatingSurvey = false; //used to ignore all the events that fire while creating a survey.
var car; //the carousel

var lastTime = 0;
function timeit(){
	var d = new Date();
	var diff = d.getTime() - lastTime;
	lastTime = lastTime + diff;
	return diff;
}

new Ext.Application({
	launch: function() {
	car = makeSurveyCarousel(); //global for debugging

	var nextButton = new Ext.Button({
		text: 'Next',
		ui: 'action',
		hidden: true,
		id: 'nextButton',
		handler: function(){ car.next();},
	});
	
    var loadSurvey = function(news) {
//    	console.log('loadSurvey-' + timeit());
		setCurrentSurvey(news);
//		console.log('loadSurvey:a=' + timeit());
		news['questions'].filter(function(q){return ! q.starthidden}).map(getQuestionForm).map(function(q){car.add(q);});
//		console.log('loadSurvey:b=' + timeit());
		var content = Ext.getCmp('content');
		buttons.hide();
//		console.log('loadSurvey:b1=' + timeit());
		car.show();  //this is the one that is SLOW....
//		console.log('loadSurvey:b2=' + timeit());		
		car.doLayout();
//		console.log('loadSurvey:c=' + timeit());
		Ext.getCmp('backButton').show();
		nextButton.show();
		doneButton.show();
//		console.log('loadSurvey:d=' + timeit());		
	};

	var createSurvey = function() {
		creatingSurvey = true; //global variable
		news = getNewSurvey();
		loadSurvey(news);
		localStorage.setItem('activeIndex',0);
		creatingSurvey = false;
		setStartTime();
	}
	
	var doneButton = new Ext.Button({
		text: 'Done',
		ui: 'confirm',
		hidden: true,
		id: 'doneButton',
		handler: function(){
		Ext.Msg.confirm("Save Answers?", "Are you sure you want to finish and save this survey?", function(response){
			if (response == "yes"){
				setEndTime();
				var pastAnswers = JSON.parse(localStorage.getItem('answers'));
				pastAnswers.push(getAnswers());
				setKey('answers', JSON.stringify(pastAnswers));
				var content = Ext.getCmp('content');
				if (car.getActiveIndex() == 0) {car.setActiveItem(1);} //ugly hack to get around sencha bug.
				car.removeAll(false);
				car.hide();
				buttons.show();
				Ext.getCmp('backButton').hide();
				nextButton.hide();
				Ext.getCmp('doneButton').hide();
				resetCurrentSurvey();
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
		text: 'Start Survey',
		handler: createSurvey
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
	{	xtype: 'button',
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
							Ext.Msg.alert('Error', 
'You are logged out. Use your browser to log into <a href="http://carolinasurvey.appspot.com">carolinasurvey.appspot.com</a>', Ext.emptyFn);
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
		});}
	},
	{
		xtype: 'button', //delete surveys button
		margin: 50,
		text: 'Delete Answers',
		handler: function() {
		Ext.Msg.confirm("Erase all Data?", "Are you sure you want to erase all the survey answers?", function(response){
			if (response == "yes"){
				setKey('answers',JSON.stringify([]));
				updateAnswerCount();
			};
		});}
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
		if (currentSurvey()) {
			Ext.Msg.confirm("Discard Survey?", 
					"All the answers you have entered will be lost if you quit now.",
					function(response){
				if (response == "yes"){
					var content = Ext.getCmp('content');
					if (car.getActiveIndex() == 0) {car.setActiveItem(1);} //ugly hack to get around sencha bug.
					car.removeAll(false);
					car.hide();
					if (Ext.getCmp('jsonanswers')) { Ext.getCmp('jsonanswers').hide();}
					buttons.show();
					Ext.getCmp('backButton').hide();
					Ext.getCmp('doneButton').hide();
					nextButton.hide();
					resetCurrentSurvey();
				};
			});
		}
		else { //we are not doing a survey, so just go back to buttons
			var content = Ext.getCmp('content');
			content.removeAll(false);
			car.hide();
			if (Ext.getCmp('jsonanswers')) { Ext.getCmp('jsonanswers').hide();}
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
		title: 'Survey v.35',
		items: [backButton,
		        {xtype: 'spacer'},
		        {text: '', id: 'surveyCount'}]
	},{
		dock: 'bottom',
		xtype: 'toolbar',
		items: [doneButton, {xtype: 'spacer'}, nextButton ]}
	]

	});
	var currents = currentSurvey();
	if (currents){ //if there is one in localStorage, load it.
	  creatingSurvey = true;
	  loadSurvey(currents);
	  creatingSurvey = false;
	  restoreAllQuestionStates();
	  } 
	updateAnswerCount();
	}	
});



