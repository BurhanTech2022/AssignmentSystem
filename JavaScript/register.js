document.getElementById('registerForm').addEventListener('submit', createUser);

function createUser(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const role = document.getElementById('role').value;

    // kasoo raadi users database, haddi aysan jirina array empty ah samee
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // fiiri haddi user lamid uu horay u jiray
    const existingUser = users.find((user) => user.username === username);
    if (existingUser) {
        alert('User already exists. Please choose a different username.');
        return;
    }

    // user cusub abuur
    const newUser = {
        username: username,
        password: password,
        role: role,
    };

    // user ka cusub ku dar users array horray ama array ki eberta aheed
    users.push(newUser);
    // ku keedi users ki horre iyoo kan cusuba database.
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful! You can now log in.');
    window.location.href = './index.html'; // Redirect to login page
}
