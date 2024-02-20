const timeDisplay = document.querySelector("#timeDisplay");
const startBtn = document.querySelector("#startBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const restartBtn = document.querySelector("#restartBtn");

let startTime = 0;
let elapsedTime = 0;
let currentTime = 0;
let paused = true;
let intervalId;
let mins = 0;
let secs = 0;

startBtn.addEventListener('click', () => {
	if (paused){
		paused = false;
		startTime = Date.now() - elapsedTime;
		intervalId = setInterval(updateTime, 1000);
	}
})
pauseBtn.addEventListener("click", () => {
	if (!paused){
		paused = true;
		elapsedTime = Date.now() - startTime;
		clearInterval(intervalId);
	}
});
restartBtn.addEventListener("click", () => {
	paused = true;
	clearInterval(intervalId);
	startTime = 0;
	elapsedTime = 0;
	currentTime = 0;
	mins = 0;
	secs = 0;
	timeDisplay.textContent = "00:00";
});

function updateTime(){
	elapsedTime = Date.now() - startTime;

	secs = Math.floor((elapsedTime / 1000) % 60);
	mins = Math.floor((elapsedTime / (1000 * 60)) % 60);
	

	secs = pad(secs);
	mins = pad(mins);

	timeDisplay.textContent = `${mins}:${secs}`;

	function pad(unit){
		return(("0") + unit).length > 2 ? unit : "0" + unit;
	}

}

const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')

const questionContainerElement = document.getElementById('question-container')

const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
	currentQuestionIndex++
	setNextQuestion()

})

function startGame() {
	startButton.classList.add('hide')
	shuffledQuestions = questions.sort(() => Math.random() - .5)
	currentQuestionIndex = 0
	questionContainerElement.classList.remove('hide')
	setNextQuestion()
}

function setNextQuestion() {
	resetState()
	showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question){
	questionElement.innerText = question.question 
	question.answers.forEach(answer => {
		const button = document.createElement('button')
		button.innerText = answer.text
		button.classList.add('btn')
		if (answer.correct) {
			button.dataset.correct = answer.correct
		}

		button.addEventListener('click', selectAnswer)
		answerButtonsElement.appendChild(button)
	})

}

function resetState(){
	nextButton.classList.add('hide')
	while (answerButtonsElement.firstChild) {
		answerButtonsElement.removeChild(answerButtonsElement.firstChild)
	}
}

function selectAnswer(e) {
	const selectedButton = e.target
	const correct = selectedButton.dataset.correct
	setStatusClass(document.body, correct)
	Array.from(answerButtonsElement.children).forEach(button => {
		setStatusClass(button, button.dataset.correct)
	})
	if (shuffledQuestions.length > currentQuestionIndex + 1) {
		nextButton.classList.remove('hide')
	}	else {
		startButton.innerText = 'Restart'
		startButton.classList.remove('hide')
	}
}


function setStatusClass(element, correct) {
	clearStatusClass(element)
	if (correct) {
		element.classList.add('correct')
	} else {
		element.classList.add('wrong')
	}
}

function clearStatusClass(element) {
	element.classList.remove('correct')
	element.classList.remove('wrong')

}

const questions = [
	{
		question: 'Solve for x: "4/9 = 1/x"',
		answers: [
			{ text: 'x = 1/4', correct: false },
			{ text: 'x = -9/4', correct: false },
			{ text: 'x = 9/4', correct: true },
			{ text: 'x = 9/1', correct: false }
		]

	},
	{
		question: 'Find the coordinates of the midpoint of the line segment joining "(8, 1)" and "(2, 5)"',
		answers: [
			{ text: '(5, 3)', correct: true },
			{ text: '(3, 5)', correct: false },
			{ text: '(4, 0.2)', correct: false },
			{ text: '(16, 5)', correct: false }
		]

	},
	{
		question: 'Find the gradient of the line segment joining "(5, 5)" and "(-1, 5)"',
		answers: [
			{ text: '-5', correct: false },
			{ text: '3', correct: false },
			{ text: '10', correct: false },
			{ text: '0', correct: true }
		]

	},
	{
		question: 'Select the correct gradient formula',
		answers: [
			{ text: '(y2 - y1) / (x2 - x1)', correct: true },
			{ text: '(x2 - x1) / (y2 + y1)', correct: false },
			{ text: '(y step) / (x step)', correct: true },
			{ text: '(x step) / (y step)', correct: false },
		]

	},
	{
		question: 'Select the correct "gradient intercept form"',
		answers: [
			{ text: 'y = mx + b', correct: true },
			{ text: 'x = my + b', correct: false },
			{ text: 'b = mx + y', correct: false },
			{ text: 'm = xy + b', correct: false }
		]

	}
]
