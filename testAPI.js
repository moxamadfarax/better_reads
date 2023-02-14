var btn = document.getElementById("submitButton");
var inputField = document.getElementById("inputField");
var nextBtn = document.getElementById("nextBtn");
var previousBtn = document.getElementById("previousBtn");

var startIndex = 0;
var totalItems = 0;
var itemsPerPage = 35;

async function getData(query, startIndex) {
  const apiKey = "AIzaSyD78Ix8MA22TZKPmBeVZpTmWtIzQPcPxwY";
  const maxResults = itemsPerPage;
  const endpoint = `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}&maxResults=${maxResults}&key=${apiKey}`;
  const response = await fetch(endpoint);
  const data = await response.json();

  if (data.items) {
    const resultsContainer = document.getElementById("resultsContainer");
    resultsContainer.innerHTML = "";

    for (let item of data.items) {
      if (
        item.volumeInfo.hasOwnProperty("imageLinks") &&
        item.volumeInfo.imageLinks.hasOwnProperty("thumbnail")
      ) {
        const card = generateBookCard(item.volumeInfo);

        resultsContainer.appendChild(card);
      }
    }
  } else {
    const resultsContainer = document.getElementById("resultsContainer");
    resultsContainer.innerHTML = "<p>No Results Found</p>";
  }

  return data.totalItems;
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
  cardBody.appendChild(title);

  card.appendChild(cardBody);

  return card;
}

btn.addEventListener("click", function () {
  var inputValue = inputField.value;
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
