const loginButton = document.querySelector("button");
const usernameInput = document.querySelector("#username-input");
const passwordInput = document.querySelector("#password-input");
const API_ENDPOINT = "http://localhost:3000/users";

loginButton.addEventListener("click", () => {
  const username = usernameInput.value;
  const password = passwordInput.value;

  // Fetch the user data from the API
  fetch(API_ENDPOINT)
    .then((response) => response.json())
    .then((users) => {
      // Check if the entered username and password match the values returned by the API
      const user = users.find(
        (u) => u.username === username && u.password === password
      );
      if (user) {
        // If the username and password match, redirect to the dashboard page
        window.location.href = "./homepage.html";
      } else {
        // Otherwise, display an error message to the user
        alert("Incorrect username or password");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
