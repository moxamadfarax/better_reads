let guestButton = document.getElementById("guestId");

const guestLoginFunc = async () => {
  let user_email = "guest@user.com";
  let password = "Guest_12345";

  if (user_email && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ user_email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) document.location.replace("/");
  }
};

guestButton.addEventListener("click", guestLoginFunc);
