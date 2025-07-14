const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    correct: 2
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correct: 1
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["Charles Dickens", "Mark Twain", "William Shakespeare", "Jane Austen"],
    correct: 2
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    correct: 3
  },
  {
    question: "What is the square root of 64?",
    options: ["6", "7", "8", "9"],
    correct: 2
  }
];

let currentQuestion = 0;
let score = 0;
let selectedOption = null;
let answers = [];

const questionText = document.getElementById("question-text");
const questionCounter = document.getElementById("question-counter");
const answerOptions = document.getElementById("answer-options");
const nextBtn = document.getElementById("next-btn");
const viewResultsBtn = document.getElementById("view-results-btn");
const resultBox = document.getElementById("result-box");
const finalScore = document.getElementById("final-score");
const summary = document.getElementById("summary");
const restartBtn = document.getElementById("restart-btn");

function loadQuestion() {
  selectedOption = null;
  const q = questions[currentQuestion];
  questionText.textContent = q.question;
  questionCounter.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  timeLeft = 10;
  timerDisplay.textContent = timeLeft;

  answerOptions.innerHTML = "";
  q.options.forEach((option, index) => {
    const li = document.createElement("li");
    li.textContent = option;
    li.onclick = () => selectOption(li, index);
    answerOptions.appendChild(li);
  });

  nextBtn.style.display = "inline-block";
  viewResultsBtn.style.display = "none";

  clearInterval(timer);
  startTimer();
}
function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      autoMarkIncorrect();
    }
  }, 1000);
}


function selectOption(li, index) {
  if (selectedOption !== null) return;

  clearInterval(timer);
  selectedOption = index;
  const allOptions = document.querySelectorAll("li");
  allOptions.forEach(opt => opt.classList.remove("selected"));

  li.classList.add("selected");

  if (index === questions[currentQuestion].correct) {
    li.classList.add("correct");
    score++;
    answers.push(true);
  } else {
    li.classList.add("incorrect");
    allOptions[questions[currentQuestion].correct].classList.add("correct");
    answers.push(false);
    quizBox.classList.add("shake");
    setTimeout(() => quizBox.classList.remove("shake"), 400);
  }
}


nextBtn.onclick = () => {
  if (selectedOption === null) return alert("Please select an answer.");

  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResults();
  }
};

viewResultsBtn.onclick = showResults;

function showResults() {
  document.getElementById("quiz-box").style.display = "none";
  resultBox.style.display = "block";
  finalScore.textContent = `${score} / ${questions.length}`;

  summary.innerHTML = "";
  questions.forEach((q, i) => {
    const div = document.createElement("div");
    div.innerHTML = `<strong>Q${i + 1}:</strong> ${q.question}<br>
      <span style="color: ${answers[i] ? 'green' : 'red'}">
        ${answers[i] ? 'Correct' : 'Incorrect'} - Correct answer: ${q.options[q.correct]}
      </span><br><br>`;
    summary.appendChild(div);
  });
}
function autoMarkIncorrect() {
  if (selectedOption !== null) return;

  const allOptions = document.querySelectorAll("li");
  allOptions.forEach((opt, i) => {
    if (i === questions[currentQuestion].correct) {
      opt.classList.add("correct");
    }
  });

  answers.push(false);
  quizBox.classList.add("shake");
  setTimeout(() => quizBox.classList.remove("shake"), 400);
}


restartBtn.onclick = () => {
  currentQuestion = 0;
  score = 0;
  answers = [];
  document.getElementById("quiz-box").style.display = "block";
  resultBox.style.display = "none";
  loadQuestion();
};
let timer;
let timeLeft = 10;
const timerDisplay = document.getElementById("time-left");
const quizBox = document.getElementById("quiz-box");


loadQuestion();
