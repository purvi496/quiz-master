let currentQuestion = 0;
let score = 0;
let speedBonus = 0;
let selectedQuestions = [];
let userAnswers = [];
let currentDifficulty = "";
let timeLeft = 30;
let timerInterval;

const quizQuestions = [

    // EASY QUESTIONS
    {
        id: 1,
        question: "What is the capital of France?",
        options: ["Paris", "London", "Rome", "Berlin"],
        answer: "Paris",
        difficulty: "Easy",
        explanation: "Paris is the capital city of France."
    },

    {
        id: 2,
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        answer: "Mars",
        difficulty: "Easy",
        explanation: "Mars is called the Red Planet because of its reddish appearance."
    },

    {
        id: 3,
        question: "How many days are there in a week?",
        options: ["5", "6", "7", "8"],
        answer: "7",
        difficulty: "Easy",
        explanation: "A week has seven days."
    },

    {
        id: 4,
        question: "Which is the largest ocean on Earth?",
        options: [
            "Atlantic Ocean",
            "Indian Ocean",
            "Pacific Ocean",
            "Arctic Ocean"
        ],
        answer: "Pacific Ocean",
        difficulty: "Easy",
        explanation: "The Pacific Ocean is the largest ocean on Earth."
    },

    {
        id: 5,
        question: "Which animal is known as the King of the Jungle?",
        options: ["Tiger", "Lion", "Elephant", "Leopard"],
        answer: "Lion",
        difficulty: "Easy",
        explanation: "The lion is commonly known as the King of the Jungle."
    },

    {
        id: 6,
        question: "How many continents are there in the world?",
        options: ["5", "6", "7", "8"],
        answer: "7",
        difficulty: "Easy",
        explanation: "There are seven commonly recognized continents."
    },

    {
        id: 7,
        question: "Which gas do humans need to breathe?",
        options: ["Carbon dioxide", "Oxygen", "Nitrogen", "Hydrogen"],
        answer: "Oxygen",
        difficulty: "Easy",
        explanation: "Humans need oxygen for respiration."
    },


    // MEDIUM QUESTIONS
    {
        id: 8,
        question: "Who was the first person to walk on the Moon?",
        options: [
            "Neil Armstrong",
            "Yuri Gagarin",
            "Buzz Aldrin",
            "Alan Shepard"
        ],
        answer: "Neil Armstrong",
        difficulty: "Medium",
        explanation: "Neil Armstrong became the first person to walk on the Moon in 1969."
    },

    {
        id: 9,
        question: "Which country is known as the Land of the Rising Sun?",
        options: ["China", "Japan", "Thailand", "South Korea"],
        answer: "Japan",
        difficulty: "Medium",
        explanation: "Japan is commonly known as the Land of the Rising Sun."
    },

    {
        id: 10,
        question: "What is the chemical symbol for gold?",
        options: ["Ag", "Au", "Fe", "Cu"],
        answer: "Au",
        difficulty: "Medium",
        explanation: "Au is the chemical symbol for gold."
    },

    {
        id: 11,
        question: "Which is the longest river in India?",
        options: ["Yamuna", "Godavari", "Ganga", "Narmada"],
        answer: "Ganga",
        difficulty: "Medium",
        explanation: "The Ganga is generally recognized as the longest river in India."
    },

    {
        id: 12,
        question: "Which organ pumps blood throughout the human body?",
        options: ["Brain", "Liver", "Lungs", "Heart"],
        answer: "Heart",
        difficulty: "Medium",
        explanation: "The heart pumps blood throughout the body."
    },

    {
        id: 13,
        question: "Which is the smallest prime number?",
        options: ["0", "1", "2", "3"],
        answer: "2",
        difficulty: "Medium",
        explanation: "2 is the smallest prime number and the only even prime number."
    },

    {
        id: 14,
        question: "Which instrument is used to measure temperature?",
        options: ["Barometer", "Thermometer", "Hygrometer", "Compass"],
        answer: "Thermometer",
        difficulty: "Medium",
        explanation: "A thermometer is used to measure temperature."
    },


    // HARD QUESTIONS
    {
        id: 15,
        question: "Which element has the chemical symbol W?",
        options: ["Tungsten", "Tin", "Titanium", "Tantalum"],
        answer: "Tungsten",
        difficulty: "Hard",
        explanation: "The chemical symbol W represents tungsten."
    },

    {
        id: 16,
        question: "Which ancient civilization built Machu Picchu?",
        options: ["Maya", "Roman", "Inca", "Egyptian"],
        answer: "Inca",
        difficulty: "Hard",
        explanation: "Machu Picchu was built by the Inca civilization."
    },

    {
        id: 17,
        question: "What is the hardest natural substance on Earth?",
        options: ["Iron", "Diamond", "Quartz", "Granite"],
        answer: "Diamond",
        difficulty: "Hard",
        explanation: "Diamond is the hardest naturally occurring mineral."
    },

    {
        id: 18,
        question: "Which scientist developed the theory of general relativity?",
        options: [
            "Isaac Newton",
            "Albert Einstein",
            "Galileo Galilei",
            "Nikola Tesla"
        ],
        answer: "Albert Einstein",
        difficulty: "Hard",
        explanation: "Albert Einstein developed the theory of general relativity."
    },

    {
        id: 19,
        question: "Which country has the largest land area in the world?",
        options: ["Canada", "China", "Russia", "United States"],
        answer: "Russia",
        difficulty: "Hard",
        explanation: "Russia is the world's largest country by land area."
    },

    {
        id: 20,
        question: "What is the approximate speed of light in a vacuum?",
        options: [
            "300,000 km/s",
            "150,000 km/s",
            "30,000 km/s",
            "3,000 km/s"
        ],
        answer: "300,000 km/s",
        difficulty: "Hard",
        explanation: "Light travels through a vacuum at approximately 300,000 kilometres per second."
    },

    {
        id: 21,
        question: "Which is the deepest ocean trench in the world?",
        options: [
            "Tonga Trench",
            "Mariana Trench",
            "Java Trench",
            "Puerto Rico Trench"
        ],
        answer: "Mariana Trench",
        difficulty: "Hard",
        explanation: "The Mariana Trench contains the deepest known point in Earth's oceans."
    }
];

