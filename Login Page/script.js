// Get elements from the HTML document
const loginForm = document.querySelector('.logincon form');
const usernameInput = loginForm.querySelector('#username');
const passwordInput = loginForm.querySelector('#password');
const signUpForm = document.querySelector('.signup form');
const signUpUsernameInput = signUpForm.querySelector('#user');
const signUpPasswordInput = signUpForm.querySelector('#pass');
const messageDiv = document.querySelector('#message');

// Check if the user is already logged in by checking the presence of a "loggedIn" key in localStorage
const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
const username = localStorage.getItem('username');

// Check if there are already users in localStorage, and create an empty array if not
const users = JSON.parse(localStorage.getItem('users')) || [];

// Function to show the message in the messageDiv element
function showMessage(message) {
  messageDiv.textContent = message;
}

// Function to handle the login form submission
function handleLoginFormSubmit(event) {
  event.preventDefault(); // Prevent the form from submitting normally

  // Get the values from the input fields
  const username = usernameInput.value;
  const password = passwordInput.value;

  // Check if the username and password match a user in the users array
  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    localStorage.setItem('loggedIn', 'true'); // Set the loggedIn key in localStorage to true
    localStorage.setItem('username', user.username); // Set the username key in localStorage to the logged-in user's username
    showMessage(`Welcome ${user.username}`); // Show a welcome message
  } else {
    showMessage('Please login'); // Show a "Please login" message
  }

  // Reset the form fields
  loginForm.reset();
}

// Function to handle the sign up form submission
function handleSignUpFormSubmit(event) {
  event.preventDefault(); // Prevent the form from submitting normally

  // Get the values from the input fields
  const username = signUpUsernameInput.value;
  const password = signUpPasswordInput.value;

  // Check if the username is already taken
  const isUsernameTaken = users.some(user => user.username === username);

  if (isUsernameTaken) {
    showMessage('Username already taken'); // Show an error message if the username is already taken
  } else {
    // Add the new user to the users array
    users.push({ username, password });

    // Save the updated users array to localStorage
    localStorage.setItem('users', JSON.stringify(users));

    showMessage(`Welcome ${username}`); // Show a welcome message
  }

  // Reset the form fields
  signUpForm.reset();
}

// If the user is already logged in, show a welcome message
if (isLoggedIn) {
  showMessage(`Welcome ${username}`);
} else {
  showMessage('Please login');
}

// Add event listeners to the login and sign up forms
loginForm.addEventListener('submit', handleLoginFormSubmit);
signUpForm.addEventListener('submit', handleSignUpFormSubmit);