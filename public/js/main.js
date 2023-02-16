const btn = document.getElementById("submitButton");
const inputField = document.getElementById("inputField");
const nextBtn = document.getElementById("nextBtn");
const previousBtn = document.getElementById("previousBtn");

const bookTitle = document.getElementById("bookTitle");
const bookTitle2 = document.getElementById("bookTitle2");
const bookCover = document.getElementById("bookCover");
const bookAuthor = document.getElementById("bookAuthor");
const bookLink = document.getElementById("bookLink");
const bookDesc = document.getElementById("bookDesc");
const bookPub = document.getElementById("bookPub");
const bookRating = document.getElementById("bookRating");
myModal = document.getElementById("details");

let startIndex = 0;
let totalItems = 0;
let itemsPerPage = 36;

bookData = [];
savedBooks = [];
nextBtn.style.display = "none";
previousBtn.style.display = "none";

function addBook(book) {
  fetch(`/api/books`, {
    method: "POST",
    body: JSON.stringify(book),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function getData(query, startIndex) {
  const apiKey = "AIzaSyD78Ix8MA22TZKPmBeVZpTmWtIzQPcPxwY";
  const maxResults = itemsPerPage;
  const endpoint = `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}&maxResults=${maxResults}&key=${apiKey}`;
  const response = await fetch(endpoint);
  const data = await response.json();
  bookData = [];

  if (data.items) {
    const resultsContainer = document.getElementById("resultsContainer");
    resultsContainer.innerHTML = "";

    for (let i = 0; i < data.items.length; i++) {
      const item = data.items[i];
      if (
        item.volumeInfo.hasOwnProperty("imageLinks") &&
        item.volumeInfo.imageLinks.hasOwnProperty("thumbnail")
      ) {
        const bookInfo = {
          title: item.volumeInfo.title,
          authors: Array.isArray(item.volumeInfo.authors)
            ? item.volumeInfo.authors[0]
            : null,
          description: item.volumeInfo.description,
          bookLink: item.volumeInfo.infoLink,
          publishedDate: item.volumeInfo.publishedDate,
          bookCover: item.volumeInfo.imageLinks.thumbnail,
          bookRating: item.volumeInfo.averageRating,
        };
        bookData.push(bookInfo);

        const card = generateBookCard(item.volumeInfo, bookData.length - 1);

        resultsContainer.appendChild(card);
      }
    }
  } else {
    const resultsContainer = document.getElementById("resultsContainer");
    resultsContainer.innerHTML = "<p>No Results Found</p>";
    nextBtn.style.display = "none";
    previousBtn.style.display = "none";
  }

  totalItems = data.totalItems;
  if (startIndex === 0) {
    previousBtn.style.display = "none";
  } else {
    previousBtn.style.display = "inline-block";
  }

  if (totalItems - startIndex <= itemsPerPage) {
    nextBtn.style.display = "none";
  } else {
    nextBtn.style.display = "inline-block";
  }

  const bookmarkBtns = document.getElementsByClassName("bookmarkBtn");
  for (let i = 0; i < bookmarkBtns.length; i++) {
    bookmarkBtns[i].addEventListener("click", function () {
      const bookIndex = i;
      const book = bookData[bookIndex];
      addBook(book);
      bookmarkBtns[i].disabled = true;
      bookmarkBtns[i].innerHTML = "Bookmarked";
    });
  }
  return totalItems;
}

function generateBookCard(bookInfo) {
  const card = document.createElement("div");
  card.classList.add("card", "book-card");
  const coverImage = document.createElement("img");
  coverImage.classList.add("card-img-top", "card-gen");
  coverImage.src = bookInfo.imageLinks.thumbnail;
  coverImage.alt = bookInfo.title;
  card.appendChild(coverImage);

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const title = document.createElement("h5");
  title.classList.add("card-title");
  title.textContent = bookInfo.title;

  if (bookInfo.title.length > 25) {
    title.style.fontSize = "0.8em";
  }

  const btnContainer = document.createElement("div");
  btnContainer.classList.add("btn-group");
  const detailsBtn = document.createElement("button");
  const bookmarkBtn = document.createElement("button");
  detailsBtn.classList.add("btn", "btn-secondary", "moreBtn", "detailsBtn");
  bookmarkBtn.classList.add("btn", "btn-secondary", "moreBtn", "bookmarkBtn");
  detailsBtn.textContent = "Details";
  bookmarkBtn.textContent = "Bookmark";
  detailsBtn.setAttribute("type", "button");

  detailsBtn.setAttribute("data-bs-toggle", "modal");
  detailsBtn.setAttribute("data-bs-target", "#detailsModal");

  btnContainer.appendChild(detailsBtn);
  btnContainer.appendChild(bookmarkBtn);
  cardBody.appendChild(title);
  card.appendChild(cardBody);
  card.appendChild(btnContainer);

  detailsBtn.addEventListener("click", function () {
    bookTitle.textContent = bookInfo.title
      ? bookInfo.title
      : `This book's title is unavailable`;
    bookTitle2.textContent = bookTitle.textContent;

    bookCover.setAttribute(
      "alt",
      !bookInfo.imageLinks.thumbnail ? "Image Unavailable" : ""
    );
    bookCover.src = bookInfo.imageLinks.thumbnail || "";

    bookAuthor.textContent = bookInfo.authors
      ? `By ${bookInfo.authors}`
      : `Unknown Author`;

    bookLink.textContent = bookInfo.infoLink
      ? "Read Here"
      : "Book Link Unavailable";
    bookLink.setAttribute("href", bookInfo.infoLink || "");

    bookDesc.textContent = bookInfo.description
      ? bookInfo.description
      : "This book's description is unavailable";

    bookRating.textContent = bookInfo.averageRating
      ? `This book has a rating of ${bookInfo.averageRating} stars`
      : `This book's rating is unavailable`;

    bookPub.textContent = bookInfo.publishedDate
      ? `This book was published on ${bookInfo.publishedDate}`
      : `This book's publish date is unavailable`;
  });
  return card;
}

btn.addEventListener("click", function () {
  let inputValue = inputField.value;
  startIndex = 0;
  getData(inputValue, startIndex).then(() => {});
});

nextBtn.addEventListener("click", function () {
  startIndex += itemsPerPage;
  getData(inputField.value, startIndex);
});

previousBtn.addEventListener("click", function () {
  startIndex -= itemsPerPage;
  getData(inputField.value, startIndex);
});

inputField.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    btn.click();
  }
});
const navbarToggler = document.querySelector(".navbar-toggler");

// Get the navbar collapse element
const navbarCollapse = document.querySelector(".navbar-collapse");

const navLinks = document.getElementById("nav-links");

// Add a click event listener to the navbar toggler button
navbarToggler.addEventListener("click", function () {
  // Toggle the show class on the navbar collapse element
  navbarCollapse.classList.toggle("show");
  navLinks.style.marginTop = "10px";
  navLinks.style.paddingTop = "10px";
  navLinks.style.display = "inline-block";
  navLinks.style.backgroundColor = "rgb(147, 147, 147)";

  // Add a blur event listener to the navbar toggler button
  navbarToggler.addEventListener("blur", function () {
    // Remove the styles that were added when the button was pressed
    navLinks.style.marginTop = "";
    navLinks.style.paddingTop = "";
    navLinks.style.display = "";
    navLinks.style.backgroundColor = "";
  });
});
