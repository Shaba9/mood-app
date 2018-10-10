
var questions = [];

var xhr = new XMLHttpRequest();

xhr.onload = function () {
	questions = JSON.parse(xhr.responseText)["questions"];
	//console.log(emps);
};

xhr.open('GET', 'Questions.json', false);
xhr.send(null);

console.log(questions);

var emoSource = {
	"Alarmed": "Emojis/Alarmed.png",
	"Angry": "Emojis/Angry.png",
	"Annoyed": "Emojis/Annoyed.png",
	"Confused": "Emojis/Confused.png",
	"Dead": "Emojis/Dead.png",
	"Happy": "Emojis/Happy.png",
	"Humorous": "Emojis/Humorous.png",
	"Hungry": "Emojis/Hungry.png",
	"Mysterious": "Emojis/Mysterious.png",
	"Nerdy": "Emojis/Nerdy.png",
	"Playful": "Emojis/Playful.png",
	"Sad": "Emojis/Sad.png",
	"Skeptical": "Emojis/Skeptical.png",
	"Sleepy": "Emojis/Sleepy.png"
};

var emoLog = {
	"Alarmed": 0,
	"Angry": 0,
	"Annoyed": 0,
	"Confused": 0,
	"Dead": 0,
	"Happy": 0,
	"Humorous": 0,
	"Hungry": 0,
	"Mysterious": 0,
	"Nerdy": 0,
	"Playful": 0,
	"Sad": 0,
	"Skeptical": 0,
	"Sleepy": 0
};
var i = 0;
var btn = document.getElementsByTagName("button")[1];
var back;
var answerLog = [];
var clickCount = 0;
const body = document.getElementsByTagName("body")[0];

function changeButton(element, newId, text) {
	element.id = newId;
	element.textContent = text;
	if (document.querySelector('.selected') == null) {
		element.disabled = true;
	};
	return element;
};

function revealO(i) {
	var options = "<ul id = 'ops'>";
	btn.disabled = true;
	document.getElementById("question").innerHTML = questions[i].Q;
	for (var j = 0; j < questions[i].Ops.length; j++) {
		if (i < answerLog.length && answerLog[i] == j) {
			options += "<li class='selected' onClick=sel(" + j + ")>" + questions[i].Ops[j].text + "</li>";
			btn.disabled = false;
		} else {
			options += "<li onClick=sel(" + j + ")>" + questions[i].Ops[j].text + "</li>";
		};
	};
	options += "</ul>";
	document.getElementById("answer").innerHTML = options;
};

function revealQ(i) {
	if (i > 0) {
		back.disabled = false;
		revealO(i);
	} else if (i == 0) {
		back.disabled = true;
		revealO(i);
	} else {
		back.disabled = true;
	};
};

function sel(k) {
	var selected = document.querySelector(".selected");
	if (selected !== null) {
		selected.classList.remove("selected");
	};
	btn.disabled = false;
	ops.className = 'answered';
	document.querySelectorAll("#ops li")[k].className = "selected";
	answerLog[i] = k;
	console.log(answerLog);
};

function maxPlace(arr) {
	var maxP = 0;
	for (var r = 0; r < arr.length; r++) {
		if (arr[r + 1] >= arr[maxP]) {
			maxP = r + 1;
		};
	};
	return maxP;
};

function Reset() {
	var keys = Object.keys(emoLog);
	for (var l = 0; l < keys.length; l++) {
		emoLog[keys[l]] = 0;
	};
};

function Menu() {
	clickCount++;
	if (clickCount == 1) {
		document.getElementById("sideNav").style.display = "block";
	} else {
		document.getElementById("sideNav").style.display = "none";
		clickCount = 0;
	};
}

body.onclick = function () {
	if (clickCount == 1) {
		clickCount++;
	} else {
		clickCount = 2;
		Menu();
	}
}

btn.onclick = function () {
	if (btn.id == "start") {
		back = document.createElement("button");
		back.textContent = "<-- Back";
		back.id = "back";
		goBack();
		document.getElementById("QA").insertBefore(back, btn);
		btn = changeButton(btn, "next", "Next Question -->");
		revealQ(i);
	} else if (btn.id == "next") {
		i += 1;
		if (i < questions.length) {
			revealQ(i);
			if (i == (questions.length - 1)) {
				btn = changeButton(btn, "revealMood", "Reveal My Mood...");
			};
		};
	} else if (btn.id == "revealMood") {
		var emoji;
		var message1 = "<h2>Your Mood:</h2>";
		var message2;
		var ans;
		var emoKey;
		var mood;
		for (var q = 0; q < answerLog.length; q++) {
			ans = questions[q].Ops[answerLog[q]];
			emoKey = Object.keys(ans);
			for (var r = 1; r < emoKey.length; r++) {
				emoLog[emoKey[r]] += ans[emoKey[r]];
			};
		};
		i += 1;
		btn.disabled = true;
		console.log(emoLog);
		mood = Object.keys(emoLog)[maxPlace(Object.values(emoLog))];
		emoji = "<img id = 'emoji' src =" + emoSource[mood] + ">";
		message2 = "<p>You are currently " + mood + "!</p>";
		document.getElementById("question").innerHTML = message1;
		document.getElementById("answer").innerHTML = emoji + message2;
	};
};

function goBack() {
	back.onclick = function () {
		i -= 1;
		if (btn.id != "next" && i < questions.length - 1) {
			btn = changeButton(btn, "next", "Next Question -->");
		};
		btn.disabled = false;
		revealQ(i);
		Reset();
	};
};

// Fix mobil for Contact page.
// Create a "start over" button on final page.
// Access data externally from json file.
// Remove borders.