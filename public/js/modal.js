// Get the modal
var myModal = document.getElementById("exampleModal");

// Get the button that opens the modal
var myButton = document.querySelector('button[data-bs-target="#exampleModal"]');

// When the user clicks the button, open the modal
myButton.addEventListener("click", function () {
  myModal.style.display = "block";
});

// When the user clicks on the close button or anywhere outside of the modal, close it
myModal.addEventListener("click", function (event) {
  if (event.target === myModal || event.target.className === "btn-close") {
    myModal.style.display = "none";
  }
});
