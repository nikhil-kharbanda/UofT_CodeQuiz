/*Variables to be called within HTML*/
/*Page 1 - variables for the startpage section */
var startPageScreen = document.getElementById("startpage");
var startQuizBtn = document.getElementById("startQuizBtn");

/*Page 2 - Variables for the quiz section*/
var quizScreen = document.getElementById("quiz");
var quizTimer = document.getElementById("countdownTimer");
var questionsEl = document.getElementById("questions");
var optA = document.getElementById("a");
var optB = document.getElementById("b");
var optC = document.getElementById("c");
var optD = document.getElementById("d");
var answersEl = document.getElementById("answer");

/*Page 3 - Variables for the gameOver section */
var gameOverScreen = document.getElementById("gameOver");
var highScoreInitalsInput = document.getElementById("initials");
var submitScoreBtn = document.getElementById("submitScore");

/*Page 4 - Variables for the highScore section*/
var highScoreScreen = document.getElementById("highScoreScreen");
var highScorePage = document.getElementById("highScorePage");
var HSDisplayInitals = document.getElementById("HS_initials");
var HSDisplayHS = document.getElementById("HS_Score");
var finalScoreEl = document.getElementById("finalScorePoints");

/*Page 5 - Variables for the gameEndOption*/
var endGameButtons = document.getElementById("gameEndOption");

/*Assigning global variables for the JS side*/
var quizQuestions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    choiceA: "js",
    choiceB: "script",
    choiceC: "javascript",
    choiceD: "scripting",
    correctAnswer: "b",
  },
  {
    question: "How do you write 'Hello World' in an alert box?",
    choiceA: "alert('Hello World')",
    choiceB: "alertBox('Hello World')",
    choiceC: "msgBox('Hello World')",
    choiceD: "msg('Hello World')",
    correctAnswer: "a",
  },
];

var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 60;

var correctPoints = 0;
var score = 0;
var savedHS = JSON.parse(localStorage.getItem("score")) || [];

/*Function to be called as the start quiz button hit*/
function startQuiz() {
  /*Hide the other screens*/
  gameOverScreen.style.display = "none";
  startPageScreen.style.display = "none";

  /*Display a quiz question from array. Function called*/
  generateQuizQuestion();

  /*Creating a timer*/
  timerInterval = setInterval(function () {
    timeLeft--;
    quizTimer.textContent = "Time Remaining: " + timeLeft;

    if (timeLeft === 0) {
      clearInterval(timerInterval);
      showScore();
    }
  }, 1000);

  /*Display the quiz screen*/
  quizScreen.style.display = "block";
}

/*Generate a question from the quizQuestions array*/
function generateQuizQuestion() {
  gameOverScreen.style.display = "none";
  if (currentQuestionIndex === finalQuestionIndex) {
    return showScore();
  }

  var currentQuestion = quizQuestions[currentQuestionIndex];
  questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
  optA.innerHTML = currentQuestion.choiceA;
  optB.innerHTML = currentQuestion.choiceB;
  optC.innerHTML = currentQuestion.choiceC;
  optD.innerHTML = currentQuestion.choiceD;
}

/*Check to see if its the correct answer. Function can get called in the HTML side.*/
function checkIfCorrect(answer) {
  correct = quizQuestions[currentQuestionIndex].correctAnswer;
  if (answer === correct && currentQuestionIndex !== finalQuestionIndex) {
    score++;
    //alert("Correct, congrats. You know your stuff!");
    currentQuestionIndex++;
    generateQuizQuestion();
  } else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex) {
    //alert("That is incorrect. 10 secs has been deducted");
    quizTimer.textContent = "Time Remaining: " + timeLeft;
    currentQuestionIndex++;
    timeLeft = timeLeft - 10;
    generateQuizQuestion();
  } else {
    showScore();
  }
}

/*Only occurs when the submit score button is pressed*/ 
submitScoreBtn.addEventListener("click", function highScore() {
  if (highScoreInitalsInput.value === "") {
    alert("Please enter a valid inital");
    return false;
  } else {
    //High score page section
    var currentUser = highScoreInitalsInput.value.trim();
    var currentHighScore = {
      name: currentUser,
      score: timeLeft,
    };

    gameOverScreen.style.display = "none";
    highScoreScreen.style.display = "flex";
    highScorePage.style.display = "block";
    endGameButtons.style.display = "flex";

    savedHS.push(currentHighScore);
    localStorage.setItem("score", JSON.stringify(savedHS));
    generateHighScore();
  }
});

function showScore() {
  clearInterval(timerInterval);
  quizScreen.style.display = "none";
  gameOverScreen.style.display = "flex";

  clearInterval(quizTimer);
  highScoreInitalsInput.value = "";
  finalScoreEl.innerHTML =
    "You got " + timeLeft + " out of " + quizQuestions.length + " correct!";
}

function showHighScore() {
  startPageScreen.style.display = "none";
  gameOverScreen.style.display = "none";
  highScoreScreen.style.display = "flex";
  highScorePage.style.display = "block";
  endGameButtons.style.display = "flex";

  generateHighScore();
}

function generateHighScore() {
  HSDisplayInitals.innerHTML = "";
  HSDisplayHS.innerHTML = "";
  var listHighScores = [];
  for (i = 0; i < savedHS.length; i++) {
    var newName = document.createElement("li");
    // var newScore = document.createElement("li");
    newName.textContent = savedHS[i].name + ": " + savedHS[i].score;
    // newScore.textContent = savedHS[i].score;
    HSDisplayInitals.appendChild(newName);
    //HSDisplayHS.appendChild(newScore);
  }
}

function clearScore() {
  HSDisplayHS.textContent = "";
  HSDisplayInitals = "";
}

function restartQuiz() {
  highScoreScreen.style.display = "none";
  gameOverScreen.style.display = "none";
  startPageScreen.style.display = "flex";
  timeLeft = 60;
  score = 0;
  currentQuestionIndex = 0;
}

startQuizBtn.addEventListener("click", startQuiz);
