/*Variables to be called within HTML*/

/*Page 1 - Variables for the startpage section */
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
/*Array containing quiz questions*/
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
  {
    question:
      "Which built-in method returns the character at the specified index?",
    choiceA: "characterAt()",
    choiceB: "getCharAt()",
    choiceC: "charAt()",
    choiceD: "None of the above",
    correctAnswer: "c",
  },
  {
    question:
      "Which built-in method returns the calling string value converted to lower case?",
    choiceA: "toLowerCase()",
    choiceB: "toLower()",
    choiceC: "changeCase(case)",
    choiceD: "None of the above",
    correctAnswer: "a",
  },
  {
    question: "How do you find the minimum of x and y using JavaScript?",
    choiceA: "min(x,y)",
    choiceB: "Math.min(x,y)",
    choiceC: "Math.min(xy)",
    choiceD: "min(xy)",
    correctAnswer: "b",
  },
  {
    question: "How do you find the max of x and y using JavaScript?",
    choiceA: "max(x,y)",
    choiceB: "Math.max(x,y)",
    choiceC: "Math.max(xy)",
    choiceD: "max(xy)",
    correctAnswer: "b",
  },
  {
    question: "Which of the following statements will throw an error?",
    choiceA: "var foo = function bar(){}",
    choiceB: "var foo = functionbar{}",
    choiceC: "function bar(){}",
    choiceD: "function{}",
    correctAnswer: "b",
  },
  {
    question: "How to write 'IF' statement in JS?",
    choiceA: "if i == 5",
    choiceB: "if (i != 5)",
    choiceC: "if (i = 5)",
    choiceD: "if (i == 5)",
    correctAnswer: "d",
  },
  {
    question: "How to write 'FOR' statement in JS?",
    choiceA: "for(int i; i < 5)",
    choiceB: "for(int i<5)",
    choiceC: "for(int i; i <5; i++)",
    choiceD: "for(i++)",
    correctAnswer: "c",
  },
  {
    question: "How do you round to the nearest highest integer",
    choiceA: "Math.round(7.25)",
    choiceB: "Math.max(7.25)",
    choiceC: "Math.ceil(7.25)",
    choiceD: "top(7.25)",
    correctAnswer: "b",
  },
  {
    question: "What is the correct way to define an array",
    choiceA: "var colors = ['red', 'green', 'blue']",
    choiceB: "var colors = (1:'red', 2:'green', 3:'blue')",
    choiceC: "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')",
    choiceD: "var colors = 'red', 'green', 'blue'",
    correctAnswer: "a",
  },
  {
    question: "Where is the correct place to insert a JavaScript?",
    choiceA: "The body section. ",
    choiceB: "Both the head section and the body section are correct ",
    choiceC: "The head section",
    choiceD: "Outside the body",
    correctAnswer: "b",
  },
  {
    question: "How do you create a function in JS?",
    choiceA: "function myFoo()",
    choiceB: "function:myFoo()",
    choiceC: "function = myFoo()",
    choiceD: "All of the above are acceptable",
    correctAnswer: "a",
  },
  {
    question: "How do you call a function in JS?",
    choiceA: "call myFoo()",
    choiceB: "call function myFoo()",
    choiceC: "myFoo()",
    choiceD: "All of the above are acceptable",
    correctAnswer: "c",
  }
];

/*Length of quiz questions. AKA: how many quiz questions are there*/
var finalQuestionIndex = quizQuestions.length;

/*Quiz question counter*/
var currentQuestionIndex = 0;

/*Timer for the quiz*/
var timeLeft = 75;

/*How many user got right*/
var correctPoints = 0;

/*Score to be displayed*/
var score = 0;

/*Access local storage to keep track of users progress*/
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

    /*Once timer reaches 0, end the quiz and how the score page*/
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
  /*Hide all other screens*/
  gameOverScreen.style.display = "none";

  /*If no more questions are to be displayed, go to the showScore function*/
  if (currentQuestionIndex === finalQuestionIndex) {
    return showScore();
  }

  /*Display appropriate elements (questions and button options) based on the question being asked*/
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
  /*If user correctly answered question, and its not the last question. Increment correntPoints, alert the user their status, increment question counter, and prepare to re-write elements*/
  if (answer === correct && currentQuestionIndex !== finalQuestionIndex) {
    timeLeft = timeLeft + 10;
    correctPoints++;
    alert("Correct, congrats. You know your stuff!");
    currentQuestionIndex++;
    generateQuizQuestion();

    /*If user answered question incorrectly, and its not the last question. Take away 10 secs, alert the user their status, increment question counter, and prepare to re-write elements*/
  } else if (
    answer !== correct &&
    currentQuestionIndex !== finalQuestionIndex
  ) {
    alert(
      "That is incorrect. 10 secs has been deducted. Might wanna review after this quiz?"
    );
    timeLeft = timeLeft - 10;
    quizTimer.textContent = "Time Remaining: " + timeLeft;
    currentQuestionIndex++;
    generateQuizQuestion();

    /*If last question (no more possible senarios), show score screen*/
  } else {
    showScore();
  }
}

/*Only occurs when the submit score button is pressed*/
submitScoreBtn.addEventListener("click", function highScore() {
  /*Check to see if user acutally put a value in textbox*/
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

    /*Display the final page showing the user the score board */
    gameOverScreen.style.display = "none";
    highScoreScreen.style.display = "flex";
    highScorePage.style.display = "block";
    endGameButtons.style.display = "flex";

    /*Push the latest attempt to the table*/
    savedHS.push(currentHighScore);

    /*Save their result on the localStorage */
    localStorage.setItem("score", JSON.stringify(savedHS));

    /*Create highscore table*/
    generateHighScore();
  }
});

/*The functin call for at the end of the questions */
function showScore() {
  /*Stop the timer*/
  clearInterval(timerInterval);

  /*Hide the questions screen, and show the gameover screen*/
  quizScreen.style.display = "none";
  gameOverScreen.style.display = "flex";

  highScoreInitalsInput.value = "";

  /*Display the final result*/
  finalScoreEl.innerHTML = "You got a score of " + timeLeft + "!";
}

/*Hide the other screens. but show the high score table and the buttons to restart*/
function showHighScore() {
  startPageScreen.style.display = "none";
  gameOverScreen.style.display = "none";
  highScoreScreen.style.display = "flex";
  highScorePage.style.display = "block";
  endGameButtons.style.display = "flex";

  generateHighScore();
}

/*Create and append new attemps*/
function generateHighScore() {
  HSDisplayInitals.innerHTML = "";
  HSDisplayHS.innerHTML = "";
  for (i = 0; i < savedHS.length; i++) {
    var newName = document.createElement("li");
    newName.textContent =
      savedHS[i].name + "          :       " + savedHS[i].score;
    HSDisplayInitals.appendChild(newName);
  }
}

/*Button to erase prev score element and clear local storage*/
function clearScore() {
  window.localStorage.clear();
  HSDisplayHS.textContent = "";
  HSDisplayInitals.textContent = "";
  savedHS = [];
}

/*Option to restart quiz*/
function restartQuiz() {
  highScoreScreen.style.display = "none";
  gameOverScreen.style.display = "none";
  startPageScreen.style.display = "flex";
  timeLeft = 60;
  score = 0;
  currentQuestionIndex = 0;
}

startQuizBtn.addEventListener("click", startQuiz);
