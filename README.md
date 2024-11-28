# Quiz Management System 
-----------------------------------------
## Overview

The  **Quiz** Management System is a web-based application designed for teachers to manage quizzes and for students to take and track their performance. The system  improves the process of creating, assigning, and grading quizzes while ensuring an intuitive and user-friendly experience for both roles.

## Features

### Teacher Features

- Create and assign quizzes using a pre-defined question bank.
- View and update student submissions and grades.
- Allow students additional attempts on quizzes.
- Delete quizzes and manage associated student data.
- Dynamic and responsive dashboard for managing quizzes and submissions.

### Student Features

- View available quizzes that have not yet been completed.
- Take quizzes and submit answers.
- View grades immediately after submission.
- Access quiz summaries, including correct answers and student responses, via a modal.
- Clean and interactive dashboard with personalized greetings.

### General Features

- User registration for both teachers and students.
- Role-based redirection after login.
- Fully responsive design with an engaging user interface.
- Secure data storage and retrieval using localStorage.

### Technologies Used

#### Frontend

- **HTML5:** For semantic and structural elements.
- **CSS3:** For styling and layout, including animations and gradients.
- **avaScript (Vanilla):** For dynamic behavior, data handling, and interactivity.

### Design

- Google Fonts for typography (e.g., Roboto, Courgette).
- Font Awesome for icons.
- CSS animations (e.g., rotating icons, hover effects).

## File Structure

**_HTML Files_**

1. <font color="blue">index.html</font> Login page where users (teachers and students) authenticate.
2. <font color ="blue"> teacher.html:</font> Teacher dashboard for managing quizzes and student data.
3. <font color ="blue"> studen.html:</font> Student dashboard for accessing quizzes, submissions, and grades.
4. <font color ="blue"> register.html:</font> Registration page for creating new accounts with roles.
   CSS
5. <font color ="blue"> Style.css:</font> A single, shared stylesheet with custom styles for all pages. Includes animations, gradients, and responsive designs.

### How It Works

1. **Registration:**

- Users register with a username, password, and role (Teacher/Student).
- User data is stored in <font color ="red"> LocalStorage:</font>

**_Login:_**

- Users log in with their credentials.
- Role-based redirection to either the teacher or student dashboard.

### Teacher Dashboard:

- Teachers can create random quizzes, manage submissions, and update grades.
- Deleting a quiz removes it and its associated submissions.

### Student Dashboard:

- Students view available quizzes, submit answers, and review their performance.
- Submitted quizzes are hidden from the available quizzes list.

## Local Storage Keys

**_users:_**

- Stores registered users with their username, password, role in <font color ="blue">json:</font>

```javascript
[{"username": "teacher1", "password": "pass123", "role": "teacher" },
  { "username": "student1", "password": "pass123", "role": "student"}]
```


**quizzes:**

- Stores quizzes created by the <font color ="blue"> json:</font>

```javascript
[{"quizTitle":"Math Basics","questions":[{"question": "What is 2 + 2?","answer":"4"},{"question":"What is 5 - 3?","answer":"2"}]}] 
```


**submissions:**

- Tracks student quiz submissions, including grades and answers.
 <font color ="blue"> json:</font>

```javascript
[{"student": "student1","quizTitle":"Math Basics","grade":"100%","studentAnswers":["4","2"]}]
```

## Key Functionalities
### Teacher Dashboard
- ***Create Quizzes:*** Generate quizzes from a pre-defined bank of questions using the "Create Random Quiz" option.

- ***Manage Submissions:*** 
- View all student submissions with quiz titles and grades.
- Update grades manually if required.
- Allow students another attempt by removing their submission.

- ***Delete Quizzes:***  
- Deletes selected quizzes and removes their associated submissions.
 
### Student Dashboard
- ***Available Quizzes:***
- Displays quizzes not yet taken by the student.
- Students can click "Start Quiz" to answer the questions.
- ***Submit Quiz:***
- Calculates the grade based on correct answers.
- Stores the submission with answers and grade in - ***localStorage.***
Submitted Quizzes:
- Lists previously completed quizzes along with grades.
- "View Summary" allows students to compare their answers with correct answers in a modal.
### Registration and Login
- ***Role Selection:***
- Users can select their role (Teacher/Student) during registration.
- ***Role-Based Redirect:***
- Teachers are redirected to  <font color ="blue">Teacher.html</font>
- Students are redirected to  <font color ="blue"> student.html</font>
## Conclusion
The ***Quiz*** Management System is a robust, interactive tool designed to simplify quiz management for teachers while offering an engaging learning experience for students. With features like automatic grading, real-time feedback, and a user-friendly interface, it bridges the gap between educators and learners effectively. This project can serve as a foundation for future enhancements, making it adaptable to diverse educational needs.
