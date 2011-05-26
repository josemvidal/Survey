var SEQUENTIAL = 0;  //constants
var ONE_OF = 1;
var RANDOM_ORDER = 2;


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


function setKey(key, val) { 
	localStorage.removeItem(key); // We need this function because otherwise we get 'quota exceeded error' on ipad: http://stackoverflow.com/questions/2603682 
	localStorage.setItem(key, JSON.stringify(val));
};

function getKey(key){
	return JSON.parse(localStorage.getItem(key));
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
		return t.id;
	}
	var start = 1;
	var type = t[0];
	if (type == ONE_OF) {
		start = 2;
	}
	for (var i =start; i < t.length; i++){
		result = result.concat(getAllQuestionIds(t[i]));
	};
	return result;
}

surveyTemplate.keys = {}
surveyTemplate.keys = getAllQuestionIds(surveyTemplate.questions);
//localStorage.questions = array of IDs of all questions in current survey
//localStorage.id = {JSON object of the question}

if (! getKey('answers')) {setKey('answers',[]);}

function makeRadioQuestion(q,prev,next){
	var result = '';
	for (var i=0; i < q.answers.length; i++){
//		var checked = (q.response == i) ? 'checked="checked"' : '';
		result += '<input type="radio" name="answer" id="answer' + i + '" value="' + i + '"/><label for="answer' + i + '">' + q.answers[i] + '</label>';
	}
	return result;
}


function makeCheckboxQuestion(q,prev,next){
	var result ='';
	for (var i=0; i < q.answers.length; i++){
		result += '<input type="checkbox" name="answer" id="answer' + i + '" value="' + i + '"/><label for="answer' + i + '">' + q.answers[i] + '</label>';
	}
	return result;
}

function makeSliderQuestion(q,prev,next){
	var val = (q.response) ? q.response : q.value;
	return '<label for="slider"></label><input type="range" name="answer" id="slider" value="' + val + '" min="'+ q.minValue +'" max="'+q.maxValue+'"  />';
}

function makeTextQuestion(q,prev,next){
	return '<label for="textarea"></label><textarea cols="40" rows="8" name="answer" id="textarea" value=""></textarea>';
}

/**
 * Return the HTML for the question represented by q
 * @param prev the id of the previous question, or null
 * @param next the id of the next question, or null
 */
function makeQuestion(q,prev,next){
	var prevHTML = (prev) ? '<a href="#' + prev + '" class="ui-btn-left" data-direction="reverse" data-icon="arrow-l">Prev</a>' : '';
	var nextHtml = (next) ? '<a href="#' + next + '" class="ui-btn-right" data-icon="arrow-r">Next</a>' : '';

	var result = '<div class="question" data-role="page" id="' + q.id + '" data-url="' + q.id + '" data-add-back-btn="false"><div data-role="header">'+ prevHTML +'<h1>'+ q.id + '</h1>' + nextHtml + '</div><div data-role="content"><div data-role="fieldcontain"><legend>' + 	q.text + '</legend>';

	if (q.answers) { //multiple choice
		if (q.multiplechoice) { //checkbox, multiple answers
			result += makeCheckboxQuestion(q,prev,next);
		}
		else { //radiofield, one answer
			result += makeRadioQuestion(q,prev,next);
		}
	}
	else if (q.value) {//its a slider
		result += makeSliderQuestion(q,prev,next);
	}
	else { //its a text question
		result += makeTextQuestion(q,prev,next);
	};

	result += '</div></div><div data-role="footer" data-id="quitsave" class="ui-bar" data-position="inline"><a href="#homepage" data-role="button" class="ui-btn-left" data-icon="delete" id="quitbutton" data-transition="flip">Quit</a><a href="#homepage" data-role="button" id="savebutton" data-icon="check" data-transition="flip">Save</a></div></div>';
	return result;
}

/** Returns a json object representing the answers to currentSurvey.*/
function getAnswers(){
	var result = {};
	var qids = getKey('questions');
	for (var i =0; i < qids.length; i++){
		var resp = getKey(qids[i]).response;
		result[qids[i]] = resp instanceof Array ? resp.toString() : resp;
	};
	return {
		protocolId: surveyTemplate.id,
		surveyName: surveyTemplate.name,
		start: getKey('startTime'),
		end: getKey('endTime'),
		answers: result
	};
}

