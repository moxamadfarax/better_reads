const { passwordStrength } = require('../../node_modules/check-password-strength');

let timeout;
let password = document.getElementById("password-signup");

// function passStr
// passwordStrength(password).value;
console.log(passwordStrength("password").value);

password.addEventListener("input", () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => passwordStrength(password.value), 500);
});
