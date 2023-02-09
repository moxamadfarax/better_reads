var btn = document.getElementById("submitButton");

async function getData(query) {
  const apiKey = "AIzaSyD78Ix8MA22TZKPmBeVZpTmWtIzQPcPxwY";
  const maxResults = 40;
  const endpoint = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}&key=${apiKey}`;
  const response = await fetch(endpoint);
  const data = await response.json();

  for (let item of data.items) {
    if (
      item.volumeInfo.hasOwnProperty("imageLinks") &&
      item.volumeInfo.imageLinks.hasOwnProperty("thumbnail")
    ) {
      console.log(item.volumeInfo.imageLinks.thumbnail);
    } else {
      console.log("No Thumbnail Available");
    }
  }
  const resultsContainer = document.getElementById("resultsContainer");
  resultsContainer.innerHTML = "";

  for (let item of data.items) {
    if (
      item.volumeInfo.hasOwnProperty("imageLinks") &&
      item.volumeInfo.imageLinks.hasOwnProperty("thumbnail")
    ) {
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      const coverImage = document.createElement("img");
      coverImage.setAttribute("src", item.volumeInfo.imageLinks.thumbnail);
      coverImage.setAttribute("alt", item.volumeInfo.title);
      card.appendChild(coverImage);

      resultsContainer.appendChild(card);
    }
  }
}

btn.addEventListener("click", function () {
  console.clear();
  var inputValue = document.getElementById("inputField").value;
  getData(inputValue).then(() => {
    console.log("Finished retrieving book thumbnails");
  });
});