function eraseSurvey(){
	var qids = surveyTemplate.keys;
	for (var i =0; i < qids.length; i++){
		localStorage.removeItem(qids[i]);
	};
	localStorage.removeItem('questions');
	localStorage.removeItem('startTime');
	localStorage.removeItem('endTime');
	localStorage.removeItem('currentPage');
}

/**
 * Takes the questions from localStorage, creates HTML for each one and adds them to the page.
 */
function createHTMLQuestions(){
	var questionID = getKey('questions'); //all the question IDs
	var prev = null;
	var next = null;
	result = [];
	var q;
	var qid;
	for (var i=0; i<questionID.length; i++){
		qid = questionID[i];
		next = (i + 1 == questionID.length) ? null : questionID[i+1];
		q = getKey(qid);
		$.mobile.pageContainer.append(makeQuestion(q,prev,next));
		prev = qid;
	};
}


/**
 * Creates a survey from surveyTemplate and stores all the questions as
 * JSON objects in localStorage.
 */
function createNewSurvey(){
	var questions = flattenTemplateQuestions(surveyTemplate.questions);
	setKey('questions', questions.map(function(q){return q.id;}));
	var q;
	var prev = null;
	var next = null;
	for (var i =0; i< questions.length; i++){
		q = questions[i]; //TODO: does it matter that we are changing surveyTemplate?
		q.prev = prev;
		next = (i + 1 == questions.length) ? null : questions[i+1].id;
		q.next = next;
		q.response = null;
		setKey(q.id, q);
		prev = q.id;
	}
}


$(document).ready(function(){
	$('#startsurveybutton').click(function(){
		$('.question').remove();
		createNewSurvey();
		createHTMLQuestions();
		setKey('startTime',new Date());
		return true;
	});

	$('#quitbutton').live('click', function(e){
		eraseSurvey();
	});

	$('#deletebutton').live('click', function(e){
		setKey('answers',[]);
		$('#savedsurveys').html("0");
	});

	$('#savebutton').live('click', function(e){
		setKey('endTime',new Date());
		var answers = getKey('answers');
		answers.push(getAnswers());
		setKey('answers', answers);
		eraseSurvey();
		$('#savedsurveys').html(answers.length);
	});

	$('.question').live('change', function(e){
		var qid = this.id;
		var question = getKey(qid);
		if (e.target.type == 'radio' || e.target.type == 'textarea' || e.target.type == 'number') {
			question.response = e.target.value;}
		else if (e.target.type == 'checkbox'){
			if (! question.response) {
				question.response = [];
			}
			if (e.target.checked && ( ! question.response.contains(e.target.value))){
				question.response.push(Number(e.target.value));};
				if ((! e.target.checked) && question.response.contains(e.target.value)){
					question.response = question.response.minus(Number(e.target.value));};
					question.response.sort();
		}
		setKey(qid,question);
	});

	$('.question').live('pageshow', function (e, ui){
		setKey('currentPage', e.target.id);
		//set the checked choices
		var question = getKey(e.target.id);
		var response = question.response;
		if (response instanceof Array){//checkbox
			for (var i=0; i < question.answers.length; i++){
				if (response.contains(i)) {
					$('#' + e.target.id + ' #answer' + i).attr('checked',true).checkboxradio('refresh');}
			}
		} else if (question.answers){ //radio
			$('#' + e.target.id + ' #answer' + getKey(e.target.id).response).attr('checked',true).checkboxradio('refresh');
		} else if (question.value){
			//Im doing this one on makesliderquestion
		}
		else { //textbox
			$('#' + e.target.id + ' textarea').attr('value', response);
		}
	});

	if (getKey('questions')) { //there is a survey already there, load it.
		createHTMLQuestions();
		console.log('reloaded questions');
		location.href = location.href + '#' + getKey('currentPage');
//		$.mobile.changePage($('#' + getKey('currentPage')));
	}
	var answers = getKey('answers');
	if (answers) {
		$('#savedsurveys').html(answers.length);};
});
