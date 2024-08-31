// Variables for quiz data
const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: 1
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        options: ["William Shakespeare", "Charles Dickens", "Mark Twain", "Jane Austen"],
        answer: 0
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        answer: 3
    },
    {
        question: "Who was the first President of the United States?",
        options: ["Abraham Lincoln", "Thomas Jefferson", "George Washington", "John Adams"],
        answer: 2
    },
    {
        question: "What is the chemical symbol for water?",
        options: ["H2O", "CO2", "NaCl", "O2"],
        answer: 0
    },
    {
        question: "Which country is home to the kangaroo?",
        options: ["Canada", "Brazil", "Australia", "India"],
        answer: 2
    },
    {
        question: "What is the hardest natural substance on Earth?",
        options: ["Gold", "Iron", "Diamond", "Silver"],
        answer: 2
    },
    {
        question: "In what year did the Titanic sink?",
        options: ["1905", "1912", "1918", "1923"],
        answer: 1
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        options: ["Oxygen", "Gold", "Osmium", "Oganesson"],
        answer: 0
    }
];

// Cache DOM elements for easier accessibility
const usernameInput = document.getElementById("username");
const usernameSection = document.getElementById("username-section");
const questionSection = document.getElementById("question-section");
const scoreSection = document.getElementById("score-section");
const questionTitle = document.getElementById("question-title");
const feedbackImage = document.getElementById("feedback-image");
const feedbackText = document.getElementById("feedback-text");
const finalScore = document.getElementById("final-score");
const optionButtons = document.getElementsByClassName("option-btn");

let currentQuestionIndex = 0;
let score = 0;
let username = "";

// Function to start the quiz
function startQuiz() {
    username = document.getElementById("username").value.trim();
    if (!username) {
        alert("Please enter a username to start the quiz.");
        return;
    }

    document.getElementById("username-section").classList.add("hidden");
    document.getElementById("question-section").classList.remove("hidden");
    loadQuestion();
}

// Function to load the current question
function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        endQuiz();
        return;
    }

    const questionData = questions[currentQuestionIndex];
    document.getElementById("question-title").innerText = questionData.question;

    const options = document.getElementsByClassName("option-btn");
    for (let i = 0; i < options.length; i++) {
        options[i].innerText = questionData.options[i];
        // Enable the buttons for the new question
        options[i].disabled = false;
    }

    document.getElementById("feedback-image").classList.add("hidden");
    document.getElementById("feedback-text").innerText = "";
}

// Function to check the user's answer
function checkAnswer(optionIndex) {
    const questionData = questions[currentQuestionIndex];
    const isCorrect = optionIndex === questionData.answer;
    const feedbackImage = document.getElementById("feedback-image");

    if (isCorrect) {
        score++;
        feedbackImage.src = "assets/images/correct.jpg";
    } else {
        feedbackImage.src = "assets/images/incorrect.jpg";
    }

    feedbackImage.classList.remove("hidden");
    document.getElementById("feedback-text").innerText = isCorrect ? "Correct!" : "Incorrect!";
    currentQuestionIndex++;

    // Disable all answer buttons to prevent multiple clicks
    const options = document.getElementsByClassName("option-btn");
    for (let i = 0; i < options.length; i++) {
        options[i].disabled = true;
    }
    
    // Move to next question after 2 seconds
    setTimeout(loadQuestion, 2000);  
}

// Function to end the quiz
function endQuiz() {
    document.getElementById("question-section").classList.add("hidden");
    document.getElementById("score-section").classList.remove("hidden");
    document.getElementById("final-score").innerText = `${username}, your score is: ${score}/${questions.length}`;
}

// Function to reset the quiz
function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("username-section").classList.remove("hidden");
    document.getElementById("score-section").classList.add("hidden");
    document.getElementById("username").value = "";
}

// Event listeners for buttons
document.getElementById("start-button").addEventListener("click", startQuiz);
document.getElementById("restart-button").addEventListener("click", resetQuiz);

const optionButtons = document.getElementsByClassName("option-btn");
for (let i = 0; i < optionButtons.length; i++) {
    optionButtons[i].addEventListener("click", function() {
        checkAnswer(parseInt(this.getAttribute("data-index")));
    });
}