console.log("Total questions:", quizQuestions.length);

function showQuestion() {

    const question = selectedQuestions[currentQuestion];

    // Display question number
    document.getElementById("question-number").textContent =
        "Question " + (currentQuestion + 1) + " of " + selectedQuestions.length;

    // Display question
    document.getElementById("question").textContent = question.question;

    // Display score
    document.getElementById("score").textContent = score;

    // Update progress bar
    const progress = ((currentQuestion + 1) / selectedQuestions.length) * 100;

    document.getElementById("progress-bar").style.width = progress + "%";

    // Get the options container
    const optionsContainer = document.getElementById("options");

    // Clear old options
    optionsContainer.innerHTML = "";

    // Create a button for each option
    question.options.forEach(function(option) {

        const button = document.createElement("button");

        button.textContent = option;
        button.classList.add("btn", "btn-outline-primary");

        button.addEventListener("click", function() {
            checkAnswer(option);
        });

        optionsContainer.appendChild(button);
    });

    // Disable the Next button until an answer is selected
}
function startTimer() {

    clearInterval(timerInterval);

    timeLeft = 30;
    document.getElementById("timer").textContent = timeLeft;

    timerInterval = setInterval(function() {

        timeLeft--;

        document.getElementById("timer").textContent = timeLeft;
        if (timeLeft <= 0) {

    clearInterval(timerInterval);

    const question = selectedQuestions[currentQuestion];

    // Store unanswered question
    userAnswers.push({
        question: question.question,
        userAnswer: "Not answered",
        correctAnswer: question.answer,
        timeSpent: 30
    });

    currentQuestion++;

    if (currentQuestion < selectedQuestions.length) {
        showQuestion();
        startTimer();
    } else {
        showResults();
    }
}

    }, 1000);
}

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const difficultySelect = document.getElementById("difficulty");
const startButton = document.getElementById("start-btn");

startButton.addEventListener("click", function() {

    const selectedDifficulty = difficultySelect.value;
currentDifficulty = selectedDifficulty;
    const filteredQuestions = quizQuestions.filter(function(question) {
        return question.difficulty === selectedDifficulty;
    });

    selectedQuestions = filteredQuestions.sort(function() {
        return Math.random() - 0.5;
    });

    currentQuestion = 0;
score = 0;
speedBonus = 0;
userAnswers = [];

    startScreen.classList.add("d-none");
    quizScreen.classList.remove("d-none");

    showQuestion();
    startTimer();
});


function checkAnswer(selectedAnswer) {

    clearInterval(timerInterval);

    const question = selectedQuestions[currentQuestion];

    // Calculate how much time the user spent
    const timeSpent = 30 - timeLeft;

    // Store the user's answer
    userAnswers.push({
        question: question.question,
        userAnswer: selectedAnswer,
        correctAnswer: question.answer,
        timeSpent: timeSpent
    });
    // Get all answer buttons
    const buttons = document.querySelectorAll("#options button");

    // Check if the selected answer is correct
    if (selectedAnswer === question.answer) {

    // Correct answer gives 10 points
    score += 10;

    // Give extra points for answering quickly
    if (timeLeft >= 20) {
        score += 5;
        speedBonus += 5;
    } else if (timeLeft >= 10) {
        score += 3;
        speedBonus += 3;
    } else if (timeLeft > 0) {
        score += 1;
        speedBonus += 1;
    }

    buttons.forEach(function(button) {
            if (button.textContent === selectedAnswer) {
                button.classList.remove("btn-outline-primary");
                button.classList.add("btn-success");
            }
        });

    } else {

        buttons.forEach(function(button) {

            // Mark selected answer as wrong
            if (button.textContent === selectedAnswer) {
                button.classList.remove("btn-outline-primary");
                button.classList.add("btn-danger");
            }

            // Show the correct answer
            if (button.textContent === question.answer) {
                button.classList.remove("btn-outline-primary");
                button.classList.add("btn-success");
            }
        });
    }

    // Disable all answer buttons after selecting
    buttons.forEach(function(button) {
        button.disabled = true;
    });

    // Enable Next button
    document.getElementById("next-btn").disabled = false;

    // Update score on screen
    document.getElementById("score").textContent = score;
}

