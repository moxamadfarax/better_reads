const hamburgerButton = document.querySelector(".navbar-toggler");

const navbarCollapse = document.querySelector(".navbar-collapse");

hamburgerButton.addEventListener("click", function () {
  navbarCollapse.classList.toggle("collapse");
});
