const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from login form
  const user_email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value.trim();

  if (user_email && password) {
    // Send POST request to the API endpoint
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ user_email, password }),
      headers: { "Content-Type": "application/json" },
    });
    const responseBody = await response.json();
    if (response.ok) {
      // If success, redirect browser to dashboard page
      document.location.replace("/");
    } else {
      errMsg.style.display = "block";
      errMsg.textContent = responseBody.message;
    }
  }
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
