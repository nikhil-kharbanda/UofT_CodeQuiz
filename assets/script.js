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
var optC = document.getElementById("C");
var optD = document.getElementById("D");
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

/*Assigning variables for the JS side*/
var quizQuestions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    optA: "js",
    optB: "script",
    optC: "javascript",
    optD: "scripting",
    correctAnswer: "b",
  },
  {
    question: "How do you write 'Hello World' in an alert box?",
    optA: "alert('Hello World')",
    optB: "alertBox('Hello World')",
    optC: "msgBox('Hello World')",
    optD: "msg('Hello World')",
    correctAnswer: "a",
  },
];

var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 60;
var score = 0;
var correctPoints = 0;

function startQuiz(){
    gameOverScreen.style.display = "none";
    startPageScreen.style.display = "none";
    generateQuizQuestion();

    quizTimer = setInterval(function() { 
        timeLeft--;
        quizTimer.textContent = "Time Remaining: " + timeLeft;

        if(timeLeft === 0) {
            clearInterval(quizTimer);
            //showScore();
        }
    }, 1000);
    quizBody.style.display = "block";
}


function generateQuizQuestion(){
    gameOverScreen.style.display = "none";
    if(currentQuestionIndex === finalQuestionIndex){
        //return showScore();
    }

    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    optA.innerHTML = currentQuestion.optA;
    optB.innerHTML = currentQuestion.optB;
    optC.innerHTML = currentQuestion.optC;
    optD.innerHTML = currentQuestion.optD;
}

startQuizBtn.addEventListener("click", startQuiz);
