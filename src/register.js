const API_ENDPOINT = "http://localhost:3000/users";

const registerButton = document.querySelector("button");
registerButton.addEventListener("click", async (event) => {
  event.preventDefault();

  const usernameInput = document.getElementById("username-input");
  const emailInput = document.getElementById("email-input");
  const passwordInput = document.getElementById("password-input");
  const confirmPasswordInput = document.getElementById("confirmpassword-input");

  const username = usernameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  const emailRegex = /^\S+@\S+\.\S+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address");
    return;
  }

  if (!passwordRegex.test(password)) {
    alert(
      "Password must contain at least 8 characters including uppercase, lowercase letters, and numbers"
    );
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const postResponse = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (!postResponse.ok) {
      throw new Error("Failed to register user");
    } else {
      alert("User registered successfully");
      console.log("Redirecting to index.html");
      window.history.pushState({}, null, "./index.html");
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
  } catch (error) {
    console.error(error);
    alert("An error occurred while registering user");
  }
});
