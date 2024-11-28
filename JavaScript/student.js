const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser || currentUser.role !== "student") {
  alert("Access Denied. Only students can access this page.");
  window.location.href = "index.html";
}

// Retrieve quizzes and submissions from localStorage
const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
let submissions = JSON.parse(localStorage.getItem("submissions")) || [];

// Filter submissions to only include those for the current student
submissions = submissions.filter(
  (sub) => sub.student === currentUser.username
);

// Function to display current user on the dashboard
function displayCurrentUser() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if(currentUser){
      let studentName = document.getElementById('student_name')
      //abuur span to display username
      let studentUserame = document.createElement('span');
      studentUserame.innerText = `${currentUser.username}`
      studentUserame.style.color = 'green';
      studentUserame.style.fontSize ='25px'
      studentName.appendChild(studentUserame);

  }

}

// Display available quizzes that the student hasn't taken yet
function displayAvailableQuizzes() {
  const quizList = document.getElementById("quizList");
  quizList.innerHTML = "";

  const takenQuizzes = submissions.map((sub) => sub.quizTitle);
  const availableQuizzes = quizzes.filter(
    (quiz) => !takenQuizzes.includes(quiz.quizTitle)
  );

  if (availableQuizzes.length === 0) {
    quizList.innerHTML = "<p>No available quizzes</p>";
  } else {
    availableQuizzes.forEach((quiz, index) => {
      const quizDiv = document.createElement("div");
      quizDiv.className = "quiz-item";
      quizDiv.innerHTML = `
                  <h3>${quiz.quizTitle}</h3>
                  <button onclick="startQuiz(${index})" id="start-button-${index}">Start Quiz</button>
                  <div id="quiz-content-${index}" style="display: none;">
                      ${quiz.questions
                        .map(
                          (q, i) => `
                          <div>
                              <p>${q.question}</p>
                              <input type="text" id="answer-${index}-${i}" placeholder="Your answer">
                          </div>
                      `
                        )
                        .join("")}
                      <button onclick="submitQuiz(${index}, '${
        quiz.quizTitle
      }')">Submit Quiz</button>
                  </div>
              `;
      quizList.appendChild(quizDiv);
    });
  }
}

// Function to show the quiz questions when the Start button is clicked
function startQuiz(index) {
  document.getElementById(`start-button-${index}`).style.display = "none";
  document.getElementById(`quiz-content-${index}`).style.display =
    "block";
}

//submission
function submitQuiz(quizIndex, quizTitle) {
  const quiz = quizzes[quizIndex];
  let correctAnswers = 0;
  const studentAnswers = [];

  quiz.questions.forEach((q, i) => {
    const studentAnswer = document
      .getElementById(`answer-${quizIndex}-${i}`)
      .value.trim()
      .toLowerCase();
    studentAnswers.push(studentAnswer);
    if (studentAnswer === q.answer.trim().toLowerCase()) {
      correctAnswers++;
    }
  });

  const grade =
    ((correctAnswers / quiz.questions.length) * 100).toFixed(2) + "%";

  // Save the submission with the student's details, answers, and grade
  submissions = submissions.filter((sub) =>(
        sub.student === currentUser.username &&
        sub.quizTitle === quizTitle
      )
  );
  submissions.push({
    student: currentUser.username,
    quizTitle: quizTitle,
    grade: grade,
    studentAnswers: studentAnswers,
  });
  localStorage.setItem("submissions", JSON.stringify(submissions));

  alert(`Quiz submitted! Your grade: ${grade}`);
  displayAvailableQuizzes();
  displaySubmittedQuizzes();
}

// Display quizzes that the student has already submitted
function displaySubmittedQuizzes() {
  const submittedQuizzes = document.getElementById("submittedQuizzes");
  const submittedQuizzesTitle = document.getElementById(
    "submittedQuizzesTitle"
  );
  submittedQuizzes.innerHTML = "";

  if (submissions.length === 0) {
    submittedQuizzesTitle.style.display = "none";
    submittedQuizzes.style.display = "none";
  } else {
    submittedQuizzesTitle.style.display = "block";
    submittedQuizzes.style.display = "block";
    submissions.forEach((submission, index) => {
      const div = document.createElement("div");
      div.className = "submission-item";
      div.innerHTML = `
                  <strong>${submission.quizTitle}</strong> - Grade: ${submission.grade}
                  <button onclick="showQuizSummary(${index})">View Summary</button>
              `;
      submittedQuizzes.appendChild(div);
    });
  }
}

// Show quiz summary in a modal
function showQuizSummary(index) {
  const submission = submissions[index];
  const quiz = quizzes.find((q) => q.quizTitle === submission.quizTitle);

  if (!quiz) {
    alert("Quiz data not found.");
    return;
  }

  let summaryHTML = `<strong>Quiz Title:</strong> ${submission.quizTitle}<br><br>`;
  quiz.questions.forEach((q, i) => {
    summaryHTML += `<strong>Question ${i + 1}:</strong> ${
      q.question
    }<br>`;
    summaryHTML += `<strong>Your Answer:</strong> ${
      submission.studentAnswers && submission.studentAnswers[i]
        ? submission.studentAnswers[i]
        : "No answer"
    }<br>`;
    summaryHTML += `<strong>Correct Answer:</strong> ${q.answer}<br><br>`;
  });

  document.getElementById("quizSummaryContent").innerHTML = summaryHTML;

  const modal = document.getElementById("quizSummaryModal");
  modal.style.display = "block";

  // Automatically close the modal after 10 seconds
  setTimeout(closeModal, 10000);
}

// Function to close the modal
function closeModal() {
  document.getElementById("quizSummaryModal").style.display = "none";
}

// Call this function when the page loads
displayCurrentUser();
// Load quizzes and submissions on page load
displayAvailableQuizzes();
displaySubmittedQuizzes();