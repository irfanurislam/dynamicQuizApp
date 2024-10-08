// Array of quiz questions and answers
const quizQuestions = [
  {
    question: "What is the chemical symbol for water?",
    choices: ["H2O", "CO2", "O2", "NaCl"],
    correctAnswer: ["H2O"],
    explanation:
      "Water is represented by the chemical formula H2O, meaning it has two hydrogen atoms and one oxygen atom.",
  },
  {
    question: "Who painted the Mona Lisa?",
    choices: [
      "Leonardo da Vinci",
      "Pablo Picasso",
      "Vincent van Gogh",
      "Claude Monet",
    ],
    correctAnswer: ["Leonardo da Vinci"],
    explanation:
      "The Mona Lisa was painted by Leonardo da Vinci, an Italian Renaissance artist.",
  },
  {
    question: "Which planet is known as the Red Planet?",
    choices: ["Mercury", "Venus", "Earth", "Mars"],
    correctAnswer: ["Mars"],
    explanation:
      "Mars is often called the Red Planet because of its reddish appearance.",
  },
  {
    question: "What is the largest planet in our solar system?",
    choices: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: ["Jupiter"],
    explanation: "Jupiter is the largest planet in our solar system.",
  },
  {
    question:
      "Which of these programming languages are used for web development?",
    choices: ["Python", "HTML", "Java", "CSS"],
    correctAnswer: ["HTML", "CSS"],
    explanation:
      "HTML and CSS are standard technologies used for building web pages.",
  },
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Rome", "Berlin"],
    correctAnswer: ["Paris"],
    explanation: "Paris is the capital city of France.",
  },
  {
    question: "Who is known as the father of computer science?",
    choices: ["Albert Einstein", "Isaac Newton", "Alan Turing", "Nikola Tesla"],
    correctAnswer: ["Alan Turing"],
    explanation:
      "Alan Turing is considered the father of computer science for his pioneering work in algorithms and computation.",
  },
  {
    question: "What is the square root of 64?",
    choices: ["6", "7", "8", "9"],
    correctAnswer: ["8"],
    explanation: "The square root of 64 is 8.",
  },
  {
    question: "Which elements are noble gases?",
    choices: ["Helium", "Oxygen", "Nitrogen", "Argon"],
    correctAnswer: ["Helium", "Argon"],
    explanation: "Helium and Argon are both noble gases.",
  },
  {
    question: "Which countries are in the United Kingdom?",
    choices: ["Scotland", "Ireland", "Wales", "England"],
    correctAnswer: ["Scotland", "Wales", "England"],
    explanation:
      "The United Kingdom is composed of Scotland, Wales, and England, along with Northern Ireland.",
  },
];

// Function to dynamically create the quiz questions
function createQuiz() {
  const quizForm = document.getElementById("quiz-form");
  quizQuestions.forEach((question, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");

    // Create question title
    const questionTitle = document.createElement("h3");
    questionTitle.textContent = `${index + 1}. ${question.question}`;
    questionDiv.appendChild(questionTitle);

    // Create choices as checkboxes
    const choicesList = document.createElement("ul");
    choicesList.classList.add("choices");

    question.choices.forEach((choice) => {
      const listItem = document.createElement("li");
      const choiceInput = document.createElement("input");
      choiceInput.type = "checkbox";
      choiceInput.name = `question-${index}`;
      choiceInput.value = choice;
      listItem.appendChild(choiceInput);

      const choiceLabel = document.createElement("label");
      choiceLabel.textContent = choice;
      listItem.appendChild(choiceLabel);
      choicesList.appendChild(listItem);
    });

    questionDiv.appendChild(choicesList);
    quizForm.appendChild(questionDiv);
  });
}

// Function to submit the quiz and display results with correct answers and feedback
function submitQuiz() {
  const userName = document.getElementById("userName").value;
  const userId = document.getElementById("userId").value;

  // Check if name and ID are provided
  if (!userName || !userId) {
    alert("Please enter your name and ID.");
    return;
  }

  let score = 0;
  let totalQuestions = quizQuestions.length;

  // Loop through each question and check answers
  quizQuestions.forEach((question, index) => {
    const selectedChoices = document.querySelectorAll(
      `input[name="question-${index}"]:checked`
    );
    const selectedAnswers = Array.from(selectedChoices).map(
      (choice) => choice.value
    );
    const questionDiv = document.getElementsByClassName("question")[index];

    // Compare selected answers with the correct answers
    const isCorrect =
      JSON.stringify(selectedAnswers.sort()) ===
      JSON.stringify(question.correctAnswer.sort());

    // Highlight the correct answers
    question.choices.forEach((choice) => {
      const choiceLabel = document.querySelector(
        `input[name="question-${index}"][value="${choice}"]`
      ).nextSibling;
      if (question.correctAnswer.includes(choice)) {
        choiceLabel.style.color = "green"; // Highlight correct choices in green
      } else if (selectedAnswers.includes(choice)) {
        choiceLabel.style.color = "red"; // Highlight wrong choices in red
      }
    });

    // Add feedback text (Correct/Incorrect)
    const feedbackText = document.createElement("p");
    feedbackText.classList.add(isCorrect ? "correct" : "incorrect");
    feedbackText.textContent = isCorrect ? "Correct!" : "Incorrect!";
    questionDiv.appendChild(feedbackText);

    // Display the correct answer under each question
    const correctAnswerText = document.createElement("p");
    correctAnswerText.classList.add("correct-answer");
    correctAnswerText.textContent = `Correct Answer: ${question.correctAnswer.join(
      ", "
    )}`;
    questionDiv.appendChild(correctAnswerText);

    // Show an explanation if available
    if (question.explanation) {
      const explanationText = document.createElement("p");
      explanationText.style.fontStyle = "italic";
      explanationText.textContent = `Explanation: ${question.explanation}`;
      questionDiv.appendChild(explanationText);
    }

    if (isCorrect) score++;
  });

  // Display the score and user's name and ID
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `<h3>${userName} (ID: ${userId}), you scored ${score} out of ${totalQuestions}!</h3>`;

  // Disable further changes to inputs after quiz submission
  document
    .querySelectorAll('input[type="checkbox"]')
    .forEach((input) => (input.disabled = true));

  // Show reset button
  const resetButton = document.createElement("button");
  resetButton.textContent = "Reset Quiz";
  resetButton.classList.add("reset-button");
  resetButton.onclick = resetQuiz;
  resultDiv.appendChild(resetButton);
}

// Function to reset the quiz
function resetQuiz() {
  const quizForm = document.getElementById("quiz-form");
  quizForm.innerHTML = ""; // Clear the form content
  document.getElementById("result").innerHTML = ""; // Clear result content
  createQuiz(); // Recreate the quiz
}

// Call the function to create the quiz when the page loads
createQuiz();
