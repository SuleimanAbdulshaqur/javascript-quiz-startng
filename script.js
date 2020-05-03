const questions = [
  {
  	question: 'What is 2 + 2?',
    answers: [
      { text: '4', correct: true },
      { text: '22', correct: false },
      { text: '3', correct: false }
    ]
  },
	{
		question: 'What grows on branches?',
		answers: [
			{ text: 'Leaves', correct: true },
			{ text: 'Bolts', correct: false },
			{ text: 'Water', correct: false }
		]
	},
	{
		question: 'What is Nitrogen?',
		answers: [
			{ text: 'Money', correct: false },
			{ text: 'An element', correct: true },
			{ text: 'A ball', correct: false }
		]
	},
	{
		question: 'What is 4 * 2?',
		answers: [
			{ text: '6', correct: false },
			{ text: '12', correct: false },
			{ text: '8', correct: true }
		]
	},
	{
		question: 'What is 4 - 2?',
		answers: [
			{ text: '2', correct: true },
			{ text: '69', correct: false },
			{ text: '419', correct: false }
		]
	}
]

const control = document.querySelector(".controls");
const startBtn = document.querySelector(".start-button");
const nextBtn = document.querySelector(".next-button");
const questionContainerElement = document.querySelector('.question-field');
const questionElement = document.querySelector(".question");
const answerButtonsElement = document.querySelector('.answers');
const score = document.querySelector('.score');
const wrongScore = document.querySelector('.score-wrong');
const totalScore = document.querySelector('.score-total');
const correctScore = document.querySelector('.score-correct');

let shuffledQuestions, currentQuestionIndex;
let wrong, correct, total;

startBtn.addEventListener('click', startGame);
nextBtn.addEventListener('click', () => {
	currentQuestionIndex++;
	total++;
	totalScore.innerHTML = total;
  setNextQuestion()
});

function startGame() {
	wrong = 0;
	correct = 0;
	total = 1;
	
	
	
	startBtn.classList.add('hidden');
  shuffledQuestions = questions.sort(() => Math.random() - .4);
	currentQuestionIndex = 0;
	wrongScore.innerHTML = wrong;
	correctScore.innerHTML = correct;
	totalScore.innerHTML = total;

	questionContainerElement.classList.remove('hidden');
	nextBtn.classList.remove("hidden");
  setNextQuestion();
}


function setNextQuestion() {
	resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerHTML = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
		button.classList.add('answers-button');
		if(answer.correct) {
			button.dataset.correct = answer.correct;
		}
		

    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
	// removes next button
	nextBtn.classList.add('hidden')
	// remove answers from earlier question
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
	const selectedButton = e.target;
	if(selectedButton.dataset.correct) {
		correct++;
		correctScore.innerHTML = correct;
	} else {
		wrong++;
		wrongScore.innerHTML = wrong;
	}
  Array.from(answerButtonsElement.children).forEach(button => {
		setStatusClass(button, button.dataset.correct)
		button.disabled = true;
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextBtn.classList.remove('hidden')
  } else {
    startBtn.innerText = 'Restart'
		startBtn.classList.remove('hidden');
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
