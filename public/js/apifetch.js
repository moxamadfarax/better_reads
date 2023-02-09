const API = AIzaSyDWE_LNR4B8_VNh000CzSgBG9AWwXG40WM;

bookSearch = function (searchParam) {
  let basicQuery =
    "https://www.googleapis.com/books/v1/volumes?q=" +
    searchParam +
    "&key=" +
    API;
  fetch(basicQuery)
    .then((response) => response.json())
    .then((result) => {
      this.setState({ books: result.items });
    });
};
