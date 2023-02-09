async function getBooks(query) {
  const apiKey = "AIzaSyD78Ix8MA22TZKPmBeVZpTmWtIzQPcPxwY";
  const endpoint = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`;
  const response = await fetch(endpoint);
  const data = await response.json();

  for (const item of data.items) {
    console.log(item.volumeInfo.title);
  }
}

getBooks("JavaScript").then(() => {
  console.log("Finished retrieving book titles");
});
