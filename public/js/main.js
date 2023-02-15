let btn = document.getElementById("submitButton");
let inputField = document.getElementById("inputField");
let nextBtn = document.getElementById("nextBtn");
let previousBtn = document.getElementById("previousBtn");

let startIndex = 0;
let totalItems = 0;
let itemsPerPage = 36;

bookData = [];
savedBooks = [];

nextBtn.style.display = "none";
previousBtn.style.display = "none";

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
          authors: item.volumeInfo.authors,
          description: item.volumeInfo.description,
          bookLink: item.volumeInfo.infoLink,
          publishedDate: item.volumeInfo.publishedDate,
        };

        bookData.push(bookInfo);

        const card = generateBookCard(item.volumeInfo, bookData.length - 1);

        resultsContainer.appendChild(card);
      }
    }
  } else {
    const resultsContainer = document.getElementById("resultsContainer");
    resultsContainer.innerHTML = "<p>No Results Found</p>";
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
      savedBooks.push(book);
      console.log("Bookmark button clicked for book:", book);
      console.log(savedBooks);
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
  coverImage.classList.add("card-img-top");
  coverImage.src = bookInfo.imageLinks.thumbnail;
  coverImage.alt = bookInfo.title;
  card.appendChild(coverImage);

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const title = document.createElement("h5");
  title.classList.add("card-title");
  title.textContent = bookInfo.title;

  const btnContainer = document.createElement("div");
  btnContainer.classList.add("btn-group");
  const detailsBtn = document.createElement("button");
  const bookmarkBtn = document.createElement("button");
  detailsBtn.classList.add("btn", "btn-secondary", "moreBtn", "detailsBtn");
  bookmarkBtn.classList.add("btn", "btn-secondary", "moreBtn", "bookmarkBtn");
  detailsBtn.textContent = "Details";
  bookmarkBtn.textContent = "Bookmark";

  btnContainer.appendChild(detailsBtn);
  btnContainer.appendChild(bookmarkBtn);

  cardBody.appendChild(title);

  card.appendChild(cardBody);
  card.appendChild(btnContainer);

  return card;
}

btn.addEventListener("click", function () {
  let inputValue = inputField.value;
  startIndex = 0;
  getData(inputValue, startIndex).then(() => {
    console.log("Finished retrieving book data");
  });
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
