//javascript questions and answers

const quizQuestions = [
    {
        question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choices: ["<script href='xxx.js'>", "<script name='xxx.js'>", "<script src='xxx.js'>", "<script file='xxx.js'>"],
        correctAnswer: "<script src='xxx.js'>",
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        choices: ["alertBox('Hello World');", "msg('Hello World');", "alert('Hello World');", "msgBox('Hello World');"],
        correctAnswer: "alert('Hello World');",
    },
    {
        question: "How do you create a function in JavaScript?",
        choices: ["function = myFunction()", "function myFunction()", "function:myFunction()", "function-myFunction()"],
        correctAnswer: "function myFunction()",
    },
    {
        question: "How do you call a function named 'myFunction'?",
        choices: ["call function myFunction()", "myFunction()", "call myFunction()", "call myFunction"],
        correctAnswer: "myFunction()",
    },
    {
        question: "How to write an IF statement in JavaScript?",
        choices: ["if i = 5 then", "if i == 5 then", "if i = 5", "if (i == 5)"],
        correctAnswer: "if (i == 5)",
    },
];

let currentQuestionIndex = 0;
let score = 0;
let time = 60;
let timerInterval;

// DOM elements
const startButton = document.getElementById("start-btn");
const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("question");
const choicesContainer = document.getElementById("choices-container");
const timerElement = document.getElementById("timer");
const scoreElement = document.getElementById("score");
const questionContainer = document.getElementById("question-container"); // Updated this
const endScreen = document.getElementById("end-screen");
const submitButton = document.getElementById("submit-btn");
const highScoresList = document.getElementById("high-scores-list");
const highScoresContainer = document.getElementById("high-scores");


displayHighScores();



//function to start the quiz
startButton.addEventListener("click", startQuiz);

submitButton.addEventListener("click", endQuiz);


function startQuiz() {
    startButton.classList.add("hide");
    quizContainer.classList.remove("hide");
    timerInterval = setInterval(updateTimer, 1000);
    displayQuestion();

    //start timer
    startTimer();

    displayHighScores();
}

//funtion to display a question and choices
function displayQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    //clear out any old choices
    choicesContainer.innerHTML = "";

    //Create choice buttons
    currentQuestion.choices.forEach((choice, index) => {
        const choiceButton = document.createElement("button");
        choiceButton.textContent = choice;
        choiceButton.classList.add("answer");
        choiceButton.setAttribute("data-index", index);

        choiceButton.addEventListener("click", handleAnswerClick);

        choicesContainer.appendChild(choiceButton);
    });
}

//Function to handle answer selection
function handleAnswerClick(event) {
    const selectedAnswer = event.target.textContent;
  
    if (selectedAnswer === quizQuestions[currentQuestionIndex].correctAnswer) {
      score++;
    } else {
      time -= 10;
      if (time < 0) {
        time = 0;
      }
      timerElement.textContent = `Time: ${time}s`;
    }
  
    currentQuestionIndex++;
  
    if (currentQuestionIndex < quizQuestions.length) {
      displayQuestion();
    } else {
      endQuiz();
    }
  }
  
  

function updateTimer() {
    time--;
    if (time <= 0) {
        time = 0;
        endQuiz();
    }
    timerElement.textContent = `Time: ${time}s`;
}




function endQuiz() {
    clearInterval(timerInterval);
  
    saveHighScore();
    displayHighScores();
    quizContainer.classList.add("hide");
    endScreen.classList.remove("hide");
    scoreElement.textContent = score;
  }
  
  
  function saveHighScore() {
    const initials = document.getElementById("initials-input").value;
    const highScore = { initials, score };

    // Retrieve existing high scores from local storage or initialize an empty array
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    // Check if initials are not empty before saving the high score
    if (initials.trim() !== "") {
        // Check if the initials already exist in the high scores array
        const existingScore = highScores.find(score => score.initials === initials);

        // If the initials already exist, update the score instead of adding a new entry
        if (existingScore) {
            existingScore.score = Math.max(existingScore.score, score);
        } else {
            // Add the current high score to the array
            highScores.push(highScore);
        }
    }

    // Sort the high scores in descending order based on the score
    highScores.sort((a, b) => b.score - a.score);

    // Limit the number of high scores to, for example, 10
    const maxHighScores = 10;
    highScores.splice(maxHighScores);

    // Save the updated high scores array back to local storage
    localStorage.setItem("highScores", JSON.stringify(highScores));

    // Display the high scores
    displayHighScores();
}





function displayHighScores() {
    // Retrieve the high scores from local storage
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    // Clear the existing high scores list
    highScoresList.innerHTML = "";

    // Create list items for each high score
    highScores.forEach((highScore, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${index + 1}. ${highScore.initials}: ${highScore.score}`;
        highScoresList.appendChild(listItem);
    });

    highScoresContainer.classList.remove("hide");
}

//clear high scores
function clearHighScores() {
    localStorage.removeItem("highScores");

    highScoresList.innerHTML = "";
}

//event listener for clear scores button/link
const clearScoresButton = document.getElementById("clear-scores-btn");
clearScoresButton.addEventListener("click", clearHighScores);


//function to start the timer
function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
}

