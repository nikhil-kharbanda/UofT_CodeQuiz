/*Variables to be called within HTML*/
/*Page 1 - variables for the startpage section */
var startPageScreen = document.getElementById("startpage");
var startQuizBtn = document.getElementById("startQuizBtn");

/*Page 2 - Variables for the quiz section*/
var quizBody = document.getElementById("quiz");
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
var highScoreSection = document.getElementById("highScorePage");
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
var score = 0;
var correctPoints = 0;

function startQuiz() {
  gameOverScreen.style.display = "none";
  startPageScreen.style.display = "none";
  quizBody.style.display = "block";
  generateQuizQuestion();

  quizTimer = setInterval(function () {
    timeLeft--;
    quizTimer.textContent = "Time Remaining: " + timeLeft;

    if (timeLeft === 0) {
      clearInterval(quizTimer);
      showScore();
    }
  }, 1000);
  
}

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

function checkIfCorrect(answer){
  correct = quizQuestions[currentQuestionIndex].correctAnswer;
  if(answer === correct && currentQuestionIndex !== finalQuestionIndex){
    score++;
    alert("Correct, congrats. You know your stuff");
    currentQuestionIndex++;
    generateQuizQuestion();
  } else if (answer !== answer && currentQuestionIndex !== finalQuestionIndex){
    quizTimer = quizTimer - 5;
    alert("That is incorrect. 5 secs has been deducted");
    currentQuestionIndex++;
    generateQuizQuestion;
  } else {
    showScore();
  }
}

function showScore() {
  quizBody.style.display = "none";
  gameOverScreen.style.display = "flex";
  clearInterval(quizTimer);
  highScoreInitalsInput.value = "";
  finalScoreEl.innerHTML = 
  "You got " + score + "out of " + quizQuestions.length + " correct!";
}

function generateHighScore(){
  HSDisplayInitals.innerHTML = "";
  HSDisplayHS.innerHTML = "";
  var listHighScores = [];
  for(i = 0; i<listHighScores.length; i++){
    var newName = document.createElement("li");
    var newScore = document.createElement("li");
    newName.textContent = listHighScores[i].name;
    newScore.textContent = listHighScores[i].score;
    HSDisplayInitals.appendChild(newName);
    HSDisplayHS.appendChild(newScore);
  }
}




startQuizBtn.addEventListener("click", startQuiz);
