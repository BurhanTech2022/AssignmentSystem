// Local API with predefined quizzes
const localAPI = {
    quizzes: [
        {
            quizTitle: "Math Basics",
            questions: [
                { question: "What is 2 + 2?", answer: "4" },
                { question: "What is 5 - 3?", answer: "2" },
                { question: "What is 10 x 2?", answer: "20" },
            ],
        },
        {
            quizTitle: "History Basics",
            questions: [
                {
                    question: "Who was the first President of the USA?",
                    answer: "George Washington",
                },
                { question: "In which year did WW2 end?", answer: "1945" },
                {
                    question: "Which country was the first to land on the moon?",
                    answer: "USA",
                },
            ],
        },
        {
            quizTitle: "Science Fundamentals",
            questions: [
                {
                    question: "What planet is known as the Red Planet?",
                    answer: "Mars",
                },
                { question: "What is H2O commonly known as?", answer: "Water" },
                {
                    question: "What gas do plants breathe in?",
                    answer: "Carbon Dioxide",
                },
            ],
        },
        {
            quizTitle: "Geography Essentials",
            questions: [
                { question: "What is the capital of France?", answer: "Paris" },
                {
                    question: "Which continent is Brazil located in?",
                    answer: "South America",
                },
                {
                    question: "What is the longest river in the world?",
                    answer: "Nile",
                },
            ],
        },
        {
            quizTitle: "Literature Classics",
            questions: [
                {
                    question: "Who wrote 'Romeo and Juliet'?",
                    answer: "William Shakespeare",
                },
                {
                    question: "What is the main character’s name in 'Moby Dick'?",
                    answer: "Ishmael",
                },
                {
                    question: "Who wrote 'To Kill a Mockingbird'?",
                    answer: "Harper Lee",
                },
            ],
        },
    ],
};

// Function to get a random quiz from the local API
function getRandomQuiz() {
    const random = Math.floor(Math.random() * localAPI.quizzes.length);
    return localAPI.quizzes[random];
}

// Function to display the random quiz on the teacher's dashboard
function displayRandomQuiz() {
    const randomQuiz = getRandomQuiz();

    // Display the randomly selected quiz on the teacher's dashboard
    document.getElementById("quizFormSection").style.display = "block";
    document.getElementById("quizFormSection").innerHTML = `
          <h2>Create a Random Quiz</h2>
          <form id="quizForm">
              <label for="quizTitle">Quiz Title:</label>
              <input type="text" id="quizTitle" value="${randomQuiz.quizTitle
        }" readonly>
              <div id="questionsContainer">
                  <h3>Questions</h3>
                  ${randomQuiz.questions
            .map(
                (q, i) => `
                      <div>
                          <label>Question ${i + 1}:</label>
                          <input type="text" class="questionText" value="${q.question
                    }" readonly>
                          <label>Answer:</label>
                          <input type="text" class="correctAnswer" value="${q.answer
                    }" readonly>
                      </div>
                  `
            )
            .join("")}
              </div>
              <button type="button" onclick="saveQuiz('${randomQuiz.quizTitle
        }')">Assign This Quiz</button>
          </form>
      `;
}

// Function to save the selected random quiz to localStorage
function saveQuiz(quizTitle) {
    const selectedQuiz = localAPI.quizzes.find(
        (quiz) => quiz.quizTitle === quizTitle
    );

    // Save the quiz in the quizzes list in localStorage
    const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
    quizzes.push(selectedQuiz);
    localStorage.setItem("quizzes", JSON.stringify(quizzes));

    alert("Quiz assigned to students successfully!");
    displayDeleteQuizzes();
    document.getElementById("quizFormSection").style.display = "none";
}

// Function to handle student quiz submission
function submitQuiz(studentName, quizTitle, grade) {
    const submissions = JSON.parse(localStorage.getItem("submissions")) || []; // Retrieve existing submissions

    // Create a new submission object
    const newSubmission = {
        student: studentName,
        quizTitle: quizTitle,
        grade: grade,
        teacher: teacher,
    };

    // Add the new submission to the existing array
    submissions.push(newSubmission);

    // Save the updated array back to localStorage
    localStorage.setItem("submissions", JSON.stringify(submissions));
    alert("Quiz submitted successfully!");
}

// Display and update student submissions in the "Student Submissions" section
function displaySubmissions() {
    const submissions = JSON.parse(localStorage.getItem("submissions")) || [];
    const submissionsList = document.getElementById("submissionsList");
    submissionsList.innerHTML = "";

    if (submissions.length === 0) {
        submissionsList.innerHTML = "<p>No submissions yet.</p>";
        return;
    }

    submissions.forEach((submission, index) => {
        const div = document.createElement("div");
        div.className = "submission-item";
        div.innerHTML = `
          <strong>${submission.student}</strong> took <strong>${submission.quizTitle}</strong><br>
          <label>Grade:</label>
          <input type="text" id="grade-${index}" value="${submission.grade}">
          <button onclick="updateGrade(${index})">Update Grade</button>
          <button onclick="allowAnotherAttempt(${index})">Allow Another Attempt</button>
      `;
        submissionsList.appendChild(div);
    });
}

// Function to update the grade of a student
function updateGrade(index) {
    const updatedGrade = document.getElementById(`grade-${index}`).value;
    const submissions = JSON.parse(localStorage.getItem("submissions")) || [];

    // Update the grade in the submissions array
    submissions[index].grade = updatedGrade;
    localStorage.setItem("submissions", JSON.stringify(submissions));
    alert("Grade updated successfully!");
    displaySubmissions();
}

// Function to allow another attempt by removing a specific submission
function allowAnotherAttempt(index) {
    let submissions = JSON.parse(localStorage.getItem("submissions")) || [];
    submissions.splice(index, 1);
    localStorage.setItem("submissions", JSON.stringify(submissions));

    alert("Another attempt allowed for the student.");
    displaySubmissions();
}

// Display quizzes in the "Delete Quizzes" section
function displayDeleteQuizzes() {
    const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
    const deleteQuizList = document.getElementById("deleteQuizList");
    deleteQuizList.innerHTML = "";

    quizzes.forEach((quiz, index) => {
        const div = document.createElement("div");
        div.className = "quiz-item";
        div.innerHTML = `
          <strong>${quiz.quizTitle}</strong>
          <button onclick="deleteQuiz(${index})">Delete Quiz</button>
      `;
        deleteQuizList.appendChild(div);
    });
}

// Delete a quiz and remove associated submissions
function deleteQuiz(index) {
    const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
    const quizTitleToDelete = quizzes[index].quizTitle;

    quizzes.splice(index, 1);
    localStorage.setItem("quizzes", JSON.stringify(quizzes));

    let submissions = JSON.parse(localStorage.getItem("submissions")) || [];
    submissions = submissions.filter(
        (submission) => submission.quizTitle !== quizTitleToDelete
    );
    localStorage.setItem("submissions", JSON.stringify(submissions));

    alert("Quiz and associated submissions deleted successfully.");
    displayDeleteQuizzes();
}

// load firs and call these functions.
document.getElementById("createQuizMessage").addEventListener("click", displayRandomQuiz);
displayDeleteQuizzes();
displaySubmissions();