document.getElementById("next-btn").addEventListener("click", function() {

    clearInterval(timerInterval);

    currentQuestion++;

    if (currentQuestion < selectedQuestions.length) {
        showQuestion();
        startTimer();
    } else {
        showResults();
    }
});

function showResults() {

    // Stop the timer
    clearInterval(timerInterval);

    // Find number of correct answers
    const correctAnswers = userAnswers.filter(function(answer) {
        return answer.userAnswer === answer.correctAnswer;
    }).length;

    // Find number of wrong answers
    const wrongAnswers = selectedQuestions.length - correctAnswers;

    // Calculate maximum possible score
    const maxScore = selectedQuestions.length * 15;

    // Calculate percentage
    const percentage = (score / maxScore) * 100;

    // Calculate grade
    let grade;

    if (percentage >= 90) {
        grade = "A";
    } else if (percentage >= 80) {
        grade = "B";
    } else if (percentage >= 70) {
        grade = "C";
    } else if (percentage >= 60) {
        grade = "D";
    } else {
        grade = "F";
    }

    quizScreen.classList.add("d-none");

    resultScreen.classList.remove("d-none");

    document.getElementById("final-score").textContent =
        score + " points";

    document.getElementById("percentage").textContent =
        percentage.toFixed(0) + "%";

    document.getElementById("grade").textContent = grade;

    document.getElementById("correct-count").textContent =
        correctAnswers;

    document.getElementById("wrong-count").textContent =
        wrongAnswers;

    document.getElementById("speed-bonus").textContent =
        speedBonus;
            // Save quiz attempt
    const history = JSON.parse(localStorage.getItem("quizHistory")) || [];

    const attempt = {
        difficulty: currentDifficulty,
        score: score,
        percentage: percentage.toFixed(0),
        date: new Date().toLocaleString()
    };

    history.push(attempt);

    localStorage.setItem("quizHistory", JSON.stringify(history));
    showHistory();
}
function showReview() {

    const reviewContainer = document.getElementById("review-container");

   reviewContainer.innerHTML = "";
reviewContainer.classList.add("mt-3");

    userAnswers.forEach(function(answer, index) {

        const question = selectedQuestions[index];

        const reviewCard = document.createElement("div");
        reviewCard.classList.add("card", "mb-3", "p-3", "text-start");

        const isCorrect =
            answer.userAnswer === answer.correctAnswer;

        if (isCorrect) {
            reviewCard.classList.add("border-success");
        } else {
            reviewCard.classList.add("border-danger");
        }

        reviewCard.innerHTML = `
            <h5>Question ${index + 1}</h5>

            <p><strong>${question.question}</strong></p>

            <p>
                Your Answer:
                <span class="${isCorrect ? "text-success" : "text-danger"}">
                    ${answer.userAnswer}
                </span>
            </p>

            <p>
                Correct Answer:
                <span class="text-success">
                    ${answer.correctAnswer}
                </span>
            </p>

            <p>
                Time Spent:
                <strong>${answer.timeSpent} seconds</strong>
            </p>

            <p class="mb-0">
                <strong>Explanation:</strong>
                ${question.explanation}
            </p>
        `;

        reviewContainer.appendChild(reviewCard);
    });

    // Show review section
    document.getElementById("review-section").classList.remove("d-none");
}
document.getElementById("review-btn").addEventListener("click", function() {
    showReview();
});
document.getElementById("restart-btn").addEventListener("click", function() {

    // Stop the timer
    clearInterval(timerInterval);

    // Reset quiz values
    currentQuestion = 0;
    score = 0;
    speedBonus = 0;
    userAnswers = [];
    selectedQuestions = [];
    timeLeft = 30;

    // Reset timer display
    document.getElementById("timer").textContent = "30";

    // Hide result screen
    resultScreen.classList.add("d-none");

    // Show start screen
    startScreen.classList.remove("d-none");

});
function showHistory() {

    const historyContainer =
        document.getElementById("history-container");

    const history =
        JSON.parse(localStorage.getItem("quizHistory")) || [];

    historyContainer.innerHTML = "";

    if (history.length === 0) {

        historyContainer.innerHTML =
            "<p>No quiz attempts yet.</p>";

        return;
    }

    history.forEach(function(attempt, index) {

        const historyItem = document.createElement("div");

        historyItem.classList.add(
            "card",
            "p-3",
            "mb-2"
        );

        historyItem.innerHTML = `
            <strong>Attempt ${index + 1}</strong>
            <p class="mb-1">
                Difficulty: ${attempt.difficulty}
            </p>
            <p class="mb-1">
                Score: ${attempt.score} points
            </p>
            <p class="mb-1">
                Percentage: ${attempt.percentage}%
            </p>
            <small>
                ${attempt.date}
            </small>
        `;

        historyContainer.appendChild(historyItem);
    });
}
