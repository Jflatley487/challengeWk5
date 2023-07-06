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
const endScreen = document.getElementById("end-screen");

//function to start the quiz
startButton.addEventListener("click", startQuiz);

function startQuiz() {
    startButton.classList.add("hide");
    quizContainer.classList.remove("hide");
    timerInterval = setInterval(updateTimer, 1000);
    displayQuestion();

    //start timer
    startTimer();
}

    function updateTimer() {
        time--;
        timerElement.textContent = `Time: ${time}s`;
        if(time <= 0) {
            endQuiz();
        }
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
    function handleAnserClick(event) {
        const selectedAnswer = event.target.textContent;

        if (selectedAnswer === quizQuestions[currentQuestionIndex].correctAnswer) {
            score++;
        } else {
            time -= 10;
        }

        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            displayQuestion();
        } else {
            endQuiz();
        }
    }

    //function to end the quiz
    function endQuiz() {
        clearInterval(timerInterval);
        questionContainer.classList.add("hide");
        endScreen.classList.remove("hide");
        scoreElement.textContent = score;
    }

    //function to start the timer
 function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
 }

