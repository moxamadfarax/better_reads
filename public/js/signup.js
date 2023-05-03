const signupFormHandler = async (event) => {
  event.preventDefault();

  const user_email = document.querySelector("#email").value.trim();
  const user_name = document.querySelector("#username").value.trim();
  const password = document.querySelector("#password").value.trim();
  let errMsg = document.querySelector("#errMsg");

  if (user_name && user_email && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ user_name, user_email, password }),
      headers: { "Content-Type": "application/json" },
    });
    const responseBody = await response.json();
    if (response.ok) {
      document.location.replace("/");
    } else {
      errMsg.style.display = "block";
      errMsg.textContent = responseBody.message;
    }
  }
};

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
