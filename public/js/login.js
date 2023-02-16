const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from login form
  const user_email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (user_email && password) {
    // Send POST request to the API endpoint
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ user_email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If success, redirect browser to dashboard page
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const user_name = document.querySelector("#name-signup").value.trim();
  const user_email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  let errMsg = document.querySelector('#invalidemailorpw');

  if (user_name && user_email && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ user_name, user_email, password }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);
    if (response.ok) {
      document.location.replace("/");
    } else {
      errMsg.setAttribute('class', 'errormsg');
    }
  }
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
