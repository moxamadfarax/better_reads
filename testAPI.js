async function getBooks(query) {
  const apiKey = "AIzaSyD78Ix8MA22TZKPmBeVZpTmWtIzQPcPxwY";
  const maxResults = 40;
  const endpoint = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}&key=${apiKey}`;
  const response = await fetch(endpoint);
  const data = await response.json();

  for (let item of data.items) {
    console.log(item.volumeInfo.title);
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

getBooks("JavaScript").then(() => {
  console.log("Finished retrieving book titles");
});
