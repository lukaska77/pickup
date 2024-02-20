
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
		question: 'Clem fired 200 arrows at a target and hit the target 168 times. Estimate the probability that Clem will hit the target with his next shot.',
		answers: [
			{ text: '92%', correct: false },
			{ text: '55%', correct: false },
			{ text: '84%', correct: true },
			{ text: '20%', correct: false }
		]

	},
	{
		question: 'The three letters "O", "D", "G" are placed at random in a row. Find the porbability of spelling "DOG"',
		answers: [
			{ text: '17%', correct: true },
			{ text: '21%', correct: false },
			{ text: '10%', correct: false },
			{ text: '14%', correct: false }
		]

	},
	{
		question: 'Four friends Alex, Bodi, Claire and Daniel sit randomly in a row. Determine the probability that Alex is on one of the ends.',
		answers: [
			{ text: '25%', correct: false },
			{ text: '50%', correct: true },
			{ text: '75%', correct: false },
			{ text: '100%', correct: false }
		]

	},
	{
		question: 'A biased coin is flipped 200 times. It lands on heads 143 times and on tails for the remainder. If the coin is flipped 3 times, estimate the probablity of getting all heads',
		answers: [
			{ text: '48%', correct: false },
			{ text: '100%', correct: false },
			{ text: '81%', correct: false },
			{ text: '36%', correct: true },
		]

	},
	{
		question: "In a netball team, the Goal Shooter takes 65% of the team's shots, and scores 70% of tbe time. The Goal Attack takes the remainder of the shots, and scores 60% of the time. Find the probability that the team will score the next shot.",
		answers: [
			{ text: '33%', correct: false },
			{ text: '67%', correct: true },
			{ text: '54%', correct: false },
			{ text: '88%', correct: false }
		]

	}
]




