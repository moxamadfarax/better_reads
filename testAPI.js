async function getBooks(query) {
  const apiKey = "AIzaSyD78Ix8MA22TZKPmBeVZpTmWtIzQPcPxwY";
  const maxResults = 40;
  const endpoint = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}&key=${apiKey}`;
  const response = await fetch(endpoint);
  const data = await response.json();

  console.log(data);
  for (let item of data.items) {
    console.log(item.volumeInfo.title, item.volumeInfo.authors);
  }
  for (let item of data.items) {
    console.log(item.volumeInfo.title);
    if (
      item.volumeInfo.hasOwnProperty("imageLinks") &&
      item.volumeInfo.imageLinks.hasOwnProperty("thumbnail")
    ) {
      console.log(item.volumeInfo.imageLinks.thumbnail);
    } else {
      console.log("No Thumbnail Available");
    }
  }
}

function userSearch(event) {
  event.preventDefault();
  let searchInput = document.getElementById("search-request").value;
  getBooks(searchInput);
}

getBooks("JavaScript").then(() => {
  console.log("Finished retrieving book titles");
});
