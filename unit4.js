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
		question: 'Solve for x: "2x² + 18x + 36',
		answers: [
			{ text: 'x = 3 or 6', correct: false },
			{ text: 'x = 2 or 18', correct: false },
			{ text: 'x = -3 or -6', correct: true },
			{ text: 'x = 6 or 12', correct: false }
		]

	},
	{
		question: 'Wite "x² + 2x" in the form of (x + p)² = k',
		answers: [
			{ text: '(x + 1)² = 6', correct: true },
			{ text: '(2 + x)² = 1', correct: false },
			{ text: '(x + 1) = 6', correct: false },
			{ text: '(2x + x²)² = 4', correct: false }
		]

	},
	{
		question: 'Select the correct quadratic formula',
		answers: [
			{ text: '-b-√(b²-4ac))/(2a)', correct: false },
			{ text: '-b+√(b²-4ac))/(2a)', correct: false },
			{ text: 'b±(-b²-4ac))/(2a)', correct: false },
			{ text: '-b±√(b²-4ac))/(2a)', correct: true }
		]

	},
	{
		question: 'What if the discriminant is smaller than 0 (a < 0)?',
		answers: [
			{ text: 'The function has two real solutions', correct: false },
			{ text: 'The function has one real solution', correct: false },
			{ text: 'The function has no real solutions', correct: true },
			{ text: 'It is impossible', correct: false },
		]

	},
	{
		question: 'What is known as "i" when working with imaginary and complex numbers?',
		answers: [
			{ text: '√-1', correct: true },
			{ text: '√1', correct: false },
			{ text: '-1', correct: false },
			{ text: '1', correct: false }
		]

	}
]