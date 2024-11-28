const errorMessage = document.getElementById("ms-error");
document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    //soo he
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (singleUser) =>
        singleUser.username === username &&
        singleUser.password === password
    );

    if (user) {
      // If a user is found, log them in
      alert(`WELCOME ${user.username}`);
      localStorage.setItem("currentUser", JSON.stringify(user));
      window.location.href =
        user.role === "teacher" ? "teacher.html" : "student.html";
        currentUser.style.display = "none";
    }
     //if user is not founded in local storage
    if (!users.some((singleUser) => singleUser.username === username)) {
      errorMessage.innerText = "You are not registered.";
      errorMessage.style.fontSize = "18px";
      errorMessage.style.border = "2px solid red";
    } else {
      // If the username exists but the password is incorrect
      alert("Oops! Check Your Credentials.");
    }
  });

  