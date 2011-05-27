/**
 * @author Jose M Vidal <jmvidal@gmail.com>
 * 
 * TODO: does not implement the switches:true
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
	var result ='<fieldset data-role="control-group">';
	for (var i=0; i < q.answers.length; i++){
		var name = 'answer' + i;
		result += '<input type="checkbox" name="'+ name +'" id="'+ name + '" value="' + i + '"/><label for="' + name + '">' + q.answers[i] + '</label>';
	}
	result += '</fieldset>';
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

	result += '</div></div><div data-role="footer" data-id="quitsave" data-position="fixed"><a href="#quitsurveydialog" data-role="button" class="ui-btn-left" data-icon="delete" data-rel="dialog">Quit</a><a href="#savesurveydialog" data-role="button" data-icon="check" data-rel="dialog">Save</a></div></div>';
	return result;
}

/** Returns a json object representing the answers to currentSurvey. This object is used only for uploading.*/
function getAnswers(){
	var result = {};
	var qids = getKey('questions');
	for (var i =0; i < qids.length; i++){
		var q = getKey(qids[i]);
		var resp = q.response;
		if (resp && q.answers) { //if radio or checkbox then add 1 to all choices, so it stars with 1 instead of 0.
			if (q.multiplechoice){ //checkbox, multiple answers
				resp = resp.map(function(x){return Number(x) + 1});
			} else {
				resp = Number(resp) + 1;
			};
		};
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

	$('#quitsurveybutton').live('click', function(e){
		eraseSurvey();
	});

	$('#deletebutton').live('click', function(e){
		setKey('answers',[]);
		$('#savedsurveys').html("0");
	});

	$('#savesurveybutton').live('click', function(e){
		setKey('endTime',new Date());
		var answers = getKey('answers');
		answers.push(getAnswers());
		setKey('answers', answers);
		eraseSurvey();
		$('#savedsurveys').html(answers.length);
	});
	
	$('#uploadbutton').live('click', function(e){ //upload
		var answers = getKey('answers');
		var fname = $('#filenameinput')[0].value;
		console.log(fname);
		$.ajax({
			url: '/data/',
			type: 'POST',
			data: {
				filename: fname,
				file: JSON.stringify(answers),
				keys: JSON.stringify(surveyTemplate.keys)
			},
			success: function (){

			},
			error: function (){
				console.log('ERROR uploading');
			}
		});
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

	// These two are needed to prevent dragging of the whole screen (with the finger) on the ios.
	$('a').live('touchstart', function(e){ //we assume touches are handled by an <a
//		e.stopPropagation();
	});
	$('body').live('touchstart', function(e){
//		e.preventDefault()
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



